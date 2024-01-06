import AreaChartGraph from "./components/AreaChartGraph";
import StockChart from "./components/StockChart";
import Charts from "./components/Charts.js";
import Table from "./components/Table.js";
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

function App() {
  const [selectedStocks, setSelectedStocks] = useState([]);

  const handleStockInput = (e, newValue) => {
    setSelectedStocks(newValue);
    console.log(selectedStocks);
  };

  return (
    <div className="App">
      <Box sx={{ bgcolor: "#F4EBFF" }}>
        <Container sx={{ py: 12 }}>
          <Stack direction="row" spacing={2}>
            <Autocomplete
              multiple
              autoFocus
              fullWidth
              getOptionLabel={(option) => option.label}
              value={selectedStocks}
              onChange={handleStockInput}
              options={stocks}
              renderInput={(params) => (
                <TextField {...params} label="Add stocks" />
              )}
            ></Autocomplete>
            <Autocomplete
              autoFocus
              fullWidth
              getOptionLabel={(option) => option.label}
              options={indices}
              onChange={(e, newValue) => {
                console.log(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Index to compare" />
              )}
            ></Autocomplete>
            <Button variant="outlined">Chart</Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ mt: 3 }}>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Charts
          </Typography>
          <Box sx={{ height: "320px" }}>
            <Charts stocks={selectedStocks} />
          </Box>
        </Box>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Key Statistics
          </Typography>
          <Table />
        </Box>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Perfomance
          </Typography>
          <Table />
        </Box>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Profitability
          </Typography>
          <Table />
        </Box>
        <Box sx={{ mb: 7 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
            Analysts recommendation
          </Typography>
          <Table />
        </Box>
      </Container>
    </div>
  );
}

const stocks = [
  { label: "META", id: 1, pricechange: {} },
  { label: "NVDA", id: 2 },
  { label: "MSFT", id: 3 },
];
const indices = [
  { label: "S&P 500 Index" },
  { label: "S&P 100 Index" },
  { label: "CBOE Volatility Index" },
  { label: "DOW Industrials" },
  { label: "Nasdaq 100 Index" },
  { label: "Nasdaq Composite" },
  { label: "NYSE Composite" },
  { label: "AMEX Composite" },
];

export default App;
