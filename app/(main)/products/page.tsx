import TitleBar from "@/components/layout/title-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { columns } from "./(components)/columns";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Product } from "@/utils/types";
import CacheProducts from "./(components)/cache-products";

async function getData(): Promise<Product[]> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("products").select();
  return data ? data : [];
}
const ProductsPage = async () => {
  const data = await getData();
  return (
    <div className="h-screen flex flex-col">
      <CacheProducts products={data} />
      <TitleBar>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-primary">Sản phẩm</h1>
          <Link href="/products/new">
            <Button>
              Thêm <Plus className="ml-1" width={18} />
            </Button>
          </Link>
        </div>
      </TitleBar>
      <Card className="my-5 shadow-xl p-5 flex-grow">
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  );
};

export default ProductsPage;
