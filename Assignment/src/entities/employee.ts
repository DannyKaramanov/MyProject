export class Employee{
    name: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    salary: number;
    id?: string;
    numberTasks?: number;

    constructor(name: string, email: string, phone: string, dateOfBirth: string, salary: number, id?: string, numberTasks?: number) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.salary = salary;
        this.id = id;
        this.numberTasks = numberTasks;
    }
}