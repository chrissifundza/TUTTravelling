import React from "react";
import { Autocomplete } from "@react-google-maps/api";
import {
	AppBar,
	Toolbar,
	Typography,
	InputBase,
	MenuItem,
	Box,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "react-bootstrap";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

const Header = ({ onPlaceChanged, onLoad }) => {
	const classes = useStyles();
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const { currentUser, logout } = useAuth();
	const settings = [<Link style={{color:"#454545", textDecoration:"none"}} to="/profile">User: {currentUser.name}</Link>, <Link style={{color:"#454545", textDecoration:"none"}} to="/distance">Directions</Link>, <Link style={{color:"#454545", textDecoration:"none"}} onClick={logout}>Logout</Link>];
	
	
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	  };
	  const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	  };
	
	return (
		<AppBar  position="static">
			<Toolbar   className={classes.toolbar}>
				<Typography variant="h5" className={classes.title}>
					
					<Link style={{color:"#ffffff", textDecoration:"none",marginRight:"20px"}} to="/dashboard">Discover Tour Guide</Link>
				</Typography>{" "}
				
				<Box display="flex" sx={{display:"flex", flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
				<Typography variant="h6" className={classes.title}>
					<Link style={{color:"#ffffff", textDecoration:"none",marginRight:"20px"}} to="/distance">DIRECTIONS</Link>
				</Typography>
				<Typography variant="h6" className={classes.title}>
					<Link style={{color:"#ffffff", textDecoration:"none",marginRight:"20px"}} to="/vistedplaces">VISITED PLACES</Link>
				</Typography>
					<Typography variant="h6" className={classes.title}>
						EXPLORE NEW PLACES
					</Typography>

					<Autocomplete
						onLoad={onLoad}
						onPlaceChanged={onPlaceChanged}
					>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase
								placeholder="Search…"
								classes={{
									root: classes.inputRoot,
									input: classes.inputInput,
								}}
							/>{" "}
						</div>
					</Autocomplete>
					<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={currentUser.name} src={currentUser.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
				</Box>

			
			</Toolbar>
		</AppBar>
	);
};

export default Header;
