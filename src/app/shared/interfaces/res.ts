export interface ResDefinition {
        code: number;
        message: string;
        content?: {
                firstName: string;
                lastName: string;
                email: string;
                createdEvents: [];
                eventsToVisit: [];
        };
}