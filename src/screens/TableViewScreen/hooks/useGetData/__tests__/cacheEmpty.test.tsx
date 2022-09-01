import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { renderHook } from '@testing-library/react-hooks';
import { useGetData } from '../index';
import { getUsersApiSpy, USERS_FROM_SERVER } from '../utils/testUtils';

afterEach(async () => {
  await AsyncStorage.clear();
});

describe('test getData hook when cache is empty', () => {
  it('should get data from server when there is nothing in the cache', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual(USERS_FROM_SERVER);
    expect(getUsersApiSpy).toHaveBeenCalled();
    expect(AsyncStorage.getItem).toBeCalledTimes(2);
  });
});
