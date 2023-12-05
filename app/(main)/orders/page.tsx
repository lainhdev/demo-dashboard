import TitleBar from "@/components/layout/title-bar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

const OrdersPage = async () => {
  return (
    <div className="h-screen flex flex-col">
      <TitleBar>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-primary">Đơn hàng</h1>
          <Link href="/orders/new">
            <Button>
              Thêm <Plus className="ml-1" width={18} />
            </Button>
          </Link>
        </div>
      </TitleBar>
      <Card className="my-5 shadow-xl p-5 flex-grow">
        {/* <DataTable columns={columns} data={data} /> */}
      </Card>
    </div>
  );
};

export default OrdersPage;
