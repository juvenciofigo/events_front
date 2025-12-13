import { Page, Priority, ProgressStatus } from "./system";

export interface Task {
    id: string;
    responsibleName: string;
    responsiblePhone: string;
    title: string;
    eventTitle: string;
    description: string;
    priority: Priority;
    taskStatus: ProgressStatus;
    dueDate: string;
    createdAt: string;
    updatedAt: string;

}

export interface PageTask extends Page<Task> { }