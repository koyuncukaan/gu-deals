import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box className="flex justify-center mt-20" sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  );
}

export default Loading;
