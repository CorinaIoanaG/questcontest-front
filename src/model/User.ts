import { Quest } from "./Quest";

export interface User {
    id: number;
    name: string;
    pass: string;
    fullName: string;
    email: string;
    tokens: number;
    ranking: number;
    quests: Quest[];
    questsanswerd: Quest[];
}