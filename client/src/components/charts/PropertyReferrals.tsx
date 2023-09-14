import {Box, Stack, Typography} from '@mui/material';
import { propertyReferralsInfo } from 'constants/index';

interface PregressBarProps{
  title: string,
  percentage: number,
  color: string,
}

const PregressBar = ({ title, percentage, color} : PregressBarProps) =>(
  <Box width="100%">
    <Stack direction="row" alignItems="center"
      justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
      <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}%</Typography>
    </Stack>
    <Box mt={2} position="relative" maxWidth="100%" height="8px" borderRadius={1} bgcolor="#e4e8ef">
      <Box width={`${percentage}%`} bgcolor={color} position="absolute" height="100%" borderRadius={1}></Box>
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  return (
    <Box 
      padding={4} 
      bgcolor="#fcfcfc"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px">
    
    <Typography 
        fontSize={18}
        fontWeight={600} 
        color="#11142d">
        Références des propriétés
    </Typography>

    <Stack marginY="20px" direction="column" gap={4}>
      {propertyReferralsInfo.map((bar) =>
      <PregressBar key={bar.title} {...bar} />)}
    </Stack>

  </Box>
  );
}

export default PropertyReferrals