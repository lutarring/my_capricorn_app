import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from './Title';
import moment from "moment";


function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits() {
  const today = moment().format("ll"); 
  return (
    <React.Fragment>
      <Title>出社勤務者数</Title>
      <Typography component="p" variant="h4">
        27人
      </Typography>
      <Title>在宅勤務者数</Title>
      <Typography component="p" variant="h4">
        82人
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {today}
      </Typography>
    </React.Fragment>
  );
}
