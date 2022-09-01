import { ApiClient } from '../../../../../api/apiClient';

export const USERS_FROM_SERVER = [
  {
    name: 'Matthew',
    age: 20,
  },
];

export const USERS_FROM_CACHE = [
  {
    name: 'Mark',
    age: 32,
  },
];

export const getUsersApiSpy = jest
  .spyOn(ApiClient, 'fetchUsers')
  .mockImplementation(
    () =>
      new Promise(resolve => {
        resolve(USERS_FROM_SERVER);
      }),
  );
