import React from 'react';
import {
  ClickAwayListener,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip
} from '@mui/material';
import { GetLabelsQuery, LabelEntity, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';

type LabelMenuProps = {
  labels: LabelEntity[];
  onChange: (labels: LabelEntity) => void;
};

export const LabelMenu: React.FC<LabelMenuProps> = (props) => {
  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    getGraphQLRequestClient(),
    {}
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'note-labels-popover' : undefined;

  const handleToggleLabel = (value: LabelEntity) => {
    props.onChange(value);
  };

  return (
    <Tooltip title='Add label' placement={open ? 'top' : 'bottom'}>
      <div>
        <IconButton onClick={handleClick} size='small'>
          <Icon className='material-icons-outlined' fontSize='small'>
            label
          </Icon>
        </IconButton>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          hideBackdrop
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          className='pointer-events-none'
          classes={{
            paper: 'pointer-events-auto prevent-add-close'
          }}
        >
          <ClickAwayListener onClickAway={handleClose}>
            <List>
              {data?.labels &&
                data.labels.data.map((label) => (
                  <ListItem
                    key={label.id}
                    button
                    dense
                    onClick={() => handleToggleLabel(label)}
                    className='px-0'
                  >
                    <Icon
                      color='action'
                      fontSize='small'
                      className='p-0 text-xs'
                      sx={{ height: 'inherit' }}
                    >
                      {props.labels.find((l) => l.id === label.id)
                        ? 'check_box'
                        : 'check_box_outline_blank'}
                    </Icon>
                    <ListItemText
                      className='truncate px-2'
                      primary={label.attributes?.title}
                      disableTypography
                    />
                  </ListItem>
                ))}
            </List>
          </ClickAwayListener>
        </Popover>
      </div>
    </Tooltip>
  );
};
