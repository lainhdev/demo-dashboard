/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Variant } from "@/utils/types";
import { UploadButton } from "@/utils/uploadthing";
import { Edit, Plus } from "lucide-react";
import { useEffect, useState } from "react";

const ProductVariants = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (p: string) => void;
}) => {
  const [variants, setVariants] = useState<Variant[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [variantName, setVariantName] = useState("");
  const [price, setPrice] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    let variantsProp = JSON.parse(value);
    if (typeof variantsProp === "string")
      variantsProp = JSON.parse(variantsProp);
    setVariants(variantsProp);
  }, [value]);
  return (
    <FormItem className="col-span-2">
      <FormLabel className="block">Phân loại</FormLabel>
      <FormControl>
        <Card className="p-5">
          <div className="flex space-x-5 items-center pb-5 border-b w-max">
            <p className="w-40 text-sm font-semibold">Tên loại</p>
            <p className="w-40 text-sm font-semibold">Giá</p>
            <p className="w-40 text-sm font-semibold">Hình ảnh</p>
            <p className="w-16"></p>
          </div>
          {variants.map((variant, idx) => {
            return (
              <div
                key={idx + variant.variantName}
                className="my-5 w-max border-b pb-5"
              >
                <div className="flex space-x-5 items-center">
                  {isEditing === idx ? (
                    <>
                      <Input
                        value={variantName}
                        onChange={(e) => setVariantName(e.target.value)}
                        placeholder="Tên loại"
                        className="w-40"
                      />
                      <Input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Giá"
                        type="number"
                        className="w-40"
                      />
                      <div className="w-40">
                        {imgSrc ? (
                          <img
                            src={imgSrc}
                            className="border border-gray-200 mb-1"
                          />
                        ) : (
                          ""
                        )}
                        <UploadButton
                          className="border-none"
                          appearance={{
                            button:
                              "bg-transparent border text-black mx-auto border-[#000] px-2 text-xs py-2",
                            allowedContent: "hidden",
                          }}
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log({ res });
                            if (res) setImgSrc(res[0].url);
                          }}
                          onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      </div>
                      <Button
                        type="button"
                        className="text-xs px-2 py-3"
                        onClick={() => {
                          const newVariant = {
                            price,
                            variantName,
                            imgSrc,
                          };
                          const newValue = [...variants];
                          newValue.splice(idx, 1, newVariant);
                          setVariants(newValue);
                          setImgSrc("");
                          setPrice("");
                          setVariantName("");
                          onChange(JSON.stringify(newValue));
                          setIsEditing(null);
                        }}
                      >
                        Hoàn thành
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="w-40 text-sm font-semibold">
                        {variant.variantName}
                      </p>
                      <p className="w-40 text-sm font-semibold">
                        {variant.price} <span className="text-xs">đ</span>
                      </p>
                      <div className="w-40">
                        {variant.imgSrc && (
                          <img alt="variant" src={variant.imgSrc} />
                        )}
                      </div>
                      <Button
                        type="button"
                        className="text-xs px-2 py-3"
                        onClick={() => {
                          setVariantName(variant.variantName);
                          setPrice(variant.price);
                          setImgSrc(variant.imgSrc);
                          setIsEditing(idx);
                        }}
                      >
                        Sửa <Edit width={15} className="ml-2" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
          {typeof isEditing !== "number" ? (
            <Button
              type="button"
              className="px-2 py-2 text-xs ml-2 mt-3"
              onClick={() => {
                setVariants([
                  ...variants,
                  { variantName: "", price: "", imgSrc: "" },
                ]);
                setIsEditing(variants.length);
              }}
            >
              Thêm <Plus width={15} />
            </Button>
          ) : (
            <></>
          )}
        </Card>
      </FormControl>
    </FormItem>
  );
};

export default ProductVariants;
