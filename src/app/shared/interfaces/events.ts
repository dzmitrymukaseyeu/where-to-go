export interface EventsAllDefinition {
    id: number,
    type: string,
    date: string,
    title: string,
    description: string,
    user:{
        lastName: string,
        firstName: string,
        email: string,
    },
    bgImage: string
}

