import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ToastContainer, toast } from 'react-toastify';
import { Header, ListEmployeesContents, StatusBadge } from './ListEmployees.styles';

import TablePagination from "@mui/material/TablePagination";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getAllEmployees } from '../../features/employee/employeeSlice';
import { LoadingStyle } from '../loading/loading.styles';
import Loading from '../loading/loading';
import { TABLE_HEADERS } from '../../common/defines';
import { Columns } from '../../common/interfaces/columns.interface';



const ListEmployees = () => {
  const columns: Columns[] = TABLE_HEADERS;
  const [page, setPage] = React.useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(10);
  const allEmployees = useAppSelector(state => state.employees);
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getAllEmployees())
  }, [])


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const showErrorMessage = (error:string) => {
    toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
    });
};

  return (
    <>
    {!allEmployees.loading ? (
      <ListEmployeesContents>
        <Header> <button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1">
        <Link data-cy='create-users' to={`/create`}>Add New Employee</Link>
              </button></Header>
      <TableContainer >
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allEmployees?.employees?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow tabIndex={-1} key={row.id}>
                    {columns.map(column => {
                      const value: string = column?.isAction ? '' : row[column.id] || '-';
                      return (
                        <TableCell key={column.id} align={'left'}>
                          {!column?.isAction ? 
                          
                          (column?.id !== 'status'?value:<StatusBadge color={value}>{value}</StatusBadge>) :
                            <Link className="text-blue-500" to={`/edit/${row.id}`}>
                              Edit
                            </Link>
                           
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={allEmployees?.employees?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ListEmployeesContents>
    ):(  <LoadingStyle>
      <Loading />
    </LoadingStyle>)}
    {
      allEmployees.error && !allEmployees.loading? showErrorMessage(allEmployees.error):null
    }
    <ToastContainer limit={1} />
    </>
  );
};
export default ListEmployees;
