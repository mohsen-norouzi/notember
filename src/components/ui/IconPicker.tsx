import { FC, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { GetIcons, MaterialIcons } from './Icons';

type IconPickerProps = {
  color: string;
  icon: string;
  onIconSelect: (icon: string) => void;
};

const defaultIcons = [...MaterialIcons].slice(0, 24);

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
        <TextField
          placeholder='Search icons...'
          className='border rounded-md w-full bg-gray-100'
          variant='outlined'
          size='small'
          value={filter}
          onChange={onChangeHandler}
        />
      </div>

      <div className='flex flex-wrap  p-2 items-center'>
        {icons.map((i) => (
          <IconButton className='flex' onClick={() => onIconSelectHandler(i)}>
            <Icon
              fontSize='small'
              sx={{
                height: '1.5rem',
                width: '1.5rem',
                color: i === selectedIcon ? props.color : null
              }}
            >
              {i}
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
