import React, {FC} from 'react';
import {Box, Card, CardContent, CardHeader, Typography} from "@mui/material";

interface DescriptionCard {
  username: string,
  datetime: string,
  text: string,
  title?: string
}

const DescriptionCard: FC<DescriptionCard> = ({username, datetime, text, title}) => {
  return (
    <Card style={{width: '70%', margin: 'auto', backgroundColor: '#212121'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardHeader
          title={(title ? title + ' || ' : '') + `${datetime} by ${username}`}
          sx={{color: '#eeeeee'}}
        />
        <CardContent>
          <Typography sx={{color: '#eeeeee'}} variant={'subtitle2'}>{text}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default DescriptionCard;