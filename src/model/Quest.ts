import { User } from "./User";

export interface Quest{
    id: number;
    tokens: number;
    questDescription: string;
    answer: string
    userQuestProposed: User;
 }