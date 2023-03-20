import {ColorValue} from 'react-native';

type TColors = {
  primary: ColorValue;
  white: ColorValue;
  black: ColorValue;
  blackOpaque: ColorValue;
  gray: ColorValue;
  grayOpaque: ColorValue;
  transparent: ColorValue;
};

export const Colors: TColors = {
  primary: '#c69c6d',
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  gray: '#e1e1e1',
  grayOpaque: 'rgba(225,225,225,0.5)',
  blackOpaque: 'rgb(24,26,28)',
};
