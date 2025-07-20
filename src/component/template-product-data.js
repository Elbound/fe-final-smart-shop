const tempProductsData = [
    {
        name: "Sample Product 1",
        desc: "Description for product 1",
        price: 10000,
        quantity: 5,
        image: "/asset/no_image_available.png"
    },
    {
        name: "Sample Product 2",
        desc: "Description for product 2",
        price: 20000,
        quantity: 3,
        image: "/asset/no_image_available.png"
    },
    {
        name: "Sample Product 3",
        desc: "Description for product 3",
        price: 15000,
        quantity: 8,
        image: "/asset/no_image_available.png"
    }
];

export default function getTemplateProductData() {
    return tempProductsData;
}