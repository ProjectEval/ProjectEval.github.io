import { Questions } from "./QuestionComps/QuestionTypes";

export type Class = {
    name: string;
    students: string[];
    id: string;
    teachers: string[];
}

export type ClassLocal = {
    name: string;
    students: string[];
    id: string;
    teachers: string[];
    projects: Record<string, Project>
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
}

export type Project = {
    id: string;
    name: string;
    students: string[];
    eval_template: Questions;
    evals: Eval[];
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