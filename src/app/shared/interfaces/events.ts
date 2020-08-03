export interface EventsAllDefinition {
    id: string;
    type: string;
    date: string;
    title: string;
    description: string;
    creator:{
        lastName: string;
        firstName: string;
        email: string;
    };
    bgImage: string;
    visitors: [
        {
            lastName: string;
            firstName: string;
            email: string;
        }
    ]; 
}

