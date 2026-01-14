import { UserForm } from "@/components/admin/UserForm";
import { getAdmin } from "@/app/actions/admin";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const user = await getAdmin(id);

    if (!user) {
        notFound();
    }

    // Adapt user data to form values (password is optional/empty on edit load)
    const initialData = {
        ...user,
        name: user.name || "", // ensure string
        password: ""
    };

    return <UserForm initialData={initialData} isEdit />;
}
