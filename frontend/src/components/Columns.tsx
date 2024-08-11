import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

export type ResponseData = {
  companyName: string;
  description: string;
  details: string;
  lastChecked: string;
  performance: number;
  status: string;
  website: string;
};

export const columns: ColumnDef<ResponseData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className={cn(
          "data-[state=checked]:bg-purple-500 rounded-md border-zinc-400 size-5"
        )}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className={cn(
          "data-[state=checked]:bg-purple-500 rounded-md border-zinc-400 size-5"
        )}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  // {
  //   accessorKey: "details",
  //   header: "Details",
  // },
  {
    accessorKey: "lastChecked",
    header: "Last Checked",
    filterFn: (row, columnId, filterValue: string) => {
      let value = new Date(row.getValue(columnId)).toDateString();
      const searchedValue = new Date(filterValue).toDateString();
      if (value === searchedValue) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    accessorKey: "performance",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Performance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue: string) => {
      let value = row.getValue(columnId);
      if (Number(value) === Number(filterValue)) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  // {
  //   accessorKey: "website",
  //   header: "Website",
  // },
];
