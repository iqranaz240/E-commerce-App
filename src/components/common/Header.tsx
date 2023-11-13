import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';

import { RootState } from '../../store/reducers/main'
import { removeCartItem } from '../../store/reducers/cartSlice';
import Cart from '../Cart';
import { NavLink } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state: RootState) => state.cartReducer.carts);
  const getUser = useSelector((state: RootState) => state.userReducer.user);
  const dispatch = useDispatch();

  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorElCart);

  const settings = ['Profile', 'Orders', 'Wishlist', 'Customer Suppot', 'Login'];
  const url = ['/profile', '/orders', '/wishlist', '/customer-service', '/login'];

  const setting = useMemo(() => settings, [settings]);
console.log(getUser)
  useEffect(() => {
    if (getUser.login) {
      setting.splice(3, 1, 'Logout');
      url.splice(3, 1, '/')
    }
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElCart(null);
  };

  const dlt = (id: number) => {
    dispatch(removeCartItem(id));
  };

  const total = () => {
    let totalPrice = 0;
    getdata.forEach((ele) => {
      totalPrice += ele.price * ele.qnty;
    });
    setPrice(totalPrice);
  };

  useEffect(() => {
    total();
  }, [getdata]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <img src='/logo.png' alt='logo' height={50} />
            <NavLink to='/'>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
                style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}
              >
                ECOMMERCE
              </Typography>
            </NavLink>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge
                  badgeContent={getdata.length}
                  color="error"
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleOpenUserMenu}
                    color="inherit"
                  >
                    <AccountCircle />
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
                  
                    <NavLink to={url[0]} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting[0]}</Typography>
                    </MenuItem>
                    </NavLink>
                    <NavLink to={url[1]} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting[1]}</Typography>
                    </MenuItem>
                    </NavLink>
                    <NavLink to={url[2]} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting[2]}</Typography>
                    </MenuItem>
                    </NavLink>
                    <NavLink to={url[3]} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting[3]}</Typography>
                    </MenuItem>
                    </NavLink>
                    <NavLink to={url[4]} >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting[4]}</Typography>
                    </MenuItem>
                    </NavLink>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorElCart}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Cart />
      </Menu>
    </>
  );
};

export default Header;
