import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGlobalContext } from "../context";
const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "cardName", headerName: "Card Name", width: 200 },
  {
    field: "ethPrice",
    headerName: "ETH Price",
    type: "string",
    valueGetter: ({ value }) => value && parseFloat(value),
    width: 150,
  },
  {
    field: "godsPrice",
    headerName: "GODS Price",
    type: "string",
    valueGetter: ({ value }) => value && parseFloat(value),
    width: 150,
  },
  {
    field: "difference",
    headerName: "Difference",
    type: "string",
    valueGetter: ({ value }) => value && parseFloat(value).toPrecision(3),
    width: 150,
  },
];

export default function DataTable() {
  const { cardPrices } = useGlobalContext();
  return (
    <div className="w-full h-96">
      <DataGrid
        rows={cardPrices}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
        sx={{
          boxShadow: 2,
          color: "black",
        }}
      />
    </div>
  );
}
