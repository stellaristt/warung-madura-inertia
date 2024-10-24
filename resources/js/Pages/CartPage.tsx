import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Cart from "@/Components/CartDialog";

export default function CartPage() {
    return (
        <AuthenticatedLayout>
            <div className="py-12 px-12">
                <Cart></Cart>
            </div>
        </AuthenticatedLayout>
    );
}
