export interface IPayment {
    id?: number;
    loan_id: number;
    capital_deposit: number;
    interest_deposit: number;
    capital_remaining: number;
    fortnight: boolean;
    created_at?: Date;
    updated_at?: Date;
}