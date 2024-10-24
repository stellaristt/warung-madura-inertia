import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import { Trash2, ShoppingCart } from "lucide-react";
import { useForm } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/stores/useCartStore";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
    productId: number;
    onDelete: (id: number) => void;
}

export function ProductCard({
    name,
    price,
    image,
    productId,
    onDelete,
}: ProductCardProps) {
    const { delete: deleteProduct } = useForm();
    const addItem = useCartStore((state) => state.addItem);

    const handleDelete = () => {
        deleteProduct(`/products/${productId}`, {
            onSuccess: () => {
                onDelete(productId);
                toast({
                    title: "Berhasil!",
                    description: "Data produk telah berhasil dihapus!",
                    className: "bg-green-400",
                });
            },
        });
    };

    const handleAddToCart = () => {
        addItem({
            productId,
            name,
            price,
            image,
        });
        toast({
            title: "Berhasil!",
            description: "Produk telah ditambahkan ke keranjang!",
            className: "bg-green-400",
        });
    };

    return (
        <Card className="w-full rounded-2xl shadow">
            <CardHeader className="p-0">
                <img
                    src={`/storage/${image}`}
                    alt={name}
                    width={200}
                    height={200}
                    className="w-full h-40 object-cover rounded-t"
                />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm md:text-base">
                        {name}
                    </h3>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="mt-2"
                            >
                                <Trash2></Trash2>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Konfirmasi Hapus
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus produk "{name}"?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Batalkan</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <p className="text-base md:text-lg font-bold">
                    Rp. {price.toLocaleString()}
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full text-sm md:text-base flex items-center gap-2"
                    onClick={handleAddToCart}
                >
                    <ShoppingCart size={20} />
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
