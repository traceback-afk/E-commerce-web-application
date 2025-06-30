export class Product {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    images: string[];
    brand?: string;
    rating?: number;
    stock: number;
    isFeatured?: boolean;
    createdAt: Date;

    constructor({
        id,
        title,
        description,
        price,
        category,
        image,
        images = [],
        brand,
        rating = 0,
        stock,
        isFeatured = false,
        createdAt,
    }: {
        id: string;
        title: string;
        description: string;
        price: number;
        category: string;
        image: string;
        images?: string[];
        brand?: string;
        rating?: number;
        stock: number;
        isFeatured?: boolean;
        createdAt: Date;
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.images = images;
        this.brand = brand;
        this.rating = rating;
        this.stock = stock;
        this.isFeatured = isFeatured;
        this.createdAt = createdAt;
    }
}
