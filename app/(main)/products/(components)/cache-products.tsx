"use client";

import { Product } from "@/utils/types";
import { useEffect } from "react";

const CacheProducts = ({ products }: { products: Product[] }) => {
  useEffect(() => {
    // @ts-ignore
    localStorage.setItem("products", JSON.stringify(products));
  }, []);
  return <></>;
};

export default CacheProducts;
