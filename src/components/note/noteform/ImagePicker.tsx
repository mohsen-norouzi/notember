import { Icon, IconButton, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { ImageDialog } from './ImageDialog';

type ImagePickerProps = {
  onPick: (imageID: string, imageUrl: string) => void;
};

export const ImagePicker: FC<ImagePickerProps> = (props) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleShowImageDialog = () => {
    setShowDialog(true);
  };

  const handleSubmit = (imageID: string, imageUrl: string) => {
    props.onPick(imageID, imageUrl);
    setShowDialog(false);
  };

  const handleCloseImageDialog = () => {
    setShowDialog(false);
  };

  return (
    <Tooltip title='Add image' placement='bottom'>
      <>
        <IconButton size='small' onClick={handleShowImageDialog}>
          <Icon fontSize='small'>image</Icon>
        </IconButton>

        <ImageDialog open={showDialog} onClose={handleCloseImageDialog} onSubmit={handleSubmit} />
      </>
    </Tooltip>
  );
};
