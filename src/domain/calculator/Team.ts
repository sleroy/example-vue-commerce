export class TeamMember {
    constructor(public location: string, public staff: number, public closestAirport: string) {
        
    }
}

export interface Team {
    members: TeamMember[]
    
}