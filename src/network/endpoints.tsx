import { Employee } from "../common/interfaces/employee.interface";
import axiosInstance from "./axiosInstance"

export const getAllEmployees = () =>
  axiosInstance.get(`/employees`);

export const getEmployeeById = (employeeId: number) =>
  axiosInstance.get(`/employees/${employeeId}`);

export const updateEmployee = (employeeId: number, employeeData: Employee) =>
  axiosInstance.put(`/employees/${employeeId}`, { ...employeeData })

  export const createEmployee = (employeeData: Employee) =>
  axiosInstance.post(`/employees`, { ...employeeData })

export const search = (query: any, maxResults: any) =>
  axiosInstance.post(`/search`, { query, maxResults });
