import { FC, useEffect, useState } from 'react';
import { Button, Icon, IconButton, Popover, Stack, Tab, Tabs } from '@mui/material';
import { ColorPicker } from './ColorPicker';
import { IconPicker } from './IconPicker';
import { TabContext, TabPanel } from '@mui/lab';

type PickerProps = {
  icon: string;
  color: string;
  onPick: (icon: string, color: string) => void;
};

export const Picker: FC<PickerProps> = (props) => {
  const [tabValue, setTabValue] = useState('icons');
  const [color, setColor] = useState(props.color);
  const [icon, setIcon] = useState(props.icon);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setColor(props.color);
    setIcon(props.icon);
    setAnchorEl(null);
  };

  const handleSave = () => {
    setAnchorEl(null);
    props.onPick(icon, color);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onIconSelectHandler = (icon: string) => {
    setIcon(icon);
  };

  const onColorSelectHandler = (color: string) => {
    setColor(color);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (props.icon !== icon) {
      console.log('props.icon changes');
      setIcon(props.icon);
    }
  }, [props.icon]);

  useEffect(() => {
    if (props.color !== color) {
      console.log('props.color changes');
      setColor(props.color);
    }
  }, [props.color]);

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
        <Tabs value={tabValue} onChange={handleTabChange} variant='fullWidth'>
          <Tab label='Icon' value='icons' />
          <Tab label='Color' value='colors' />
        </Tabs>

        <TabContext value={tabValue}>
          <TabPanel value='icons' sx={{ width: 256, padding: 0 }}>
            <IconPicker color={color} onIconSelect={onIconSelectHandler} icon={icon} />
          </TabPanel>

          <TabPanel value='colors' sx={{ width: 256, padding: 0 }}>
            <ColorPicker color={color} icon={icon} onChange={onColorSelectHandler} />
          </TabPanel>
        </TabContext>

        <Stack direction='row' spacing={1} className='w-full flex justify-around mb-2'>
          <IconButton color='primary' onClick={handleClose}>
            <Icon className='text-gray-400'>close</Icon>
          </IconButton>
          <IconButton color='primary' onClick={handleSave}>
            <Icon>check</Icon>
          </IconButton>
        </Stack>
      </Popover>
    </div>
  );
};
