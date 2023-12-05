import TitleBar from "@/components/layout/title-bar";
import { Card } from "@/components/ui/card";

const AnalyticsPage = async () => {
  return (
    <div className="h-screen flex flex-col">
      <TitleBar>
        <div className="flex flex-row justify-between items-center">
          <h1 className="font-bold text-2xl text-primary">Thống kê</h1>
        </div>
      </TitleBar>
      <Card className="my-5 shadow-xl p-5 flex-grow">
        {/* <DataTable columns={columns} data={data} /> */}
      </Card>
    </div>
  );
};

export default AnalyticsPage;
