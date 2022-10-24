import {Link} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Container} from "@mui/material";

function Navigation({token}) {
  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6" color="inherit" sx={{flexGrow: 1, textDecoration: "none"}} component={Link} to="/">
              User Offers
            </Typography>
            {
              token !== null ? (
                <React.Fragment>
                  <Button color="inherit" component={Link} to="/logout">Logout</Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Button color="inherit" component={Link} to="/login">Login</Button>
                  <Button color="inherit" component={Link} to="/register">Register</Button>
                </React.Fragment>
              )
            }
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

Navigation.propTypes = {
  token: PropTypes.string
};

export default Navigation;
