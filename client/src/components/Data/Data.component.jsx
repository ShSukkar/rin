import React, { Component } from "react";
import "./Data.css";
import IconButton from "@material-ui/core/IconButton";
import { Doughnut, Polar, Radar } from 'react-chartjs-2';
import BarChart from "./Charts/BarChart/BarChart.component";
import LineChart from "./Charts/LineChart/LineChart.component";
import PieChart from "./Charts/PieChart/PieChart.component";
import HorizontalBarChart from "./Charts/HorizontalBarChart/HorizontalBarChart.component";

export default class Data extends Component {
  constructor() {
    super();
    this.state = {}
  }

  componentWillMount() { }

  componentDidMount() { }


  scrollToTop = () => {
    document.querySelector(".library").scrollIntoView({
      behavior: "smooth"
    });
  };

  goDown = () => {
    document.querySelector(".container").scrollIntoView({
      behavior: "smooth"
    });
  };

  render() {
    return (
      <div
        className="data fadeInFast"
        style={{
          overflowY: "scroll"
        }}
      >
        <header>
          <div className="banner-full">
            <h1>data</h1>
            <div className="line" />
            <h3>statistics proof that refugees are a great investment</h3>
            <div className="go-down" onClick={this.goDown}>
              <IconButton>
                <i className="fas fa-arrow-down color-2" />
              </IconButton>
            </div>
          </div>
        </header>
        <div className="container">
          <h3>Statistics of Asylum Seekers from Syria in 2012</h3>
          <BarChart datasestLabel={"Asylum Applications"} />
        </div>
      </div>
    );
  }
}
