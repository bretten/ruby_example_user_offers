import React from 'react';
import PropTypes from "prop-types";
import {Avatar, Divider, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {LocalOffer} from "@mui/icons-material";

function Offer({id, description}) {
  return (
    <React.Fragment>
      <Divider variant="inset" component="li" />
      <ListItem key={id}>
        <ListItemAvatar>
          <Avatar>
            <LocalOffer />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"Offer " + id} secondary={description} />
      </ListItem>
    </React.Fragment>
  )
}

Offer.propTypes = {
  id: PropTypes.string,
  description: PropTypes.string
};

export default Offer;