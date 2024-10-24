import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useSearchStore } from "@/stores/useSearchStore";

interface Product {
    id: number;
    product_name: string;
    product_price: number;
    product_image: string;
    category: {
        category_name: string;
    };
}

interface ProductGridProps {
    initialProducts: Product[];
    categories: { id: number; category_name: string }[];
}

export function ProductGrid({ initialProducts, categories }: ProductGridProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [activeTab, setActiveTab] = useState(
        categories[0]?.category_name || ""
    );
    const filterProducts = useSearchStore((state) => state.filterProducts);

    const groupedProducts = filterProducts(products).reduce((acc, product) => {
        const categoryName = product.category.category_name;

        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, Product[]>);

    const handleDeleteProduct = (id: number) => {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    return (
        <>
            {/* Desktop view */}
            <div className="hidden md:block">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="mb-5">
                        {categories.map((category) => (
                            <TabsTrigger
                                key={category.id}
                                value={category.category_name}
                            >
                                {category.category_name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {categories.map((category) => (
                        <TabsContent
                            key={category.id}
                            value={category.category_name}
                        >
                            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
                                {groupedProducts[category.category_name]?.map(
                                    (product, index) => (
                                        <ProductCard
                                            key={index}
                                            name={product.product_name}
                                            price={product.product_price}
                                            image={product.product_image}
                                            productId={product.id}
                                            onDelete={handleDeleteProduct}
                                        />
                                    )
                                )}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-8">
                {Object.entries(groupedProducts).map(
                    ([category, categoryProducts]) => (
                        <div key={category}>
                            <h2 className="text-xl font-bold mb-4">
                                {category}
                            </h2>
                            <div className="overflow-x-auto pb-4">
                                <div className="flex space-x-4">
                                    {categoryProducts.map((product, index) => (
                                        <div
                                            key={index}
                                            className="flex-none w-64"
                                        >
                                            <ProductCard
                                                name={product.product_name}
                                                price={product.product_price}
                                                image={product.product_image}
                                                productId={product.id}
                                                onDelete={handleDeleteProduct}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </>
    );
}
