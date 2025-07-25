import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import loginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import AdminOrderScreen from "./screens/AdminOrderScreen";
export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/products" component={HomeScreen} exact></Route>
            <Route path="/products/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/login" component={loginScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/profile" component={ProfileScreen}></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/orders/:id" component={OrderScreen}></Route>
            <Route path="/admin/userlist" component={UserListScreen}></Route>
            <Route
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            ></Route>
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            ></Route>
            <Route
              path="/admin/productlist/:pageNumber"
              component={ProductListScreen}
              exact
            ></Route>
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            ></Route>
            <Route path="/admin/orderlist" component={OrderListScreen}></Route>
            <Route
              path="/admin/orders/:id"
              component={AdminOrderScreen}
              exact
            ></Route>
            <Route path="/search/:keyword" component={HomeScreen} exact></Route>
            <Route
              path="/page/:pageNumber"
              component={HomeScreen}
              exact
            ></Route>
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            ></Route>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
};
