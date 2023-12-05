export type Product = {
  id: string;
  name: string;
  variants: string;
  images: string;
  price: number;
  description: string;
  created_at: string;
};

export type Variant = { variantName: string; imgSrc: string; price: string };

export type Category = {
  id: string;
  name: string;
  connection_code: string;
  created_at: string;
  products: Product[];
};
