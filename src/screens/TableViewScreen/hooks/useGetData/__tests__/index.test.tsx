import { useGetData } from '../index';
import AsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { ApiClient } from '../../../../../api/apiClient';
import { renderHook } from '@testing-library/react-hooks';

const USERS_FROM_SERVER = [
  {
    name: 'Matthew',
    age: 20,
  },
];

const USERS_FROM_CACHE = [
  {
    name: 'Mark',
    age: 32,
  },
];

const getUsersApiSpy = jest.spyOn(ApiClient, 'fetchUsers').mockImplementation(
  () =>
    new Promise(resolve => {
      resolve(USERS_FROM_SERVER);
    }),
);

describe('test getData hook when cache is empty', () => {
  it('should get data from server when there is nothing in the cache', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual([
      {
        name: 'Matthew',
        age: 20,
      },
    ]);
    expect(getUsersApiSpy).toHaveBeenCalled();
    expect(AsyncStorage.getItem).toBeCalledTimes(2);
  });
});

describe('test getData hook when cache is not empty and time since last refresh is less than 1 hour', () => {
  beforeAll(async () => {
    const usersAsString: string = JSON.stringify(USERS_FROM_CACHE);
    await AsyncStorage.setItem('cachedData', usersAsString);
    await AsyncStorage.setItem('lastRefresh', `${new Date().getTime() - 6000}`);
  });

  afterAll(async () => {
    await AsyncStorage.clear();
  });

  it('should return users from cache when the current time is lesser than the last refresh time by 1 hour', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual(USERS_FROM_CACHE);

    expect(getUsersApiSpy).toBeCalledTimes(0);
    expect(AsyncStorage.getItem).toBeCalledTimes(2);
  });
});

describe('test getData hook when cache is not empty and time since last refresh is more than 1 hour', () => {
  beforeEach(async () => {
    const usersAsString: string = JSON.stringify(USERS_FROM_CACHE);
    await AsyncStorage.setItem('cachedData', usersAsString);
    await AsyncStorage.setItem(
      'lastRefresh',
      `${new Date().getTime() - 3700000}`,
    );
  });

  afterAll(async () => {
    await AsyncStorage.clear();
  });

  it('should return users from server when the current time exceeds the last refresh time by 1 hour', async function () {
    const { result, waitForNextUpdate } = renderHook(() => useGetData());

    await waitForNextUpdate();

    expect(result.current.users).toEqual(USERS_FROM_SERVER);

    expect(getUsersApiSpy).toBeCalledTimes(1);
    expect(AsyncStorage.getItem).toBeCalledTimes(2);
  });
});
