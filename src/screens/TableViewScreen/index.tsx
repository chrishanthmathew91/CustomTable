import React from 'react';
import { User } from '../../api/apiClient';
import CustomTable from '../../components/CustomTable';
import { View } from 'react-native';
import Header from '../../components/Header';
import { useGetData } from './hooks/useGetData';

const TableViewScreen = () => {
  const { users, refresh } = useGetData();

  const headerRowStyle = { backgroundColor: '#e0e0e0' };
  return (
    <View>
      <Header title="Table" onRefresh={refresh} />
      {users.length > 0 && (
        <CustomTable
          items={users}
          keyExtractor={(item, index) => (item as User).name + index}
          headerRowStyle={headerRowStyle}
          primaryRowColor="#e8f5e9"
          secondaryRowColor="#c8e6c9"
        />
      )}
    </View>
  );
};

export default TableViewScreen;
