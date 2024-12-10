import { useState } from 'react';
import { Box, Paper, Tabs, Tab } from '@mui/material';
import GeneralTraceTab from './GeneralTraceTab';
import SafeTraceTab from './SafeTraceTab';
import { ChainInfo } from '../../types';

function InputSection({ chains }: { chains: ChainInfo[] }) {
  const [tabValue, setTabValue] = useState(0);
  return (
    <Paper elevation={2}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={(_, newValue) => setTabValue(newValue)}
        >
          <Tab label="普通交易" />
          <Tab label="Safe交易" />
        </Tabs>
      </Box>
      
      <Box sx={{ p: 3 }}>
        {tabValue === 0 ? (
          <GeneralTraceTab chains={chains} />
        ) : (
          <SafeTraceTab />
        )}
      </Box>
    </Paper>
  );
}

export default InputSection;