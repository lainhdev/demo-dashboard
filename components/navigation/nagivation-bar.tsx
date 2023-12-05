"use client";
import { Button } from "../ui/button";
import { Archive, BarChart3, Component, List, Menu, ScrollText } from "lucide-react";
import { useState } from "react";
import MenuLink from "./menu-link";

export const NavigationBar = () => {
  const [isOpenNavBar, setIsOpenNavBar] = useState(false);
  return (
    <>
      <div
        onClick={() => setIsOpenNavBar(false)}
        className={`${
          isOpenNavBar ? "" : "hidden"
        } w-screen h-screen opacity-25 bg-black fixed z-20`}
      ></div>
      <div className="md:hidden px-5 py-3 flex flex-row justify-between w-full items-center border-b">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => setIsOpenNavBar(true)}
        >
          <Menu />
        </Button>
      </div>
      <div
        className={`${
          isOpenNavBar ? "" : "hidden"
        } md:flex h-full w-[200px] z-30 flex-col fixed inset-y-0 pt-3 pb-5 pl-3`}
      >
        <div className="space-y-4 flex flex-col h-full text-primary justify-between w-full bg-white rounded-lg shadow-2xl">
          <div className="w-full">
            <p className="text-2xl font-bold text-center my-10">DASHBOARD</p>
            <p className="border-b mx-2 mb-5"></p>
            <div className="flex flex-col gap-2 font-semibold text-primary">
              <MenuLink url="/products">
                <Component width={15} className="mr-3" />
                Sản phẩm
              </MenuLink>
              <MenuLink url="/categories">
                <List width={15} className="mr-3" />
                Danh mục
              </MenuLink>
              <MenuLink url="/orders">
                <ScrollText width={15} className="mr-3" />
                Đơn hàng
              </MenuLink>
              <MenuLink url="/inventory">
                <Archive width={15} className="mr-3" />
                Kho
              </MenuLink>
              <MenuLink url="/analytics">
                <BarChart3 width={15} className="mr-3" />
                Thống kê
              </MenuLink>
            </div>
          </div>
          <div className="pl-6 border-t mx-2 bottom-2 border-gray-300">
            <Button className="my-3">Đăng xuất</Button>
          </div>
        </div>
      </div>
    </>
  );
};
