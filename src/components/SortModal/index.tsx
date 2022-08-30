import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Switch,
  FlatList,
  Image,
} from 'react-native';
import { Props } from './types';

const TICK = require('./assets/tick.png');

const SortModal = ({ keys, modalVisible, onClose }: Props) => {
  const [isDescending, setIsDescending] = useState<boolean>(false);
  const [selectedKey, setSelectedKey] = useState<string>('');

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.itemButton}
          onPress={() => {
            setSelectedKey(selectedKey === item ? '' : item);
          }}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
        {selectedKey === item && (
          <Image source={TICK} style={{ height: 20, width: 20 }} />
        )}
      </View>
    );
  };

  const onSwitchChange = () => {
    setIsDescending(!isDescending);
  };

  const onClear = () => {
    setSelectedKey('');
    setIsDescending(false);
    onClose('', false);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={modalVisible}>
      <View style={styles.overlay} />
      <View style={styles.centered}>
        <View style={styles.modal}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClear}>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose.bind(null, selectedKey, isDescending)}>
              <Text style={styles.done}>Done</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.switchContainer}>
            <Text style={styles.descending}>Descending</Text>
            <Switch
              trackColor={{ true: '#a5d6a7' }}
              thumbColor={isDescending ? '#66bb6a' : 'lightgrey'}
              value={isDescending}
              onChange={onSwitchChange}
            />
          </View>
          <FlatList data={keys} renderItem={renderItem} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.5,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    height: '60%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginTop: 10,
  },
  done: {
    color: '#66bb6a',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clear: {
    color: '#ff8a65',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row-reverse',
    marginHorizontal: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  descending: {
    fontSize: 12,
    fontWeight: '500',
  },
  cell: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 10,
  },
  itemButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    marginEnd: 5,
  },
  item: {
    color: 'black',
    textTransform: 'capitalize',
  },
});

export default SortModal;
