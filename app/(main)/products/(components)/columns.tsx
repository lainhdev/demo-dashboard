/* eslint-disable @next/next/no-img-element */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { Product } from "@/utils/types";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <Link href={`/products/${row.original.id}`}>{row.original.id}</Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên sản phẩm",
    cell: ({ row }) => {
      return (
        <p className="max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("name")}
        </p>
      );
    },
  },
  {
    header: "Hình ảnh",
    cell: ({ row }) => {
      const variants = JSON.parse(row.original.variants);
      return (
        <>
          {variants[0] ? (
            <img src={variants[0].imgSrc} alt="product" width={150} />
          ) : (
            <></>
          )}
        </>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const deleteProduct = async () => {
        const toastId = toast.loading("Deleting Product");
        try {
          const supabase = createClient();
          const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", row.original.id);
          toast.success("Deleted product", {
            id: toastId,
          });
          router.refresh();
        } catch (error) {
          toast.error("Failed to deleted product", {
            id: toastId,
          });
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only"></span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuLabel>Actions</DropdownMenuLabel> */}
            <DropdownMenuItem onClick={() => deleteProduct()}>
              Xóa
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.replace(`/products/${product.id}`)}
            >
              View chi tiết sản phẩm
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
