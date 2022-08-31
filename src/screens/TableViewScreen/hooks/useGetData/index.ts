import { useEffect, useState } from 'react';
import { ApiClient, User } from '../../../../api/apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGetData = () => {
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

  return {
    users,
    refresh,
  };
};
