import { EvalSubmission } from "./firebase_types";

export type Question<T> = {
    Question: string;
    Answer: T
    id: string
    hasComment: boolean
}

export type RangeAnswer = {
    Type: "Range";
    Min: number;
    MinTitle: string;
    Max: number;
    MaxTitle: string;
}

export type MultiChoiceAnswer = {
    Type: "MultiChoice";
    Choices: string[];
}

export type MultiSelectAnswer = {
    Type: "MultiSelect";
    Choices: string[];
}

export type FreeResponseAnswer = {
    Type: "FreeResponse"
}
export type Questions = Question<Answer>[]

export type QuestionProps<T> = {question: Question<T>; updateEval: (answer: string | number) => void; getEval?: () => EvalSubmission; submission: EvalSubmission; updateEvalComment: (comment: string) => void;}

export type Answer = RangeAnswer | MultiChoiceAnswer | MultiSelectAnswer | FreeResponseAnswer