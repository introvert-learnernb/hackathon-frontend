import { Pen, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export function CreateProduct() {
  return (
    <Link
      href="/business/product-setup/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Product</span>{" "}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProduct({ id }: { id: number }) {
  return (
    <Link
      href={`/business/product-setup/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pen className="w-5" />
    </Link>
  );
}

export function DeleteProduct({ id }: { id: number }) {
  // ----------------------------------------------------------------------
  // FIXME - Fetch data from API
  // server action => export async function deleteProduct(id: number){}
  // const deleteProductWithId = deleteProduct.bind(null, id);
  // ----------------------------------------------------------------------
  return (
    <>
      <form>
        {/* <form action={deleteProductWithId}> */}
        <button className="rounded-md border p-2 hover:bg-gray-100">
          <span className="sr-only">Delete</span>
          <Trash2 className="w-4" />
        </button>
      </form>
    </>
  );
}
