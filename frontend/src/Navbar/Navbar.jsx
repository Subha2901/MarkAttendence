import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./Navbar.css";
import Logo from "../Images/Logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import CustomTypeWriter from "../CustomTypepWriter/CustomTypeWriter";
import { UserProfileContext } from "../App";

const Navbar = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [signin, setSignin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const { setProfileVisible, profileVisible } = useContext(UserProfileContext);

  useEffect(() => {
    const path = location.pathname;
    console.log(path);

    if (path == "/login" || path == "/signup") {
      setSignin(false);
    } else {
      setSignin(true);
      setName(sessionStorage.getItem("name"));
    }
  }, [location]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (name) => {
    console.log(name);
    setAnchorEl(null);

    if (name == "logout") {
      sessionStorage.clear();
      localStorage.clear();
      setSignin(false);
      navigate("/login");
    } else if (name == "login") {
      navigate("/login");
    } else if (name == "signup") {
      navigate("/signup");
    } else if (name == "about") {
      const element = document.getElementById('about');
      if(element){
        element.scrollIntoView({behavior: "smooth"})
      }
    } else if (name == "userdetails") {
      setProfileVisible(!profileVisible);
      const element = document.getElementById('about');
      if(element){
        element.scrollIntoView({behavior: "smooth"})
      }
    }
  };

  return (
    <div className="container navbar-div">
      <nav className="navbar">
        <div className="navbar-brand">
          <div className="container ">
            <img src={Logo} alt="Website Logo" />
            <CustomTypeWriter userName={name} signIn={signin} />
          </div>
        </div>
        <div className="navbar-nav">
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {name && name.substring(0, 1)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {signin && (
                <MenuItem
                  name="userdetails"
                  onClick={() => handleClose("userdetails")}
                >
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="medium" />
                  </ListItemIcon>
                  My Account
                </MenuItem>
            )}
            {signin && <Divider />}
            {!signin && (
              <MenuItem name="login" onClick={() => handleClose("login")}>
                <ListItemIcon>
                  <LoginIcon fontSize="small" />
                </ListItemIcon>
                Login
              </MenuItem>
            )}
            {!signin && (
              <MenuItem name="signup" onClick={() => handleClose("signup")}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                New User? SignIn
              </MenuItem>
            )}
            {!signin && <Divider />}
              <MenuItem name="about" onClick={() => handleClose("about")}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                About US
              </MenuItem>
            {signin && (
              <MenuItem name="logout" onClick={() => handleClose("logout")}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            )}
          </Menu>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
