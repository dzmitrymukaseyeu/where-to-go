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

// {
//         firstName: string;
//         lastName: string;
//         email: string;
//         createdEvents: [];
//         eventsToVisit: [];
// };