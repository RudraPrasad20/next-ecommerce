"use client";

import { Button } from "@/components/ui/button";
import React from "react";

import { columns } from "./_components/columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/hooks/api";
import { Product } from "@/types";

import { Loader2 } from "lucide-react";
import { DataTable } from "./_components/data-table";
import ProductSheet from "./_components/product-sheet";
import { useNewProduct } from "@/hooks/products/product-atom";

const ProductsPage = () => {
  const { onOpen } = useNewProduct();

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (isError) {
    console.error("Error loading products:", error.message);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Products</h3>
        <Button size={"sm"} onClick={onOpen}>
          Add Product
        </Button>
        <ProductSheet />
      </div>

      {isError && <span className="text-red-500">Something went wrong.</span>}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
};

export default ProductsPage;
