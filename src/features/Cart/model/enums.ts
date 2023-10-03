export enum CartStages {
    CART = 'CART',
}

export enum CartTransitionTypes {
    // Adding/removing items
    CART__CART = 'CART__CART',
    // Back to list
    CART__PICKING_PRODUCTS = 'CART__PICKING_PRODUCTS',
    // To payment
    CART__PAYMENT = 'CART__PAYMENT',
}
