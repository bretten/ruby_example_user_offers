import {Outlet} from "react-router-dom";
import PropTypes from "prop-types";
import Navigation from "../Navigation/Navigation";
import {Container, Grid} from "@mui/material";

function Layout({token}) {
  return (
    <div>
      <Navigation token={token} />
      <Container maxWidth="sm">

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{minHeight: '100vh'}}
        >

          <Grid item xs={3}>
            <Outlet />
          </Grid>

        </Grid>

      </Container>
    </div>
  )
}

Layout.propTypes = {
  token: PropTypes.string
};

export default Layout;