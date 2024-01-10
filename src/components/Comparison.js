import Charts from "../components/Charts.js";
import KeyStatTable from "./KeyStatTable.js";
import PerfomanceTable from "./PerfomanceTable.js";
import AnalystTable from "./AnalystTable.js";
import ProfitabilityTable from "./ProfitabilityTable.js";
import { Box, Paper, Container, Typography } from "@mui/material";

function Comparison({ selectedStocks, indexToCompare }) {
  return (
    // <Box sx={{ p: 4 }}>
    //   <ToggleButtonGroup orientation="vertical">
    //     <ToggleButton value="charts">Charts</ToggleButton>
    //     <ToggleButton value="ks">Key Statistics</ToggleButton>
    //     <ToggleButton value="perfomance">Perfomance</ToggleButton>
    //     <ToggleButton value="profitability">Profitability</ToggleButton>
    //     <ToggleButton value="analysts">Analysts recommendation</ToggleButton>
    //     <ToggleButton value="news">News</ToggleButton>
    //   </ToggleButtonGroup>
    // </Box>
    <Container sx={{ mt: 3, pt: 4, pb: 4 }}>
      <Box sx={{ mb: 7 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Charts
        </Typography>
        <Paper sx={{ pb: 8 }}>
          <Box sx={{ p: 4, height: "400px" }}>
            <Charts stocks={selectedStocks} index={indexToCompare} />
          </Box>
        </Paper>
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Key Statistics
        </Typography>
        <KeyStatTable stocks={selectedStocks} index={indexToCompare} />
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Perfomance
        </Typography>
        <PerfomanceTable stocks={selectedStocks} index={indexToCompare} />
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Profitability
        </Typography>
        <ProfitabilityTable stocks={selectedStocks} index={indexToCompare} />
      </Box>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Analysts recommendation
        </Typography>
        <AnalystTable stocks={selectedStocks} index={indexToCompare} />
      </Box>
    </Container>
  );
}

export default Comparison;
