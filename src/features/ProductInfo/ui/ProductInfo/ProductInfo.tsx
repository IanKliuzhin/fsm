import { useContext } from 'react';
import { ActionContext, GetStateContext, ProductInfoState } from 'store';
import { TransitionTypes } from 'store/enums';

export const ProductInfo = () => {
    const state = useContext(GetStateContext)();
    const dispatch = useContext(ActionContext);

    const {
        data: { productForInfo },
    } = state as ProductInfoState;
    const { id, title, description, price, brand, category, images } =
        productForInfo;

    const onClickBack = () => {
        dispatch({
            type: TransitionTypes.PRODUCT_INFO__PICKING_PRODUCTS,
            payload: {},
        });
    };
    return (
        <div>
            <button type="button" onClick={onClickBack}>
                Back
            </button>
            {id}. {title}
            <br />
            {description}
            <br />
            Price: ${price}
            <br />
            Brand: ${brand}
            <br />
            Category: ${category}
            <br />
            {images.map((src) => (
                <img key={src} src={src} height={300} alt={title} />
            ))}
        </div>
    );
};
