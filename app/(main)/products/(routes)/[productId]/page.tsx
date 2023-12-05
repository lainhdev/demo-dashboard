import ProductForm from "@/components/form/product-form";
import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/types";
import { cookies } from "next/headers";

async function getData(id: string): Promise<Product | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("products").select().eq("id", id);
  return data?.length ? data[0] : null;
}
const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await getData(params.productId);
  if (!product) return <h1>Product Not Found</h1>;
  return (
    <div>
      <ProductForm product={product} isEditing={true} />
    </div>
  );
};

export default ProductPage;
