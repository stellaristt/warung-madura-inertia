import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { toast } from "@/hooks/use-toast";
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

interface CartDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDialog({ open, onOpenChange }: CartDialogProps) {
    const cartItems = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const getTotalPrice = useCartStore((state) => state.getTotalPrice);
    const processCheckout = useCartStore((state) => state.processCheckout);

    const handleRemoveItem = (productId: number, productName: string) => {
        removeItem(productId);
        toast({
            title: "Berhasil!",
            description: `${productName} telah dihapus dari keranjang!`,
            className: "bg-green-400",
        });
    };

    const handleUpdateQuantity = (
        productId: number,
        currentQuantity: number,
        increment: boolean
    ) => {
        const newQuantity = increment
            ? currentQuantity + 1
            : Math.max(1, currentQuantity - 1);
        updateQuantity(productId, newQuantity);
    };

    const handleClearCart = () => {
        clearCart();
        toast({
            title: "Berhasil!",
            description: "Keranjang telah dikosongkan!",
            className: "bg-green-400",
        });
    };

    const handleCheckout = () => {
        processCheckout();
        onOpenChange(false);

        toast({
            title: "Transaksi Berhasil! 🎉",
            description: (
                <div className="mt-2 space-y-2">
                    <p className="font-medium">Terima kasih telah berbelanja!</p>
                </div>
            ),
            className: "bg-green-400",
            duration: 5000,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex justify-between items-center">
                        <DialogTitle>Keranjang Belanja</DialogTitle>
                        {cartItems.length > 0 && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        className="flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Kosongkan
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Konfirmasi Kosongkan Keranjang
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin mengosongkan
                                            keranjang? Semua produk akan dihapus.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Batalkan
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleClearCart}
                                        >
                                            Kosongkan
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                </DialogHeader>

                {cartItems.length === 0 ? (
                    <div className="py-8 flex flex-col items-center justify-center gap-4">
                        <ShoppingBag size={48} className="text-gray-400" />
                        <h2 className="text-xl font-semibold text-gray-600">
                            Keranjang Kosong
                        </h2>
                        <p className="text-sm text-gray-500">
                            Belum ada produk yang ditambahkan ke keranjang
                        </p>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="max-h-[60vh]">
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="flex items-center gap-4 p-4 border rounded-lg"
                                    >
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-lg font-bold text-primary">
                                                Rp.{" "}
                                                {item.price.toLocaleString()}
                                            </p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.productId,
                                                                item.quantity,
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <Minus size={16} />
                                                    </Button>
                                                    <span className="w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={() =>
                                                            handleUpdateQuantity(
                                                                item.productId,
                                                                item.quantity,
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Plus size={16} />
                                                    </Button>
                                                </div>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="icon"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Konfirmasi Hapus
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah Anda yakin
                                                                ingin menghapus{" "}
                                                                {item.name} dari
                                                                keranjang?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batalkan
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleRemoveItem(
                                                                        item.productId,
                                                                        item.name
                                                                    )
                                                                }
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">
                                                Subtotal
                                            </p>
                                            <p className="text-lg font-bold">
                                                Rp.{" "}
                                                {(
                                                    item.price * item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-2xl font-bold">
                                    Rp. {getTotalPrice().toLocaleString()}
                                </p>
                            </div>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button size="lg">Checkout</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Konfirmasi Checkout
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin melakukan checkout untuk pembelian ini?
                                            Total: Rp. {getTotalPrice().toLocaleString()}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Batalkan
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleCheckout}
                                        >
                                            Ya, Checkout
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
