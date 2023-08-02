import { Offsite } from "./Offsite";
import type { TeamMember } from "./Team";

export interface Budget {
    budget: number,
    offsite: Offsite
}

export interface SingleLineBudget {
    member: TeamMember,
    budget: number,
    offsite: Offsite
}