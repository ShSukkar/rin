import React, { Component } from "react";
import "./Data.css";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { Doughnut, Polar, Radar } from 'react-chartjs-2';
import BarChart from "./Charts/BarChart/BarChart.component";
import LineChart from "./Charts/LineChart/LineChart.component";
import PieChart from "./Charts/PieChart/PieChart.component";
import HorizontalBarChart from "./Charts/HorizontalBarChart/HorizontalBarChart.component";

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asylumSeekersData: {
        labels: [],
        datasets: [{
          label: "",
          data: [],
          backgroundColor: ''
        }]
      }
    }
  }

  componentWillMount() {
    this.getAsylumSeekersData();
  }

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

  getAsylumSeekersData = () => {
    axios.get("http://popdata.unhcr.org/api/stats/asylum_seekers.json?year=2012&&country_of_origin=SYR")
      .then(res => {
        let labelsOfAsylumCountries = [];
        let dataOfAppliedCount = [];
        for (let i = 0; i < 50; i++) {
          if (!labelsOfAsylumCountries.includes(res.data[i].country_of_asylum_en) && res.data[i].applied_during_year > 100) {
            labelsOfAsylumCountries.push(res.data[i].country_of_asylum_en);
            dataOfAppliedCount.push(res.data[i].applied_during_year);
          }
        }

        let datasets = this.state.asylumSeekersData.datasets;
        datasets[0].data = dataOfAppliedCount;
        datasets[0].label = "Asylum Applications";
        datasets[0].backgroundColor = "green";
        this.setState({ asylumSeekersData: { ...this.state.asylumSeekersData, labels: labelsOfAsylumCountries, datasets: datasets } });
      })
      .catch(err => {
        console.log(err);
      });
  }

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
          <BarChart data={this.state.asylumSeekersData} />
          <h3>The RIN Deals</h3>
          <PieChart datasestLabel={"Conducted Deals"} />
        </div>
      </div>
    );
  }
}
