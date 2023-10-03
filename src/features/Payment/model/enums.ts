export enum PaymentStages {
    PAYMENT = 'PAYMENT',
    PAYING = 'PAYING',
    PAID = 'PAID',
}

export enum PaymentTransitionTypes {
    PAYMENT__CART = 'PAYMENT__CART',
    PAYMENT__PAYING = 'PAYMENT__PAYING',
    PAYING__PAID = 'PAYING__PAID',
    PAID__PICKING_PRODUCTS = 'PAID__PICKING_PRODUCTS',
}
