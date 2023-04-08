import { Quest } from "./Quest";

export interface User {
    id: number;
    name: string;
    pass: string;
    fullName: string;
    email: string;
    tokens: number;
    ranking: number;
    badge: number;
    quests: Quest[];
    questsanswerd: Quest[];
}