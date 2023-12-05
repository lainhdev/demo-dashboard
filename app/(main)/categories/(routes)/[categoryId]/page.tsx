import CategoryForm from "@/components/form/category-form";

import { createClient } from "@/utils/supabase/server";
import { Category } from "@/utils/types";
import { cookies } from "next/headers";

async function getData(id: string): Promise<Category | null> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("categories").select(`*, products(*)`).eq("id", id);
  return data?.length ? data[0] : null;
}
const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const category = await getData(params.categoryId);
  if (!category) return <h1>Category Not Found</h1>;
  return (
    <div>
      <CategoryForm category={category} isEditing={true} />
    </div>
  );
};

export default CategoryPage;
