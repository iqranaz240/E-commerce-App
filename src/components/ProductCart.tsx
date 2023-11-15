import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Counter from './common/Counter';
import { DeleteProduct } from './common/DeleteProduct';

const ProductCart = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={2}>
      <Paper elevation={3} style={{ padding: 16 }}>
        <TableContainer>
          <Table>
            <TableBody>
              {props.data.map((e: any) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box flex="0 0 30%">
                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} alt="" style={{ width: '100%', height: 'auto' }} />
                        </NavLink>
                      </Box>
                      <Box flex="0 0 30%" ml={2}>
                        <Typography variant="h6">{e.rname}</Typography>
                        <Typography variant="body1">Price: {e.price}</Typography>
                        <Typography variant="body1">Quantity: {e.qnty}</Typography>
                      </Box>
                      <Box ml="auto" display="flex" flexDirection="row" alignItems="center">
                        {props.counter && <Counter cart={e} />}
                        {props.deleteButton && <DeleteProduct id={e.id} />}
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ProductCart;
