import { useContext } from 'react';
import { GetStateContext, ProductInfoState } from 'store';
import classes from './ProductInfo.module.scss';

export const ProductInfo = () => {
    const state = useContext(GetStateContext)();

    const {
        data: { productForInfo },
    } = state as ProductInfoState;
    const { id, title, description, price, brand, images } = productForInfo;

    return (
        <div className={classes.productInfo}>
            <h1>
                {id}. {title}
            </h1>
            <h2>{description}</h2>
            <div>{brand}</div>
            <div>Price: ${price}</div>
            <div className={classes.images}>
                {images.map((src) => (
                    <img key={src} src={src} alt={title} />
                ))}
            </div>
        </div>
    );
};
