import { ProductListStages } from 'features/ProductList/model/enums';
import { ProtoTransition } from 'lib/FSM';
import { ProductType, ProductListState } from 'store';
import { CartStages, CartTransitionTypes } from './enums';
import { CartState } from './types';

export const trCartToCart = {
    type: CartTransitionTypes.CART__CART,
    from: CartStages.CART,
    to: CartStages.CART,
    collectData: (
        state: CartState,
        { id, isAdding }: { id: ProductType['id']; isAdding: boolean },
    ) => ({
        ...state.data,
        productsInCartAmount: isAdding
            ? state.data.productsInCartAmount + 1
            : state.data.productsInCartAmount - 1,
        products: state.data.products.map((product) =>
            product.id === id
                ? {
                      ...product,
                      inCartAmount: isAdding
                          ? product.inCartAmount + 1
                          : product.inCartAmount - 1,
                  }
                : product,
        ),
    }),
} satisfies ProtoTransition<CartState, CartState>;

export const trCartToPickingProducts = {
    type: CartTransitionTypes.CART__PICKING_PRODUCTS,
    from: CartStages.CART,
    to: ProductListStages.PICKING_PRODUCTS,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<CartState, ProductListState>;
