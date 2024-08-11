import { useEffect, useState } from "react";
import { columns } from "./components/Columns";
import { DataTable } from "./components/DataTable";
// import { dashboard_data } from "./Data";
import { Skeleton } from "./components/ui/skeleton";

interface DataValue {
  companyName: string;
  description: string;
  details: string;
  lastChecked: string;
  performance: number;
  status: string;
  website: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataValue[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_BACKEND_URL);
        const data = (await response.json()) as { data: DataValue[] };
        const updatedDashboardData = data.data.map((prev) => ({
          ...prev,
          companyName: `${prev.companyName},${prev.website}`,
          description: `${prev.description},${prev.details}`,
        }));
        setData(updatedDashboardData);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto w-[90%]">
      {isLoading ? (
        <div className="border my-10 rounded-lg shadow-xl min-h-[90dvh]">
          <Skeleton className="w-[60%] h-[15dvh]" />
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}

export default App;
