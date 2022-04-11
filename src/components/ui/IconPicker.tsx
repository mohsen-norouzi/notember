import { FC, useState } from 'react';
import { Icon, IconButton, Popover } from '@mui/material';
import { ColorPicker } from './ColorPicker';

type IconPickerProps = {
  icon: string;
  color: string;
  onPick: (icon: string, color: string) => void;
};

export const IconPicker: FC<IconPickerProps> = (props) => {
  const [color, setColor] = useState(props.color);
  const [icon, setIcon] = useState(props.icon);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    props.onPick(icon, color);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onColorChangeHandler = (color: string) => {
    setColor(color);
  };

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <Icon color='action' fontSize='small' style={{ color }} className='material-icons-outlined'>
          {icon}
        </Icon>
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <ColorPicker color={color} onChange={onColorChangeHandler} />
      </Popover>
    </div>
  );
};
