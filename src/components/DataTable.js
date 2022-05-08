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
];

export default function DataTable() {
  const { cardPrices } = useGlobalContext();
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={cardPrices}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[20]}
      />
    </div>
  );
}
