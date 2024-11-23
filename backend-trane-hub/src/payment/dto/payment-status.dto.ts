class AmountPayment {
    value: number;
    currency: string;
}

class ObjectPayment {
    id: string;
    status: string;
    amount: AmountPayment;
    payment_method: {
        type: string;
        id: string;
        saved: boolean;
        title: string;
        card: object;
    };
    created_at: string;
    exrires_at: string;
    description: string;
    metadata: {
        order_id: string;
        user_id: string;
    };
}

export class PaymentStatusDto {
    event:
        | 'payment.succeeded'
        | 'payment.waiting_for_capture'
        | 'payment.canceled'
        | 'refund.succeeded';
    type: string;
    object: ObjectPayment;
}
