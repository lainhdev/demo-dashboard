/* eslint-disable @next/next/no-img-element */
"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import toast from "react-hot-toast";
import Editor, { EditorContentType } from "../editor/editor";
import ProductVariants from "./fields/product-variants";
import { Card } from "../ui/card";
import TitleBar from "../layout/title-bar";
import { Product } from "@/utils/types";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  name: z.string(),
  variants: z.string(),
  images: z.array(z.string()),
  price: z.number(),
  description: z.string(),
});
const ProductForm = ({
  product,
  isEditing,
}: {
  product: Product | null;
  isEditing: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product ? product.name : "",
      variants: product ? product.variants : "[]",
      images: product ? JSON.parse(product.images) : [],
      price: product ? product.price : 1,
      description: product ? product.description : "",
    },
  });

  const [jsonState, setJsonState] = useState<EditorContentType>(
    product ? JSON.parse(product.description) : undefined
  );

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(
      isEditing ? "Đang chỉnh sửa sản phẩm" : "Đang thêm sản phẩm"
    );
    try {
      const payload = {
        ...values,
        images: JSON.stringify(values.images),
        description: JSON.stringify(jsonState),
      };
      const supabase = createClient();
      if (isEditing) {
        const { data } = await supabase
          .from("products")
          .update({ ...payload })
          .eq("id", product?.id)
          .select();
        console.log({ data });
      } else {
        const { data } = await supabase
          .from("products")
          .insert([payload])
          .select();
        console.log({ data });
      }

      toast.success(
        isEditing
          ? "chỉnh sửa sản phẩm thành công"
          : "Thêm sản phẩm thành công",
        {
          id: toastId,
        }
      );
      if (!isEditing) form.reset();
    } catch (error) {
      toast.error(
        `Gặp lỗi trong khi ${isEditing ? "chỉnh sửa" : "thêm mới"} sản phẩm`,
        {
          id: toastId,
        }
      );
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col h-screen">
      <TitleBar>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <Link href="/products" className="mr-3 p-1 rounded-lg">
              <ArrowLeft className="" width={24} />
            </Link>
            <h1 className="font-bold text-2xl text-primary max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis">
              {isEditing ? `Sản phẩm: ${product?.name}` : "Sản phẩm mới"}{" "}
            </h1>
          </div>
        </div>
      </TitleBar>
      <Card className="p-5 my-5 rounded-lg shadow-xl overflow-auto flex-grow">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-10"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sảm phẩm</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên sản phẩm" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="variants"
              render={({ field }) => (
                <ProductVariants
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="col-span-2">
                  <FormLabel className="block">Mô tả sản phẩm</FormLabel>
                  <FormControl>
                    <>
                      <Editor
                        jsonState={jsonState}
                        setJsonState={setJsonState}
                      />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default ProductForm;
