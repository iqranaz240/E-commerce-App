import React from "react";
import { Route } from "react-router-dom";
import UnAuthGuard from "../guards/UnauthGuard";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import Cards from "../../pages/ProductCatalog";
import Checkout from "../../pages/Checkout";
import CardsDetails from "../../pages/ProductDetail";

const UnAuthRoutes = [
    <Route key="Login" path="/login" element={<UnAuthGuard component={<Login />} />} ></Route>,
    <Route key="Register" path="/register" element={<UnAuthGuard component={<Register />} />} > </Route>,
    <Route key="Home" path='/' element={<UnAuthGuard component={<Cards />} />} ></Route>,
    <Route key="Checkout" path='/checkout' element={<UnAuthGuard component={<Checkout />} />} ></Route>,
    <Route key="Details" path='/cart/:id' element={<UnAuthGuard component={<CardsDetails />} />} ></Route>,
]

export default UnAuthRoutes