import Charts from "../components/Charts.js";
import Table from "../components/Table.js";
import KeyStatTable from "./KeyStatTable.js";
import PerfomanceTable from "./PerfomanceTable.js";
import AnalystTable from "./AnalystTable.js";
import ProfitabilityTable from "./ProfitabilityTable.js";
import { useState } from "react";
import {
  Box,
  OutlinedInput,
  Paper,
  Grid,
  Container,
  Stack,
  Autocomplete,
  TextField,
  ButtonGroup,
  Button,
  Typography,
} from "@mui/material";

function Comparison({ selectedStocks, indexToCompare }) {
  console.log(selectedStocks);

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Charts
        </Typography>
        <Box sx={{ height: "320px" }}>
          <Charts stocks={selectedStocks} index={indexToCompare} />
        </Box>
      </Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Key Statistics
        </Typography>
        <KeyStatTable stocks={selectedStocks} index={indexToCompare} />
      </Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Perfomance
        </Typography>
        <PerfomanceTable stocks={selectedStocks} index={indexToCompare} />
      </Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Profitability
        </Typography>
        <ProfitabilityTable stocks={selectedStocks} index={indexToCompare} />
      </Box>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
          Analysts recommendation
        </Typography>
        <AnalystTable stocks={selectedStocks} index={indexToCompare} />
      </Box>
    </Container>
  );
}

export default Comparison;
