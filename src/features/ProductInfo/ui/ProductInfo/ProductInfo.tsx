import { useContext } from 'react';
import { GetStateContext, ProductInfoState } from 'store';

export const ProductInfo = () => {
    const state = useContext(GetStateContext)();

    const {
        data: { productForInfo },
    } = state as ProductInfoState;
    const { id, title, description, price, brand, images } = productForInfo;

    return (
        <div>
            <br />
            {id}. {title}
            <br />
            {description}
            <br />
            Price: ${price}
            <br />
            Brand: ${brand}
            <br />
            {images.map((src) => (
                <img key={src} src={src} height={300} alt={title} />
            ))}
        </div>
    );
};
