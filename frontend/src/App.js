import React from "react"
import { Container } from "react-bootstrap"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"

import { BrowserRouter as Router, Route } from "react-router-dom"

export const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Route path="/products" component={HomeScreen} exact></Route>
            <Route path="/products/:id" component={ProductScreen}></Route>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  )
}
