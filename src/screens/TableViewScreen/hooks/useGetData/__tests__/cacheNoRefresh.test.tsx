import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { renderHook } from '@testing-library/react-hooks';
import { useGetData } from '../index';
import { getUsersApiSpy, USERS_FROM_CACHE } from '../utils/testUtils';

afterEach(async () => {
  await AsyncStorage.clear();
});

describe('test getData hook when cache is not empty and time since last refresh is less than 1 hour', () => {
  beforeEach(async () => {
    const usersAsString: string = JSON.stringify(USERS_FROM_CACHE);
    await AsyncStorage.setItem('cachedData', usersAsString);
    await AsyncStorage.setItem('lastRefresh', `${new Date().getTime() - 6000}`);
  });

  it('should return users from cache when the current time is lesser than the last refresh time by 1 hour', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual(USERS_FROM_CACHE);

    expect(getUsersApiSpy).toBeCalledTimes(0);
    expect(AsyncStorage.getItem).toBeCalledTimes(2);
  });
});
