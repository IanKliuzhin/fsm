import type { ProductType } from 'store';

export const ProductItem = ({ product }: { product: ProductType }) => {
    const { id, title, description, price, images } = product;
    return (
        <div>
            {id}. {title}
            <br />
            {description}
            <br />
            Price: ${price}
            {images.map((url, index) => (
                <img
                    src={url}
                    key={`${url}-${index}`}
                    alt={title}
                    height="100"
                />
            ))}
        </div>
    );
};
