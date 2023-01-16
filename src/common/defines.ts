import { Columns } from './interfaces/columns.interface';

export const EMPLOYEE_FIELDS = ['name', 'email', 'status'];
export const TABLE_HEADERS: Columns[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 100 },

    {
        id: 'avatar',
        label: 'Actions',
        minWidth: 20,
        isAction: true,
    },
];
