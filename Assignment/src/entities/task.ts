export class Task {
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    id?: string;

    constructor(title: string, description: string, assignee: string, dueDate: string, id?: string) {
        this.title = title;
        this.description = description;
        this.assignee = assignee;
        this.dueDate = dueDate;
        this.id = id;
    }
}