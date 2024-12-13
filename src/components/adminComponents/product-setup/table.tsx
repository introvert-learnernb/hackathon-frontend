import Image from "next/image";
import { UpdateProduct } from "@/components/adminComponents/product-setup/buttons";
import { formatCurrency } from "@/lib/utils";
import ProductStatus from "@/components/adminComponents/product-setup/status";
import { Product } from "@/types/definitions";

export default function ProductsTable({ data }: { data: Product[] }) {
  const headers = [
    { key: "featuredImage", label: "Product" },
    { key: "category", label: "Category" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "offerPrice", label: "Offer Price" },
    { key: "stockQuantity", label: "Quantity" },
    { key: "isActive", label: "Is Active" },
    { key: "actions", label: "Actions" },
  ];

  const defaultImage = "https://randomuser.me/api/portraits/men/1.jpg";

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile View */}
          <div className="md:hidden">
            {data?.map((product: Product) => {
              console.log({ image: product?.featuredImage });
              return (
                <div
                  key={product.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={
                            product.featuredImage &&
                            product.featuredImage !== ""
                              ? product.featuredImage
                              : defaultImage
                          }
                          className="mr-2 h-7 w-7 rounded-full aspect-square"
                          width={28}
                          height={28}
                          alt={`${product.name || "Default"}'s profile picture`}
                        />
                        <p className="whitespace-nowrap px-3 py-3">
                          <span className="bg-primary text-white inline-flex items-center rounded-full px-3 py-2 text-xs">
                            {product.category}
                          </span>
                        </p>
                        <p>{product.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {product.stockQuantity}
                      </p>
                    </div>
                    <ProductStatus status={product.isActive} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                        {formatCurrency(parseFloat(product.price))}
                      </p>
                      <p className="text-xl font-medium">
                        {formatCurrency(parseFloat(product.offerPrice))}
                      </p>
                      <p>{product.stockQuantity}</p>
                      {/* <p>{formatDateToLocal(product.date)}</p> */}
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateProduct id={product.id} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {headers.map((header) => (
                  <th
                    key={header.key}
                    scope="col"
                    className={`px-3 py-5 font-medium ${
                      header.key === "actions" ? "text-right" : ""
                    }`}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {data?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          product.featuredImage && product.featuredImage !== ""
                            ? product.featuredImage
                            : defaultImage
                        }
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${product.name || "Default"}'s profile picture`}
                      />
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <span className="bg-primary text-white inline-flex items-center rounded-full px-3 py-2 text-xs">
                      {product.category}
                    </span>
                  </td>
                  <td className="whitespace-wrap px-3 py-3 max-w-40">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(parseFloat(product.price))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(parseFloat(product.offerPrice))}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {product.stockQuantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <ProductStatus status={product.isActive} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProduct id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
