import { FC, useState } from 'react';
import { CirclePicker, ColorResult } from 'react-color';

import { COLORS } from 'constants/colors';

type ColorPickerProps = {
  icon: string;
  color: string;
  onChange: (color: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = (props) => {
  const [color, setColor] = useState(props.color);

  const onChangeHandler = (color: ColorResult) => {
    setColor(color.hex.toUpperCase());
    props.onChange(color.hex.toUpperCase());
  };

  return (
    <div className='flex justify-center items-center p-5'>
      <CirclePicker
        color={color}
        onChange={onChangeHandler}
        circleSize={24}
        colors={COLORS}
        className='flex items-center justify-center p-0 content-center'
      />
    </div>
  );
};
