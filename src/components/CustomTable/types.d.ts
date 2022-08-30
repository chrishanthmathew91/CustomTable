import { TextStyle, ViewStyle } from 'react-native';

export type Data = Record<string, string | number>;

export interface Section {
  titles: string[];
  data: Data[];
}

export interface Props {
  items: Data[];
  keyExtractor: ((item: Data, index: number) => string) | undefined;
  headerRowStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  primaryRowColor?: string;
  secondaryRowColor?: string;
  dataRowStyle?: ViewStyle;
  dataTextStyle?: TextStyle;
}
