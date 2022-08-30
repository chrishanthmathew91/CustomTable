import React, { useMemo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Props } from './types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const Cell = ({ numberOfColumns, value, cellStyle, textStyle }: Props) => {
  const cellWidth = useMemo(
    () => ({
      width: (SCREEN_WIDTH - 40) / (numberOfColumns > 0 ? numberOfColumns : 1),
    }),
    [numberOfColumns],
  );

  return (
    <View style={[styles.cell, cellWidth, cellStyle]}>
      <Text style={[styles.text, textStyle]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: 100,
    height: 30,
    paddingStart: 5,
    paddingTop: 5,
  },
  text: {
    textTransform: 'capitalize',
  },
});

export default Cell;
