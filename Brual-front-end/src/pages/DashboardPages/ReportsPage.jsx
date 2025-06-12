import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

export default function ReportsPage() {
  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Sales by Quarter */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Quarterly Sales Performance
        </Typography>
        <BarChart
          height={300}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'] }]}
          series={[
            { data: [12000, 15000, 18000, 20000], label: 'Product A' },
            { data: [10000, 14000, 16000, 19000], label: 'Product B' },
          ]}
        />
      </Paper>

      {/* Monthly Revenue Trend */}
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Revenue Trend
        </Typography>
        <LineChart
          height={300}
          xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }]}
          series={[
            { data: [5000, 7000, 9000, 11000, 13000, 15000], label: '2025 Revenue' },
            { data: [4500, 6800, 8500, 10500, 12000, 13500], label: '2024 Revenue' },
          ]}
        />
      </Paper>
    </Box>
  );
}
