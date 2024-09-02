import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import * as React from 'react';

export default function BasicRating({value}) {
  // const [value, setValue] = React.useState(2);

  return (
    <Box
    sx={{
        '& > legend': { mt: 2 },
        '& .MuiRating-iconFilled': {
          color: '#faaf00', // Change this to the desired color
        },
      }}
    >
      <Rating
        name="simple-controlled"
        defaultValue={value}
        className="mt-1"
        readOnly
      />
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" defaultValue={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" defaultValue={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" defaultValue={null} /> */}
    </Box>
  );
}