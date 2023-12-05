"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category } from "@/utils/types";
import { createClient } from "@/utils/supabase/client";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return (
        <Link href={`/categories/${row.original.id}`}>{row.original.id}</Link>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Tên danh mục",
    cell: ({ row }) => {
      return (
        <p className="max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
          {row.getValue("name")}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const router = useRouter();
      const deleteCategory = async () => {
        const toastId = toast.loading("Deleting Category");
        try {
          const supabase = createClient();
          await supabase.from("categories").delete().eq("id", row.original.id);
          toast.success("Deleted category", {
            id: toastId,
          });
          router.refresh();
        } catch (error) {
          toast.error("Failed to deleted category", {
            id: toastId,
          });
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteCategory()}>
              Delete
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.replace(`/categories/${category.id}`)}
            >
              View category details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
