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
  console.log(selectedStocks);

  const handleIndexChange = (e, newValue) => {
    setIndexToCompare(newValue);
  };

  return (
    <div className="App">
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
        <EmptyScreen />
      )}
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
