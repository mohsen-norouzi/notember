import { FC } from 'react';
import { ChromePicker, ColorResult } from 'react-color';

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export const ColorPicker: FC<ColorPickerProps> = (props) => {
  const onChangeHandler = (color: ColorResult) => {
    props.onChange(color.hex.toUpperCase());
  };

  return (
    <div>
      <ChromePicker color={props.color} onChange={onChangeHandler} disableAlpha />
    </div>
  );
};
