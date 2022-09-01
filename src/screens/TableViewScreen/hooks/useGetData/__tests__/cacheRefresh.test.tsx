import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { renderHook } from '@testing-library/react-hooks';
import { useGetData } from '../index';
import { getUsersApiSpy, USERS_FROM_SERVER } from '../utils/testUtils';

afterEach(async () => {
  await AsyncStorage.clear();
});

describe('test getData hook when cache is not empty and time since last refresh is more than 1 hour', () => {
  beforeEach(async () => {
    await AsyncStorage.setItem('cachedData', JSON.stringify(USERS_FROM_SERVER));
    await AsyncStorage.setItem(
      'lastRefresh',
      `${new Date().getTime() - 3700000}`,
    );
  });

  it('should return users from server when the current time exceeds the last refresh time by 1 hour', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual(USERS_FROM_SERVER);

    expect(getUsersApiSpy).toBeCalledTimes(1);
    expect(AsyncStorage.setItem).toBeCalledTimes(4);
  });
});
