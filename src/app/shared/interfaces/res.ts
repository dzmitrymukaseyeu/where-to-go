import { EventsAllDefinition } from './events';
import { UserDefinition } from './users';

export interface ResDefinition {
        code: number;
        message: string;
        content?: unknown;
}

export interface ResEventsDefinition extends ResDefinition {
        content: EventsAllDefinition[];
}

export interface ResUserDefinition extends ResDefinition {
        content: UserDefinition;
}

export interface ResUserEventsDefinition extends ResDefinition {
        content: {
                createdEvents: [];
                eventsToVisit: [];
        };
}
// {
//         firstName: string;
//         lastName: string;
//         email: string;
//         createdEvents: [];
//         eventsToVisit: [];
// };