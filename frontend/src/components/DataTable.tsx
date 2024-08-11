import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";
import TableInput from "./TableInput";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface SearchedItemsValue {
  value: string;
  select: string;
}

export const SelectItemArray = [
  {
    label: "Company Name",
    value: "companyName",
  },
  {
    label: "Description",
    value: "description",
  },
  {
    label: "Last Checked",
    value: "lastChecked",
  },
  {
    label: "Performance",
    value: "performance",
  },
  {
    label: "Status",
    value: "status",
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectFilter, setSelectFilter] = useState("companyName");
  const [searchedItems, setSearchedItems] = useState<SearchedItemsValue[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const onSearchButtonClick = useCallback(
    (input: string) => {
      SelectItemArray.forEach(({ value }) => {
        table.getColumn(value)?.setFilterValue("");
      });
      table.getColumn(selectFilter)?.setFilterValue(input);
      setSearchedItems((prev) => {
        const isExist = prev.find(({ value }) => value === input)?.value;
        if (searchedItems.length) {
          if (isExist) {
            let modifiedArray = [...searchedItems].filter(
              ({ value }) => value !== input
            );
            modifiedArray.push({
              value: input,
              select: selectFilter,
            });
            return modifiedArray;
          } else {
            return [...prev, { value: input, select: selectFilter }];
          }
        } else {
          return [...prev, { value: input, select: selectFilter }];
        }
      });
    },
    [selectFilter, searchedItems]
  );

  return (
    <div className="border my-10 rounded-lg shadow-xl">
      <TableInput
        selectFilter={selectFilter}
        onSearchButtonClick={onSearchButtonClick}
        setSelectFilter={setSelectFilter}
        table={table}
        searchedItems={searchedItems}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, i) => (
                    <TableCell key={cell.id} className="text-center">
                      <div
                        className={cn(
                          "rounded-lg",
                          cell.getValue() === "Failed" &&
                            "font-bold border text-red-500 border-red-200 bg-red-100 text-center p-1",
                          cell.getValue() === "Paid" &&
                            "font-bold border text-green-500 border-green-200 bg-green-100 text-center p-1",
                          cell.getValue() === "Pending" &&
                            "font-bold border text-yellow-500 border-yellow-200 bg-yellow-100 text-center p-1"
                        )}
                      >
                        {i === 1 || i === 2 ? (
                          <>
                            <h1 className="font-semibold">
                              {String(cell.getValue()).split(",")[0]}
                            </h1>
                            <p>{String(cell.getValue()).split(",")[1]}</p>
                          </>
                        ) : (
                          <>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                            {i === 4 && (
                              <Progress
                                value={Number(cell.getValue())}
                                className="w-[70%] h-2 my-2 mx-auto [&>*]:bg-purple-500"
                              />
                            )}
                          </>
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
