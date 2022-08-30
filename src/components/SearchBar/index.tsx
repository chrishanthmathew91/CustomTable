import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Keyboard,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Props } from './types';

const SEARCH = require('./assets/search.png');
const CLOSE = require('./assets/close.png');

const SearchBar = ({ onChangePhrase }: Props) => {
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [clicked, setClicked] = useState<boolean>(false);

  const onChangeText = (text: string) => {
    setSearchPhrase(text);
    onChangePhrase(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image
          source={SEARCH}
          style={{ height: 20, width: 20, marginLeft: 1 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={onChangeText}
          onFocus={() => {
            setClicked(true);
          }}
          onBlur={() => {
            setClicked(!!searchPhrase);
          }}
        />
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setSearchPhrase('');
              Keyboard.dismiss();
              setClicked(false);
              onChangePhrase('');
            }}>
            <Image
              source={CLOSE}
              style={{ padding: 1, height: 20, width: 20 }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  searchBar: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    flex: 1,
  },
  input: {
    marginLeft: 10,
    paddingVertical: 6,
    flex: 1,
  },
});
