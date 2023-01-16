/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../hooks/hooks';
import { createEmployee, employeeUpdate } from '../../features/employee/employeeSlice';
import { getEmployeeById } from '../../network/endpoints';
import StatusBar from '../status-bar/StatusBar';
import { Employee } from '../../common/interfaces/employee.interface';
import { STATUS } from '../../common/enums/status.enum';
import { ListTitle } from '../../appstyles';
import { EMPLOYEE_FIELDS } from '../../common/defines';
import { ToastContainer, toast } from 'react-toastify';


function AddEditEmployee({ history, match }) {
  const { id } = match.params;
  const isAddMode = !id;

  const initialValues = {
    name: '',
    email: '',

  };
  const dispatch = useAppDispatch()

  const [user, setUser] = useState<Employee>({} as Employee);
  const updateStatus = (status: STATUS) => {
    setUser({ ...user, status })

  }
  const validationSchema = Yup.object().shape({

    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),

  });

  const onSubmit = (fields) => {
    if (isAddMode) {
      createUser(fields);
    } else {
      updateUser(id, fields);
    }
  }

  const createUser = (fields) => {
    dispatch(createEmployee({ ...fields, status: STATUS.ADDED }))
    toast.success('Emplyee Added Successfully!', {
      position: toast.POSITION.TOP_RIGHT
  });
    history.push('.');
  }

  const updateUser = (id: number, fields) => {
    dispatch(employeeUpdate({ id, ...fields, status: user.status || STATUS.ADDED }))
    toast.success('Emplyee Updated Successfully!', {
      position: toast.POSITION.TOP_RIGHT
  });
    history.push('..');

  }



  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting, setFieldValue }) => {

        useEffect(() => {
          if (!isAddMode) {
            getEmployeeById(id).then((user) => {
              const fields = EMPLOYEE_FIELDS;
              fields.forEach(field => setFieldValue(field, user.data[field], false));
              setUser(user.data);
            })

          }
        }, []);


        return (
          <>
            <ListTitle>
              <h1>{isAddMode ? 'Add Employee' : 'Edit Employee'}</h1>
            </ListTitle>
            <div className="flex mx-auto py-8">
              {!isAddMode && <StatusBar status={user.status} onStatusUpdate={updateStatus}></StatusBar>}
            </div>
            <div className="container mx-auto py-8">
              <div className="w-4/5 mx-auto bg-white rounded shadow">
                <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">

                  <div className="-mx-3 md:flex mb-6">

                    <div className="md:w-full px-3">
                      <div className="form-group col-5">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Name</label>
                        <Field name="name" type="text" className={'appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3' + (errors.name && touched.name ? ' is-invalid' : '')} />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs" />
                      </div>

                    </div>


                  </div>
                  <div className="-mx-3 md:flex mb-6">

                    <div className="md:w-full px-3">
                      <div className="form-group col-5">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">Email</label>
                        <Field name="email" type="text" className={'appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3' + (errors.email && touched.email ? ' is-invalid' : '')} />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
                      </div>

                    </div>


                  </div>

                  <div className="form-group">
                    <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">
                      {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                      Save
                    </button>
                    <Link to={isAddMode ? '.' : '..'} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">Cancel</Link>
                  </div>
                </Form>
              </div>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default AddEditEmployee;

