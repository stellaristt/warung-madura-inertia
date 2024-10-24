import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useState } from "react";
import { router } from '@inertiajs/react'
import { toast } from "@/hooks/use-toast";
import { ToastProvider } from "./ui/toast";

export interface AddCategoryProps {
    width?: string;
}

export function AddCategory({ width }: AddCategoryProps) {
    const [categoryName, setCategoryName] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route("categories.store"), { categoryName: categoryName }, {
            onSuccess: () => {
                setCategoryName("");
                setIsOpen(false);
                toast({
                    title: "Berhasil!",
                    description: "Data kategori telah berhasil ditambahkan",
                    className: "bg-green-400",
                  });
            },
            onError: (errors) => {
                if (errors.categoryName) {
                    toast({
                        title: "Gagal!",
                        description: errors.categoryName,
                        className: "bg-red-400",
                      });
                }
            },
        });
    };

    return (
        <ToastProvider>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    className={`${width} border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white`}
                    variant="outline"
                >
                    + Add Category
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category_name" className="text-right">
                            Category Name
                        </Label>
                        <Input
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <DialogFooter>
                        <div className="flex justify-end gap-4">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button type="submit">Confirm</Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
        </ToastProvider>
    );
}
