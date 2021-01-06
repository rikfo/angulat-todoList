import { Task } from './task.model';
export class List {
    public description: string;
    public isComplete: boolean;
    public tasks: Task[];

    constructor
    (
        desc: string,
        isComplete: boolean,
        tasks: Task[]
    )
    {
        this.description = desc;
        this.isComplete = isComplete;
        this.tasks = tasks;
    }
}