import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function CategoryCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        // to make the card resizable
        overflow: 'auto',
        // resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
 
      </Box>
      <CardContent>
        <Typography level="title-lg">NYC Coders</Typography>
        <Typography level="body-sm">
          We are a community of developers prepping for coding interviews,
          participate, chat with others and get better at interviewing.
        </Typography>
      </CardContent>
      <CardActions buttonFlex="0 1 120px">
        <IconButton  color="neutral" sx={{ mr: 'auto' }}>
          {/* <FavoriteBorder /> */}
        </IconButton>
        <Button variant="outlined" color="neutral">
          View
        </Button>
      </CardActions>
    </Card>
  );
}