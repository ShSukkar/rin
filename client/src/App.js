import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import MyRouter from './components/Router/Router'

import Landing from "./components/Landing/Landing.component";
import Navbar from "./components/Navbar/Navbar.component";

class App extends Component {
  render() {
    return (
      <MyRouter />
    );
  }
}

export default App;
