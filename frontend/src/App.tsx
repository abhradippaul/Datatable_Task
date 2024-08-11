import { useEffect, useState } from "react";
import { columns } from "./components/Columns";
import { DataTable } from "./components/DataTable";
import { dashboard_data } from "./Data";

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
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="max-w-7xl mx-auto w-[90%]">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default App;
