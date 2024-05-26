export interface ILoan {
    id?: number;
    amount: number | string;
    capital_remaining: number | string;
    created_at?: Date;
    updated_at?: Date;
    client_id?: number;
}