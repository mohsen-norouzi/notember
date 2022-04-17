import { Dialog, Icon, LinearProgress, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { VerticalButtons } from 'components/ui/image/VerticalButtons';
import { SquareButton } from 'components/ui/image/SquareButton';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Cropper, CropperRef, getMimeType, ImageRestriction } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import { useUploadMutation, UploadMutation } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type ImageDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (imageID: string, imageUrl: string) => void;
};

export const ImageDialog: FC<ImageDialogProps> = (props) => {
  const { data, error, isLoading, mutate } = useUploadMutation<UploadMutation, Error>(
    graphqlRequestClient,
    {}
  );

  const cropperRef = useRef<CropperRef>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<any | null>({
    src: 'https://i.picsum.photos/id/62/600/500.jpg?hmac=y-w6fth0vghueQ7j0aRdSCWcrweB3yOCHfkRtiEXHLM'
  });

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Reference to the DOM input element
    const { files } = event.target;

    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
      // 1. Create the blob link to the file to optimize performance:
      const blob = URL.createObjectURL(files[0]);

      // 2. The steps below are designated to determine a file mime type to use it during the
      // getting of a cropped image from the canvas. You can replace it them by the following string,
      // but the type will be derived from the extension and it can lead to an incorrect result:
      //
      // setImage({
      //    src: blob;
      //    type: files[0].type
      // })

      // Create a new FileReader to read this image binary data
      const reader = new FileReader();

      // Remember the fallback type:
      const typeFallback: any = files[0].type;

      // Define a callback function to run, when FileReader finishes its job
      reader.onload = (e: any) => {
        // Note: arrow function used here, so that "this.image" refers to the image of Vue component
        setImage({
          // Read image as base64 and set it as src:
          src: blob,
          // Determine the image type to preserve it during the extracting the image from canvas:
          type: getMimeType(e.target?.result, typeFallback)
        });
      };
      // Start the reader job - read file as a data url (base64 format) and get the real file type
      reader.readAsArrayBuffer(files[0]);
    }
    // Clear the event target value to give the possibility to upload the same image:
    event.target.value = '';
  };

  useEffect(() => {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    return () => {
      if (image && image.src) {
        URL.revokeObjectURL(image.src);
      }
    };
  }, [image]);

  const flip = (horizontal: boolean, vertical: boolean) => () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const state = cropper.getState();
      if (state && state.transforms.rotate % 180 !== 0) {
        cropper.flipImage(!horizontal, !vertical);
      } else {
        cropper.flipImage(horizontal, vertical);
      }
    }
  };

  const rotate = (angle: number) => () => {
    const cropper = cropperRef.current;
    if (cropper) {
      cropper.rotateImage(angle);
    }
  };

  const save = () => {
    const cropper = cropperRef.current;

    if (cropper) {
      const canvas = cropper.getCanvas();

      if (canvas) {
        const form = new FormData();

        canvas.toBlob((blob) => {
          if (blob) {
            form.append('file', blob);
            mutate(
              { file: blob },
              {
                onSuccess: (data) => {
                  const imageID = data.upload.data?.id;
                  const imageUrl = data.upload.data?.attributes?.url;

                  if (imageID && imageUrl) {
                    props.onSubmit(imageID, imageUrl);
                  }
                }
              }
            );
          }
        }, 'image/jpeg');
      }
    }
  };

  const cancel = () => {
    props.onClose();
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      onClose={props.onClose}
      open={props.open}
      classes={{
        paper: 'w-full m-24'
      }}
    >
      <div
        style={{
          minHeight: '15rem',
          minWidth: '15rem',
          maxWidth: '80vw',
          maxHeight: '80vh',
          overflow: 'hidden'
        }}
      >
        {isLoading && <LinearProgress color='primary' />}

        <Cropper
          className='default-cropper w-full'
          ref={cropperRef}
          sizeRestrictions={{ minHeight: 200, minWidth: 200, maxHeight: 1200, maxWidth: 1200 }}
          src={image && image.src}
          imageRestriction={ImageRestriction.fillArea}
          style={{
            minHeight: '15rem',
            minWidth: '15rem',
            maxWidth: '80vw',
            maxHeight: '80vh',
            overflow: 'hidden'
          }}
        />

        <VerticalButtons className='my-2'>
          <SquareButton title='Change' onClick={onUpload}>
            <input
              ref={inputRef}
              type='file'
              accept='image/*'
              onChange={onLoadImage}
              className='hidden'
            />
            <Icon className='text-white' fontSize='small'>
              image
            </Icon>
          </SquareButton>

          {/* <hr className='my-2  border-gray-200' /> */}

          {/* <SquareButton title='Flip Horizontal' onClick={flip(true, false)}>
            <Icon className='text-white' fontSize='small'>
              flip
            </Icon>
          </SquareButton>
          <SquareButton title='Flip Vertical' onClick={flip(false, true)}>
            <Icon className='rotate-90 text-white' fontSize='small'>
              flip
            </Icon>
          </SquareButton>
          <SquareButton title='Rotate Clockwise' onClick={rotate(90)}>
            <Icon className='text-white' fontSize='small'>
              rotate_right
            </Icon>
          </SquareButton>
          <SquareButton title='Rotate Counter-Clockwise' onClick={rotate(-90)}>
            <Icon className='text-white' fontSize='small'>
              rotate_left
            </Icon>
          </SquareButton>

          <hr className='my-2  border-gray-200' /> */}

          <SquareButton title='Save' onClick={save}>
            <Icon className='text-white' fontSize='small'>
              check
            </Icon>
          </SquareButton>
          <SquareButton title='Cancel' onClick={cancel}>
            <Icon className='text-white' fontSize='small'>
              close
            </Icon>
          </SquareButton>
        </VerticalButtons>
      </div>
    </Dialog>
  );
};
