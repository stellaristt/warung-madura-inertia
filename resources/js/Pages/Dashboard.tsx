import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ProductGrid } from "@/Components/ProductGrid";
import { Search, ShoppingCart } from "lucide-react";
import { AddCategory } from "@/Components/AddCategory";
import { AddProduct } from "@/Components/AddProduct";
import { Badge } from "@/Components/ui/badge";
import { Toaster } from "@/Components/ui/toaster";
import { useState } from "react";
import { CartDialog } from "@/Components/CartDialog";
import { useCartStore } from "@/stores/useCartStore";

interface Product {
    id: number;
    product_name: string;
    product_price: number;
    product_image: string;
    category: {
        category_name: string;
    };
}

interface Category {
    id: number;
    category_name: string;
}

interface ProductsProps {
    products: Product[];
    categories: Category[];
}

export default function Dashboard({ products, categories }: ProductsProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const totalItems = useCartStore((state) => state.getTotalItems());
    const totalPrice = useCartStore((state) => state.getTotalPrice());

    return (
        <AuthenticatedLayout>
            <Toaster />
            <div className="py-12 px-12">
                <div className="hidden md:block">
                    <div className="mx-auto">
                        <div className="flex justify-end gap-2 mb-4">
                            <AddCategory />
                            <AddProduct categories={categories} />
                            <Button onClick={() => setIsCartOpen(true)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Cart
                                {totalItems > 0 && (
                                    <Badge variant="destructive" className="ml-2">
                                        {totalItems}
                                    </Badge>
                                )}
                            </Button>
                        </div>
                    </div>
                    <ProductGrid
                        initialProducts={products}
                        categories={categories}
                    />
                </div>
                <div className="md:hidden space-y-4">
                    <div className="flex w-full items-center space-x-2">
                        <Input type="search" placeholder="Search" />
                        <Button type="submit">
                            <Search className="w-4 h-4" />
                        </Button>
                    </div>
                    <ProductGrid
                        initialProducts={products}
                        categories={categories}
                    />
                    <AddCategory width="w-full" />
                    <AddProduct width="w-full" categories={categories} />
                </div>
                {totalItems > 0 && (
                    <div className="mt-10 justify-end hidden md:flex">
                        <Button>
                            Total Bill: Rp. {totalPrice.toLocaleString()}
                        </Button>
                    </div>
                )}
                <div className="fixed bottom-4 right-4 md:hidden">
                    <Button
                        size="lg"
                        className="rounded-full"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-6 w-6" />
                        {totalItems > 0 && (
                            <Badge variant="destructive">{totalItems}</Badge>
                        )}
                    </Button>
                </div>
            </div>
            <CartDialog open={isCartOpen} onOpenChange={setIsCartOpen} />
        </AuthenticatedLayout>
    );
}
