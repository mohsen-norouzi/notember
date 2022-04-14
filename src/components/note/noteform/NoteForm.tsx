import { FC, useState } from 'react';
import { Button, Icon, IconButton, TextField, Tooltip } from '@mui/material';
import { NoteCheckList } from './checklist';
import { LabelEntity, NoteEntity, NoteInput } from 'graphql/generated/graphql-types';
import { Checklist } from 'models';
import { LabelMenu } from './LabelMenu';
import { NoteLabel } from '../NoteLabel';

type NoteFormProps = {
  note?: NoteEntity;
  onCreate: (note: NoteInput) => void;
};

export const NoteForm: FC<NoteFormProps> = (props) => {
  const [title, setTitle] = useState(props.note?.attributes?.title || '');
  const [description, setDescription] = useState(props.note?.attributes?.description || '');
  const [checklist, setChecklist] = useState<Checklist[]>(props.note?.attributes?.checklist || []);
  const [labels, setLabels] = useState<LabelEntity[]>(props.note?.attributes?.labels?.data || []);
  const [showChecklist, setShowCheckList] = useState(checklist.length > 0);

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

    props.onCreate(newNote);
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

  return (
    <>
      <TextField
        variant='outlined'
        size='small'
        placeholder='Title'
        value={title}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)}
        className='bg-white rounded-t-2xl w-full'
        inputProps={{ style: { fontSize: '0.9rem', fontWeight: '500' } }}
        InputProps={{ className: 'p-2' }}
        sx={{
          '.MuiOutlinedInput-notchedOutline': {
            border: 'none',
            fontWeight: 'bold'
          }
        }}
        autoFocus
      />

      <TextField
        variant='outlined'
        size='small'
        placeholder='Take a note...'
        className='bg-white w-full'
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
        <div className='p-5 flex flex-wrap w-full gap-1 bg-white'>
          {labels.map((label) => (
            <NoteLabel
              title={label.attributes!.title}
              key={label.attributes!.title}
              onDelete={() => onLabelsChangeHandler(label)}
            />
          ))}
        </div>
      )}

      <div className='flex flex-auto justify-between items-center bg-white rounded-b-2xl p-2 px-3'>
        <div className='flex items-center justify-around'>
          <Tooltip title='Add checklist' placement='bottom'>
            <IconButton onClick={() => setShowCheckList(!showChecklist)} size='small'>
              <Icon className='material-icons-outlined' fontSize='small'>
                playlist_add_check
              </Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title='Add label' placement='bottom'>
            <LabelMenu labels={labels} onChange={onLabelsChangeHandler} />
          </Tooltip>
        </div>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='small'
          onClick={onSubmitHandler}
          sx={{
            borderRadius: '15px',
            border: 'none',
            outline: 'none',
            fontStyle: 'normal',
            boxShadow: 'none',
            textTransform: 'unset',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Create
        </Button>
      </div>
    </>
  );
};
