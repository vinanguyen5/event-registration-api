export interface Event {
    id?: string;
    name: string;
    description: string;
    date: string;
    location: string;
    capacity: number;
    category: string;
    status: string;
    price?: number;
    organizerEmail: string;
    createdAt?: string;
    updatedAt?: string;
}
