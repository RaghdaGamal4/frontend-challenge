import { configureStore } from '@reduxjs/toolkit';
import { render, screen, cleanup } from '@testing-library/react';
import reducer, { getAllEmployees } from '../../features/employee/employeeSlice';
import ListEmployees from './ListEmployees';
export class MyService {
    async getAllEmployees() {
      return [   {
        "id": 6,
        "name": "Tamer",
        "status": "ADDED",
        "email": "Tamer@gmail.com"
      }];
    }
  }

test('should return the initial state', () => {
  expect(reducer(undefined, { type: undefined })).toBeDefined()
})


describe('ListEmployees', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should employee list fulfilled', async () => {
      jest.spyOn(MyService.prototype, 'getAllEmployees').mockResolvedValueOnce([   {
        "id": 6,
        "name": "Tamer",
        "status": "ADDED",
        "email": "Tamer@gmail.com"
      }]);
      const store = configureStore({ reducer });
      await store.dispatch(getAllEmployees());
      expect(store.getState()).toBeDefined();
    });

  });