export interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
    date?: Date;
    checklist: CheckList[] | [];
    startDate?: Date;
    dueDate?: Date;
}
export interface CheckList {
    name: string;
    isChecked: boolean;
}
