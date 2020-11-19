  
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { pink } from "@material-ui/core/colors";
import { AppBar, Toolbar, Typography, Button, Fab } from "@material-ui/core";
import { Facebook, Twitter, Home, GitHub, Instagram } from "@material-ui/icons";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import YouTubeIcon from '@material-ui/icons/YouTube';

import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true };
  }

  toggleDrawerNavigator = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div>
        <AppBar position="fixed" className={this.props.classes.appBar}>
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              margin
              className={this.props.classes.title}
            ></Typography>
              
            <div className={this.props.classes.home}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button
                  size="Medium"
                  variant="contained"
                  color="default"
                  startIcon={<Home />}
                  style={{
                      
                  }}
                >
                  Home
                </Button>
              </Link>
            </div>

            <div className={this.props.classes.home}>
              
                <Button
                  size="Medium"
                  variant="contained"
                  color="default"
                  startIcon={<YouTubeIcon />}
                  style={{ margin:"0" }}
                  target="_blank"
                  href="https://media.oregonstate.edu/edit/1_j9w4f8kc"
                >
                  Demo
                </Button>
        
            </div>

            <div className={this.props.classes.home}>
              <Link to="/stake" style={{ textDecoration: "none" }}>
                <Button
                  size="Medium"
                  variant="contained"
                  color="default"
                  startIcon={<AccountBalanceIcon />}
                  style={{ margin:"0" }}
                >
                  Stake
                </Button>
              </Link>
            </div>
        
            <div >
              <Link to="/stake" style={{ textDecoration: "none" }}>
                <Button
                  size="Medium"
                  variant="contained"
                  color="default"
                  startIcon={<AccountBalanceWalletIcon/>}
                  style={{ margin:"0" }}
                >
            Account:
            <small className="text-secondary">
              <small id="account">{this.props.account}
            </small>
            </small>
                </Button>
              </Link>
            </div>
    
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = (theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1000,
    backgroundColor: "#333333",
  },

  title: {
    color: "White",
    marginRight: theme.spacing(1),
    width: "100%",
    poistion: "absolute",
    alignItems: "center",
  },

  home: {
    width: "0%",
    marginRight: "%",
    position: "absoulte",
    marginRight: theme.spacing(14),
    
  },
  About: {
    "&:hover": {
      color: "#FFF",
    },
  },

  drawer: {
    width: 240,
  },

  drawerPaper: {
    width: 240,
    background: { pink },
  },
  toolbar: theme.mixins.toolbar,
});

export default withStyles(styles, { withTheme: true })(Navbar);