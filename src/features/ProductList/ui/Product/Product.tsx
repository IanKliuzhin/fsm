export const Product = ({
    product,
}: {
    product: {
        id: number;
        title: string;
        price: number;
        description: string;
        category: {
            id: number;
            name: string;
            image: string;
        };
        images: string[];
    };
}) => {
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
