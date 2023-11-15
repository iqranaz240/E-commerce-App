import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Badge from '@mui/material/Badge';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Backdrop from '@mui/material/Backdrop';
import Tooltip from '@mui/material/Tooltip';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { RootState } from '../../store/reducers/main';
import { removeCartItem } from '../../store/reducers/cartSlice';
import Cart from '../Cart';
import { logoutUser } from '../../store/reducers/userSlice';
import { auth, signout } from '../../services/firebaseAuth';

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state: RootState) => state.cartReducer.carts);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const setting = ['Profile', 'Orders', 'Wishlist', 'Customer Support'];
  const url = ['/profile', '/orders', '/wishlist', '/customer-service'];

  const [anchorElCart, setAnchorElCart] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const userId = auth?.currentUser?.uid; // Use auth?.currentUser?.uid

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    userId === undefined ? navigate('/login') : setAnchorElUser(event.currentTarget);
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

  const handleLogout = async () => {
    await signout(); // Use auth.signout()
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
      <Box sx={{ flexGrow: 1, position: 'fixed', width: '100%', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AppBar sx={{ backgroundColor: '#2196f3' }}>
          <Toolbar>
            <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
              <img src="/logo.png" alt="logo" height={50} />
              <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Typography variant="h6" noWrap component="div" sx={{ marginLeft: 2, color: 'white' }}>
                  ECOMMERCE
                </Typography>
              </NavLink>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton color="inherit" onClick={handleClick} sx={{ marginRight: 2 }}>
                <Badge badgeContent={getdata.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <IconButton color="inherit" sx={{ marginRight: 2 }}>
                <Badge badgeContent={5} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Tooltip title="Open settings">
                <IconButton color="inherit" onClick={handleOpenUserMenu} sx={{ marginRight: 2 }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Menu
        id="cart-menu"
        anchorEl={anchorElCart}
        open={Boolean(anchorElCart)}
        MenuListProps={{
          'aria-labelledby': 'cart-button',
        }}
      >
        <Cart handleClose={handleClose} />
      </Menu>

      { userId !== undefined && <Menu
        id="user-menu"
        anchorEl={anchorElUser}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
      >
        {url.map((link, index) => (
          <NavLink to={link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting[index]}</Typography>
            </MenuItem>
          </NavLink>
        ))}
        <NavLink to={'/'} onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </NavLink>
      </Menu>}

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(anchorElCart)}
        onClick={handleClose}
      />
    </>
  );
};

export default Header;
