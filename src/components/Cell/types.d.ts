import { TextStyle, ViewStyle } from 'react-native';

export interface Props {
  numberOfColumns: number;
  value: string | number;
  cellStyle?: ViewStyle;
  textStyle?: TextStyle;
}
