import React, { useEffect, useState } from 'react';
import { ApiClient, User } from '../../api/apiClient';
import CustomTable from '../../components/CustomTable';
import { View } from 'react-native';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TableViewScreen = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    refresh();
  }, []);

  const refreshCache = async (now: number) => {
    const userData = await ApiClient.fetchUsers();
    await AsyncStorage.setItem('cachedData', JSON.stringify(userData));
    await AsyncStorage.setItem('lastRefresh', `${now}`);
    setUsers(userData);
  };

  async function refresh() {
    const now = new Date().getTime();

    const cachedData = await AsyncStorage.getItem('cachedData');
    const lastRefresh = await AsyncStorage.getItem('lastRefresh');

    if (!cachedData || !lastRefresh) {
      await refreshCache(now);
    } else {
      const diffInMins = Math.abs(now - +lastRefresh) / (1000 * 60);
      if (diffInMins < 60) {
        console.log('from cache');
        setUsers(JSON.parse(cachedData));
      } else {
        console.log('from server');
        await refreshCache(now);
      }
    }
  }

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
