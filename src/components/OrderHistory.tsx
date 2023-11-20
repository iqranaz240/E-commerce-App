import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

interface Product {
  imgdata: string;
  rname: string;
  price: number;
  qnty: number;
}

const OrderHistory = ({ orders }: { orders: Record<string, { orderDate: string; order: Product[] }> }) => {  
  return (
    <Box maxWidth="md" mx="auto" mt={2}>
      <Paper elevation={3} style={{ padding: 16 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order Date</TableCell>
                <TableCell>Products</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(orders).map(([orderId, order]) => (
                <TableRow key={orderId}>
                  <TableCell width='30%'>{new Date(order.orderDate).toLocaleString()}</TableCell>
                  <TableCell>
                    <Table>
                      <TableBody>
                        {order.order.map((product, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box display="flex" alignItems="center">
                                <Box flex="0 0 30%">
                                  <img src={product.imgdata} alt="" style={{ width: '100%', height: 'auto' }} />
                                </Box>
                                <Box flex="0 0 30%" ml={2}>
                                  <Typography variant="h6">{product.rname}</Typography>
                                  <Typography variant="body1">Price: {product.price}</Typography>
                                  <Typography variant="body1">Quantity: {product.qnty}</Typography>
                                </Box>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

export default OrderHistory;
