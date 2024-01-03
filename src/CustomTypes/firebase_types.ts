import { Questions } from "./QuestionTypes";

export type Class = {
    name: string;
    students: string[];
    id: string;
    teachers: string[];
    background: string;
    backgroundColor: string;
}

export type ClassLocal = {
    name: string;
    students: string[];
    id: string;
    teachers: string[];
    projects: Record<string, Project>
    background: string;
    backgroundColor: string;

}


export type Student = {
    name: string;
    id: string;
    email: string;
}

export type Teacher = {
    name: string;
    id: string;
    email: string;
    default_eval_template: Questions
}

export type Project = {
    id: string;
    name: string;
    eval_template: Questions;
    evals: Eval[];
    background: string;
    backgroundColor: string;
    cardColor: string;
    evalBackgroundColor: string;
    groups: Record<string, Group>
}

export type Eval = {
    submitterId: string;
    targetId: string;
    submission: EvalSubmission[];
}

export type EvalSubmission = {
    id: string;
    value: string | number;
    comment?: string;
}

export type Group = {
    name: string
    students: string[]
    id: string
}