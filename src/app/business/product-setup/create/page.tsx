import CreateForm from "@/components/adminComponents/product-setup/create-form";
import Breadcrumbs from "@/components/adminComponents/product-setup/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Product",
};

export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/business/product-setup" },
          {
            label: "Create Product",
            href: "/business/product-setup/create",
            active: true,
          },
        ]}
      />
      <CreateForm />
    </main>
  );
}
