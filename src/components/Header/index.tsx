import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Props } from './types';

const Header = ({ title, onRefresh }: Props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onRefresh}>
        <Text style={styles.refresh}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    height: 70,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  refresh: {
    color: '#66bb6a',
    fontWeight: 'bold',
  },
});

export default Header;
