import { FC, useEffect, useState } from 'react';
import { Icon, IconButton, Input, Typography } from '@mui/material';
import { GetIcons, MaterialIcons } from './Icons';

type IconPickerProps = {
  color: string;
  icon: string;
  onIconSelect: (icon: string) => void;
};

const defaultIcons = [...MaterialIcons].slice(0, 28);

export const IconPicker: FC<IconPickerProps> = (props) => {
  const [icons, setIcons] = useState<string[]>(defaultIcons);
  const [selectedIcon, setSelectedIcon] = useState(props.icon);
  const [filter, setFilter] = useState<string>('');

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const onIconSelectHandler = (value: string) => {
    setSelectedIcon(value);
    props.onIconSelect(value);
  };

  useEffect(() => {
    if (filter.trim() === '') {
      setIcons(defaultIcons);
    } else {
      const filteredIcons = GetIcons(filter).slice(0, 24);
      setIcons(filteredIcons);
    }
  }, [filter]);

  return (
    <div>
      <div className='flex items-center border-b border-b-gray-200 p-3'>
        <Input
          placeholder='Search icons...'
          className='border py-2 px-3 rounded-md w-full '
          sx={{ fontSize: '14px', borderColor: 'divider' }}
          disableUnderline
          value={filter}
          onChange={onChangeHandler}
        />
      </div>

      <div className='flex flex-wrap p-1 items-center'>
        {icons.map((icon, index) => (
          <IconButton key={index} className='flex' onClick={() => onIconSelectHandler(icon)}>
            <Icon
              sx={{
                height: '1.5rem',
                width: '1.5rem',
                color: icon === selectedIcon ? props.color : null
              }}
            >
              {icon}
            </Icon>
          </IconButton>
        ))}

        {icons.length === 0 && (
          <div className='flex items-center justify-center p-5 w-full h-full'>
            <Typography sx={{ fontSize: 14 }} color='text.secondary'>
              No icons found.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
