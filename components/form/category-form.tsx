/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { columns } from "./category-form-product-column";
import Select from "react-select";
import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Category, Product } from "@/utils/types";
import TitleBar from "../layout/title-bar";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid";

const formSchema = z.object({
  name: z.string(),
  connection_code: z.string(),
  products: z.array(z.any()),
});
const CategoryForm = ({
  category,
  isEditing,
}: {
  category: Category | null;
  isEditing: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category ? category.name : "",
      connection_code: category ? category.connection_code : "",
      products: category && category.products?.length ? category.products : [],
    },
  });

  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [allCacheProducts, setAllCacheProducts] = useState<Product[]>([]);
  const [optionSelected, setOptionSelected] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "" });

  useEffect(() => {
    console.log({ category });
    // @ts-ignore
    const allProducts = JSON.parse(
      localStorage.getItem("products") as string
    ) as Product[];

    if (allProducts) {
      const options = allProducts
        .map((product) => ({
          value: product.id,
          label: product.name,
        }))
        .filter(
          (option) =>
            !category?.products?.map((el) => el.id).includes(option.value)
        );
      setOptions(options);
      setAllCacheProducts(allProducts);
    }
  }, []);

  const filterOptions = () => {
    const newOptions = [...options].filter(
      (option) =>
        !form
          .getValues("products")
          .map((el) => el.id)
          .includes(option.value)
    );
    setOptions(newOptions);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(
      isEditing ? "Đang chỉnh sửa danh mục" : "Đang thêm mới danh mục"
    );
    try {
      const payload = {
        ...values,
        id: uuidv4(),
      };
      const supabase = createClient();
      if (isEditing) {
        const { data } = await supabase
          .from("categories")
          .update({ ...payload })
          .eq("id", category?.id)
          .select();
        console.log({ data });
      } else {
        // @ts-ignore
        delete payload.products;
        const { data } = await supabase
          .from("categories")
          .insert([payload])
          .select();
        console.log({ data });
      }

      toast.success(
        isEditing
          ? "chỉnh sửa danh mục thành công"
          : "thêm mới danh mục thành công",
        {
          id: toastId,
        }
      );
      if (!isEditing) form.reset();
    } catch (error) {
      toast.error(
        `Có lỗi trong khi${isEditing ? "chỉnh sửa" : "thêm mới"} danh mục`,
        {
          id: toastId,
        }
      );
      console.log(error);
    }
  }

  async function onAddProduct(id: string) {
    const toastId = toast.loading(`Đang thêm mới sản phẩm vào danh mục`);
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from("products_on_categories")
        .insert({ product_id: id, category_id: category?.id })
        .select();
      console.log({ data });

      toast.success(`thêm mới sản phẩm vào danh mục thành công`, {
        id: toastId,
      });
      return true;
    } catch (error) {
      toast.error(`Có lỗi trong khi thêm mới sản phẩm vào danh mục`, {
        id: toastId,
      });
      console.log(error);
      return false;
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <TitleBar>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <Link href="/categories" className="mr-3 p-1 rounded-lg">
              <ArrowLeft className="" width={24} />
            </Link>
            <h1 className="font-bold text-2xl text-primary">
              {isEditing ? `Danh mục: ${category?.name}` : "Danh mục mới"}
            </h1>
          </div>
        </div>
      </TitleBar>
      <Card className="p-5 my-5 flex-grow">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connection_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>mã liên kết</FormLabel>
                  <FormControl>
                    <Input placeholder="mã liên kết" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
            {category && (
              <FormField
                control={form.control}
                name="products"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block">Products</FormLabel>
                    <FormControl>
                      <>
                        <div className="flex space-x-2 w-full items-center">
                          <Select
                            options={options}
                            className="flex-grow"
                            onChange={(selected: any) =>
                              selected
                                ? setOptionSelected(selected)
                                : setOptionSelected({ value: "", label: "" })
                            }
                            value={optionSelected}
                          />
                          <Button
                            type="button"
                            onClick={async () => {
                              const productSelected = allCacheProducts.find(
                                (p) => p.id === optionSelected.value
                              );
                              if (productSelected) {
                                const res = await onAddProduct(
                                  productSelected.id
                                );
                                if (res) {
                                  const newValue =
                                    field.value.concat(productSelected);
                                  field.onChange(newValue);
                                  setOptionSelected({ value: "", label: "" });
                                  filterOptions();
                                }
                              }
                            }}
                          >
                            Add
                          </Button>
                        </div>
                        {field.value && (
                          <DataTable columns={columns} data={field.value} />
                        )}
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CategoryForm;
