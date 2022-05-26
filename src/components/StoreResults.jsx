
import { Grid, List, ListItemAvatar, ListItemText, ListItem, Avatar, Card, CardContent, CardActions, Button, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';

import React from "react";
import { withSearch } from "@elastic/react-search-ui";

const StoreResults = ({ results }) => {
    return (
        <div>
            <Grid item style={{maxHeight: "507px", overflow: 'auto'}}>
                <List>
                    {results.map((r) => (
                        <ListItem key={r.id.raw}>
                            <ListItemAvatar>
                                <Avatar>
                                    <StoreIcon fontSize="medium" />
                                </Avatar>
                            </ListItemAvatar>
                            <Card sx={{ width: 325}}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        {r.name.raw}
                                    </Typography>
                                    <Typography variant="body2">
                                       {r.address.raw}<br />
                                       {r.city.raw}, {r.state.raw}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Shop here</Button>
                                </CardActions>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Grid>

        </div>
    );
};

export default withSearch(({ results }) => ({
    results
}))(StoreResults);

