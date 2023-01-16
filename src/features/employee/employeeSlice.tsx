import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../../common/interfaces/employee.interface";
import * as EmployeeAPI from '../../network/endpoints'


type InitialState = {
  loading?: boolean
  employees: Employee[];
  employee: Employee,
  searchResults: Employee[];
  error: string
}
const initialState: InitialState = {
  loading: false,
  employees: [],
  employee: {} as Employee,
  searchResults: [],
  error: ''
}
export const getAllEmployees = createAsyncThunk(
  "employees",
  async () => {
    const res = await EmployeeAPI.getAllEmployees();
    return res.data;
  }
);

export const employeeUpdate = createAsyncThunk(
  "employee/update",
  async (employeeData: Employee) => {
    await EmployeeAPI.updateEmployee(employeeData.id, employeeData);
    return employeeData;
  }
);

export const employeeDetails = createAsyncThunk(
  "employee/id",
  async (id: number) => {
    const res = await EmployeeAPI.getEmployeeById(id);
    return res.data;
  }
);

export const createEmployee = createAsyncThunk(
  "employee",
  async (employeeData: Employee) => {
    const res = await EmployeeAPI.createEmployee(employeeData);
    return res.data;
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllEmployees.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getAllEmployees.fulfilled,
      (state, action: PayloadAction<Employee[]>) => {
        state.loading = false
        state.employees = action.payload.reverse()
        state.error = ''
      }
    )
    builder.addCase(getAllEmployees.rejected, (state, action) => {
      state.loading = false
      state.employees = []
      state.error = action.error.message || 'Something went wrong'
    })

    builder.addCase(employeeDetails.pending, state => {
      state.loading = true
    })
    builder.addCase(
      employeeDetails.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false

        state.employee = action.payload
        state.error = ''
      }
    )
    builder.addCase(employeeDetails.rejected, (state, action) => {
      state.loading = false
      state.employees = []
      state.error = action.error.message || 'Something went wrong'
    })
    builder.addCase(createEmployee.pending, state => {
      state.loading = true
    })
    builder.addCase(
      createEmployee.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false

        state.error = ''
      }
    )
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Something went wrong'
    })
    builder.addCase(employeeUpdate.pending, state => {
      state.loading = true
    })
    builder.addCase(
      employeeUpdate.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false
        const index = state.employees.findIndex(employee => +employee.id === +action.payload.id);
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
        state.error = ''
      }
    )
    builder.addCase(employeeUpdate.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message || 'Something went wrong'
    })
  }
});
const { reducer } = employeeSlice;
export default reducer;