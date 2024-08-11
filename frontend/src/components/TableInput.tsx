import { Dispatch, memo, SetStateAction, useCallback, useState } from "react";
import { SelectItemArray } from "./DataTable";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  selectFilter: string;
  onSearchButtonClick: (input: string) => void;
  setSelectFilter: Dispatch<SetStateAction<string>>;
  table: any;
  searchedItems: {
    value: string;
    select: string;
  }[];
}

function TableInput({
  selectFilter,
  onSearchButtonClick,
  setSelectFilter,
  table,
  searchedItems,
}: Props) {
  const [searchInput, setSearchInput] = useState("");
  const onClickResetButton = useCallback(() => {
    setSearchInput("");
    SelectItemArray.forEach(({ value }) => {
      table.getColumn(value)?.setFilterValue("");
    });
    setSelectFilter("companyName");
  }, []);

  return (
    <div className="m-4">
      <div className="w-full mb-4">
        <h1 className="text-lg font-bold text-zinc-700">
          Vendor Activity History{" "}
          <span className="text-purple-600 bg-purple-50 font-semibold rounded-md px-2 py-1 text-base">
            {table.getRowModel().rows.length} total
          </span>
        </h1>
        <p className="text-zinc-700">
          Here your can track your vendor's performance everyday
        </p>
      </div>
      <div className="flex items-center justify-between w-full">
        <div className="flex gap-x-4">
          <div className="flex items-center border rounded-lg">
            <Input
              placeholder={`Filter ${
                SelectItemArray.find(({ value }) => value === selectFilter)
                  ?.label
              }...`}
              type={
                selectFilter === "performance"
                  ? "number"
                  : selectFilter === "lastChecked"
                  ? "date"
                  : "text"
              }
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="max-w-sm border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
            />
            <Button
              variant="outline"
              className="border-none group"
              onClick={() => onSearchButtonClick(searchInput)}
            >
              <Search className="size-6 text-zinc-500 group-hover:text-black" />
            </Button>
          </div>
          <Select
            defaultValue={selectFilter}
            value={selectFilter}
            onValueChange={(e) => setSelectFilter(e)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter on" />
            </SelectTrigger>
            <SelectContent>
              {SelectItemArray.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(Boolean(searchInput) || selectFilter !== "companyName") && (
          <Button onClick={onClickResetButton}>Reset</Button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-8 mt-4">
        {searchedItems.map(({ value, select }, i) => (
          <div
            key={i}
            className="border px-2 py-1 rounded-lg cursor-pointer hover:bg-slate-50 flex gap-x-2 items-center justify-between text-lg"
            onClick={() => {
              setSearchInput(value);
              setSelectFilter(select);
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(TableInput);
