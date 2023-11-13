import React from "react";
import { Route } from "react-router-dom";
import AuthGuard from "../guards/AuthGuard";
import Profile from "../../pages/Profile";
import Orders from "../../pages/Orders";
import Wishlist from "../../pages/Wishlist";
import CustomerService from "../../pages/CustomerService";

const AuthRoutes = [
    <Route key="Profile" path="/profile" element={<AuthGuard component={<Profile />} />} />,
    <Route key="Orders" path="/orders" element={<AuthGuard component={<Orders />} />} />,
    <Route key="Wishlist" path="/wishlist" element={<AuthGuard component={<Wishlist />} />} />,
    <Route key="CustomerService" path="/customer-service" element={<AuthGuard component={<CustomerService />} />} />,
]

export default AuthRoutes;