export interface Columns {
    label: string;
    minWidth: number;
    id: 'name' | 'status' | 'avatar' | 'email';
    isAction?: boolean;
}
