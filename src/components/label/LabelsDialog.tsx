import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Input,
  List,
  ListItem
} from '@mui/material';
import { LabelsForm } from './LabelsForm';
import { LabelEntity } from 'graphql/generated/graphql-types';

type LabelsDialogProps = {
  open: boolean;
  labels: LabelEntity[];
  onClose: () => void;
};

export const LabelsDialog: FC<LabelsDialogProps> = (props) => {
  const onCancelHandler = () => {
    props.onClose();
  };

  const onSaveHandler = () => {};

  const onChange = () => {};

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      // open={labelsDialogOpen}
    >
      <DialogTitle>Edit Labels</DialogTitle>

      <DialogContent>
        <LabelsForm />

        <List sx={{ marginTop: '0.75rem' }}>
          {props.labels.map((label) => (
            <ListItem
              disablePadding
              key={label.id}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className='flex items-center '>
                <IconButton onClick={() => {}}>
                  <Icon
                    color='action'
                    fontSize='small'
                    style={{ color: label.attributes?.color! }}
                    className='material-icons-outlined'
                  >
                    {label.attributes?.icon}
                  </Icon>
                </IconButton>

                <Input
                  className='p-0 h-full ml-2'
                  disableUnderline
                  sx={{ fontSize: '14px', padding: '4px 0 2.5px' }}
                  value={label.attributes?.title}
                />
              </div>

              <IconButton style={{ inset: 0 }} onClick={() => {}}>
                <Icon fontSize='small' className='material-icons-outlined'>
                  delete
                </Icon>
              </IconButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancelHandler}>Cancel</Button>
        <Button onClick={onSaveHandler}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
