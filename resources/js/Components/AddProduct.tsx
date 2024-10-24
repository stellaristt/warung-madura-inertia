import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";
import { CloudUpload } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { toast } from "@/hooks/use-toast";
import { ToastProvider } from "./ui/toast";
import React from "react";

export interface Category {
    id: number;
    category_name: string;
}

interface Product {
    id: number;
    product_name: string;
    product_price: number;
    product_image: string;
    category: {
        category_name: string;
    };
}

export interface AddProductProps {
    width?: string;
    categories: Category[];
}

export function AddProduct({ width, categories }: AddProductProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);

    const { data, setData, post, reset } = useForm({
        productName: "",
        price: "",
        category: "",
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            setData("image", file);
        }
    };

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        post("/products", {
            onSuccess: () => {
                setIsOpen(false);
                reset();
                toast({
                    title: "Berhasil!",
                    description: "Data produk telah berhasil ditambahkan",
                    className: "bg-green-400",
                });
                if (imagePreview) {
                    URL.revokeObjectURL(imagePreview);
                    setImagePreview(null);
                }

            },
        });
    };

    const handleDialogClose = () => {
        setIsOpen(false);
        reset();
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
        }
    };

    return (
        <ToastProvider>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className={`${width} border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`}
                        variant="outline"
                    >
                        + Add Product
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleConfirm} encType="multipart/form-data">
                        <div className="grid gap-4 py-4">
                            {/* Upload Image */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="image"
                                    className="text-right col-span-4"
                                >
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        {imagePreview ? (
                                            <div className="relative">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="mx-auto max-h-48 object-contain rounded-lg"
                                                />
                                                <div className="mt-2 text-sm text-gray-600">
                                                    Click to change image
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
                                                <span className="mt-2 block text-sm font-medium text-gray-600">
                                                    Upload Image
                                                </span>
                                            </>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </Label>
                            </div>
                            {/* Product Name */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="productName"
                                    className="text-right"
                                >
                                    Product Name
                                </Label>
                                <Input
                                    id="productName"
                                    value={data.productName}
                                    onChange={(e) =>
                                        setData("productName", e.target.value)
                                    }
                                    className="col-span-3"
                                />
                            </div>
                            {/* Price */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    className="col-span-3"
                                    placeholder="Input price"
                                />
                            </div>
                            {/* Category */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="category"
                                    className="text-right"
                                >
                                    Select Category
                                </Label>
                                <Select
                                    value={data.category}
                                    onValueChange={(value) =>
                                        setData("category", value)
                                    }
                                >
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="outline"
                                onClick={handleDialogClose}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">Confirm</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </ToastProvider>
    );
}
