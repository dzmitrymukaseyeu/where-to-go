export interface UserDefinition{
    id: number,
    lastName: string,
    firstName: string,
    email: string,
    subscriedEventsId: number[],
    createdEventsId: number[],
    username: string, 
    password: string, 
    cell: string,
}