import React, { useEffect, useState } from 'react';
import {
  Text,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Cell from '../Cell';
import { Data, Props, Section } from './types';
import SearchBar from '../SearchBar';
import SortModal from '../SortModal';
import { useSearch, useSort } from './hooks';

const CustomTable = ({ items, keyExtractor, ...rest }: Props) => {
  const [section, setSection] = useState<Section>({ titles: [], data: [] });

  const [sortModalVisible, setSortModalVisible] = useState(false);

  const { sortedSection, sort } = useSort(section);
  const { searchedSection, search } = useSearch(section);

  useEffect(() => {
    const columnTitles = Object.keys(items[0]);
    setSection({ titles: columnTitles, data: items });
  }, [items]);

  const onModalClose = (selectedKey: string, isDescending: boolean) => {
    setSortModalVisible(!sortModalVisible);
    sort(selectedKey, isDescending);
  };

  const renderItem = ({
    item,
    index: rowIndex,
  }: {
    item: Data;
    index: number;
  }) => {
    const bgndColorStyle = {
      backgroundColor:
        rowIndex % 2 === 0 ? rest.primaryRowColor : rest.secondaryRowColor,
    };
    return (
      <View
        key={rowIndex}
        style={[styles.row, rest.dataRowStyle, bgndColorStyle]}>
        {section.titles.map((title, index) => (
          <Cell
            key={title + rowIndex + index}
            numberOfColumns={section.titles.length}
            value={item[title]}
          />
        ))}
      </View>
    );
  };

  const renderSectionHeader = ({
    section: { titles },
  }: {
    section: { titles: string[] };
  }) => (
    <View style={[styles.row, rest.headerRowStyle]}>
      {titles.map((title, index) => {
        return (
          <Cell
            key={title + index}
            numberOfColumns={section.titles.length}
            value={title}
            textStyle={styles.headerText}
          />
        );
      })}
    </View>
  );

  return (
    <View>
      <View style={styles.mainContainer}>
        <SearchBar onChangePhrase={search} />
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            setSortModalVisible(!sortModalVisible);
          }}>
          <Text>SORT</Text>
        </TouchableOpacity>
      </View>
      <SectionList
        style={{ margin: 20 }}
        sections={[sortedSection ?? searchedSection ?? section]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
      <SortModal
        keys={section.titles}
        modalVisible={sortModalVisible}
        onClose={onModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  row: { flexDirection: 'row' },
  sortButton: {
    width: 80,
    paddingVertical: 6,
    marginStart: 10,
    backgroundColor: '#66bb6a',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default CustomTable;
