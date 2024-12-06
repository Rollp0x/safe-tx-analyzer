import { Box, Paper} from '@mui/material';
import SafeTraceTab from './SafeTraceTab';

function InputSection() {
 
  return (
    <Paper elevation={2}> 
      <Box sx={{ p: 3 }}>
        <SafeTraceTab />
      </Box>
    </Paper>
  );
}

export default InputSection;