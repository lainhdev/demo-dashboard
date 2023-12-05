import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuLink = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url: string;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={url}
      className={`${
        pathname.includes(url) ? "bg-gradient-to-l from-gray-200" : ""
      } flex flex-row ml-6`}
    >
      {children}
    </Link>
  );
};

export default MenuLink;
