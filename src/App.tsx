import React, { useEffect, FC } from 'react';
import { Route } from 'react-router-dom';
import ListEmployees from './components/employee-list/ListEmployees';
import { ListTitle } from './appstyles'
import AddEditEmployee from './components/add-edit-Employee/AddEditEmployee';
import 'react-toastify/dist/ReactToastify.css';

const EmplyeesApp: FC = () => {


  return (
    <>
      <Route
        path='/'
        exact
        render={() => (
          <>
                <ListTitle>
                  <h1>Employees</h1>
                </ListTitle>
                <ListEmployees  />
          </>
        )}
      />
          <Route
        path='/create'
        render={({ history, match }) => (
          <AddEditEmployee
            history={history}
            match={match}
          />
        )}
      />
      <Route
        path='/edit/:id'
        render={({ history, match }) => (
          <AddEditEmployee
            history={history}
            match={match}
          />
        )}
      />
    </>
  );
};

export default EmplyeesApp;
