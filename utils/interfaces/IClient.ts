export interface IClient {
    id?: number;
    name: string;
    address: string;
    phone: string;
    identification: string;
    created_at?: Date;
    updated_at?: Date;
}