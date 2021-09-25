import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import { BrowserRouter as Router, Route } from "react-router-dom"
import loginScreen from "./screens/LoginScreen"
export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/products" component={HomeScreen} exact></Route>
            <Route path="/products/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/login" component={loginScreen}></Route>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}
