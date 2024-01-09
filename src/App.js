import { useState } from "react";
import Comparison from "./components/Comparison";
import EmptyScreen from "./components/EmptyScreen";
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
  const [indexToCompare, setIndexToCompare] = useState(null);

  const handleStockInput = (e, newValue) => {
    setSelectedStocks(newValue);
  };

  const handleIndexChange = (e, newValue) => {
    setIndexToCompare(newValue);
  };

  return (
    <div className="App" style={{ backgroundColor: "#F2F9FF" }}>
      <Box sx={{ bgcolor: "#D9ECFF" }}>
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
              value={indexToCompare}
              onChange={handleIndexChange}
              renderInput={(params) => (
                <TextField {...params} label="Index to compare" />
              )}
            ></Autocomplete>
          </Stack>
        </Container>
      </Box>

      {selectedStocks.length || indexToCompare ? (
        <Comparison
          selectedStocks={selectedStocks}
          indexToCompare={indexToCompare}
        />
      ) : (
        <EmptyScreen style={{ backgroundColor: "#F2F9FF" }} />
      )}
    </div>
  );
}

const stocks = [
  { label: "META", id: 1 },
  { label: "NVDA", id: 2 },
  { label: "MSFT", id: 3 },
  { label: "AAPL", id: 4 },
  { label: "GOOGL", id: 5 },
  { label: "AMZN", id: 6 },
  { label: "TSLA", id: 7 },
  { label: "BABA", id: 8 },
  { label: "PYPL", id: 9 },
  { label: "AMD", id: 10 },
  { label: "INTC", id: 11 },
  { label: "CSCO", id: 12 },
  { label: "ADBE", id: 13 },
  { label: "ORCL", id: 14 },
  { label: "QCOM", id: 15 },
  { label: "NVAX", id: 16 },
  { label: "JNJ", id: 17 },
  { label: "PFE", id: 18 },
  { label: "MRNA", id: 19 },
  { label: "BAC", id: 20 },
  { label: "AAP", id: 21 },
  { label: "GOEV", id: 22 },
  { label: "RBLX", id: 23 },
  { label: "DOCU", id: 24 },
  { label: "UBER", id: 25 },
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
