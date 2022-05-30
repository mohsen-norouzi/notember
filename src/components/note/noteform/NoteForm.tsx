import { FC, useState } from 'react';
import { Button, Fab, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import { NoteCheckList } from './checklist';
import { LabelEntity, Maybe, NoteEntity, NoteInput } from 'graphql/generated/graphql-types';
import { Checklist } from 'models';
import { LabelMenu } from './LabelMenu';
import { NoteLabel } from '../NoteLabel';
import { ImagePicker } from './ImagePicker';
import clsx from 'clsx';

type NoteFormProps = {
  note?: NoteEntity;
  onCreate: (note: NoteInput) => void;
  onDelete?: (id: string) => void;
  onDeleteImage?: (id: string) => void;
};

type NoteImage = {
  id: string;
  url: string;
};

export const NoteForm: FC<NoteFormProps> = (props) => {
  const [title, setTitle] = useState(props.note?.attributes?.title || '');
  const [description, setDescription] = useState(props.note?.attributes?.description || '');
  const [checklist, setChecklist] = useState<Checklist[]>(props.note?.attributes?.checklist || []);
  const [labels, setLabels] = useState<LabelEntity[]>(props.note?.attributes?.labels?.data || []);
  const [showChecklist, setShowCheckList] = useState(checklist.length > 0);

  const noteImage = props.note?.attributes?.image?.data?.id
    ? {
        id: props.note?.attributes?.image?.data?.id || '',
        url: props.note?.attributes?.image?.data?.attributes?.url || ''
      }
    : null;

  const [image, setImage] = useState<Maybe<NoteImage>>(noteImage);

  const onSubmitHandler = (e: React.MouseEvent) => {
    e.preventDefault();

    const labelIDs: string[] = labels.map((l) => l.id!);

    const newNote: NoteInput = {
      title,
      description,
      checklist
    };

    if (labelIDs.length > 0) {
      newNote.labels = labelIDs;
    }

    if (image && image.id) {
      newNote.image = image.id;
    }

    props.onCreate(newNote);

    // reset
    setTitle('');
    setDescription('');
    setChecklist([]);
    setLabels([]);
    setImage(null);
  };

  const toggleChecklistHandler = () => {
    if (showChecklist) {
      onChecklistChangeHandler([]);
    }

    setShowCheckList((currValue) => !currValue);
  };

  const onChecklistChangeHandler = (value: Checklist[]) => {
    setChecklist(value);
  };

  const onLabelsChangeHandler = (label: LabelEntity) => {
    const index = labels.findIndex((l) => l.id === label.id);
    let newLabels = [...labels];

    if (index === -1) {
      newLabels.push(label);
    } else {
      newLabels.splice(index, 1);
    }

    setLabels(newLabels);
  };

  const handleImagePick = (imageID: string, imageUrl: string) => {
    setImage({
      id: imageID,
      url: imageUrl
    });
  };

  const handleDeleteImage = () => {
    if (image && image.id && props.onDeleteImage) {
      props.onDeleteImage(image.id);
      setImage(null);
    }
  };

  return (
    <>
      {image && image.url && (
        <div className='relative'>
          <img
            src={import.meta.env.VITE_GRAPHQL_ENDPOINT + image.url}
            className='w-full block h-full'
            alt='note'
          />
          <Fab
            sx={{ position: 'absolute', bottom: 0, right: 0, margin: '.8rem', cursor: 'pointer' }}
            variant='circular'
            size='small'
            color='error'
            aria-label='Delete Image'
            type='button'
            onClick={handleDeleteImage}
          >
            <Icon fontSize='small'>delete</Icon>
          </Fab>
        </div>
      )}

      <TextField
        variant='outlined'
        size='small'
        placeholder='Title'
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        className={clsx('w-full', {
          'rounded-t-2xl': !image?.url
        })}
        InputProps={{ className: 'p-2' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
        autoFocus
      />

      <TextField
        variant='outlined'
        size='small'
        placeholder='Description'
        value={description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
        inputProps={{ style: { fontSize: '0.9rem', padding: '8px' } }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
        multiline
        rows={4}
      />

      {showChecklist && (
        <NoteCheckList checklist={checklist} onChecklistChange={onChecklistChangeHandler} />
      )}

      {labels.length > 0 && (
        <div className='p-5 flex flex-wrap w-full gap-1'>
          {labels.map((label) => (
            <NoteLabel
              title={label.attributes!.title}
              key={label.attributes!.title}
              onDelete={() => onLabelsChangeHandler(label)}
            />
          ))}
        </div>
      )}

      <div className='flex flex-auto justify-between items-center rounded-b-2xl p-2 px-3'>
        <div className='flex items-center justify-around gap-x-2'>
          <Tooltip title='Add checklist' placement='bottom'>
            <IconButton onClick={toggleChecklistHandler} size='small'>
              <Icon fontSize='small'>playlist_add_check</Icon>
            </IconButton>
          </Tooltip>

          <LabelMenu labels={labels} onChange={onLabelsChangeHandler} />

          <ImagePicker onPick={handleImagePick} />
        </div>

        <div className='flex items-center justify-center gap-2'>
          {props.note && (
            <Tooltip title='Delete Note' placement='bottom'>
              <IconButton onClick={() => props.onDelete && props.onDelete(props.note?.id!)}>
                <Icon fontSize='small'>delete</Icon>
              </IconButton>
            </Tooltip>
          )}

          <div className='flex gap-1'>
            <Button
              type='submit'
              variant='outlined'
              color='primary'
              size='small'
              onClick={onSubmitHandler}
              sx={{
                borderRadius: '15px',
                outline: 'none',
                fontStyle: 'normal',
                boxShadow: 'none',
                textTransform: 'unset',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              {props.note ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
