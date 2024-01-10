import { useState } from "react";
import Comparison from "./components/Comparison";
import EmptyScreen from "./components/EmptyScreen";
import {
  Box,
  Paper,
  Container,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

function App() {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [indexToCompare, setIndexToCompare] = useState(null);

  const handleStockInput = (e, newValue) => {
    if (newValue.length <= 5) {
      setSelectedStocks(newValue);
    }
  };

  const handleIndexChange = (e, newValue) => {
    setIndexToCompare(newValue);
  };

  return (
    <div className="App" style={{ backgroundColor: "#D0E4FF" }}>
      <Box sx={{ bgcolor: "#0F67FE" }}>
        <Container sx={{ py: 12 }}>
          <Paper sx={{ p: 4 }}>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                blurOnSelect
                multiple
                autoFocus
                fullWidth
                getOptionLabel={(option) => option.label}
                value={selectedStocks}
                onChange={handleStockInput}
                options={stocks}
                renderInput={(params) => (
                  <TextField {...params} label="Add stocks (up to 5 items)" />
                )}
              ></Autocomplete>
              <Autocomplete
                fullWidth
                sx={{ maxWidth: "260px" }}
                autoFocus
                getOptionLabel={(option) => option.label}
                options={indices}
                value={indexToCompare}
                onChange={handleIndexChange}
                renderInput={(params) => (
                  <TextField {...params} label="Index to compare" />
                )}
              ></Autocomplete>
            </Stack>
          </Paper>
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

export default App;

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
