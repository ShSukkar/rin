import React, { Component } from "react";
import "./Data.css";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import { Doughnut, Polar, Radar } from 'react-chartjs-2';
import BarChart from "./Charts/BarChart/BarChart.component";
import LineChart from "./Charts/LineChart/LineChart.component";
import PieChart from "./Charts/PieChart/PieChart.component";
import HorizontalBarChart from "./Charts/HorizontalBarChart/HorizontalBarChart.component";
import CircularProgress from '@material-ui/core/CircularProgress';

/*The structure of any chart data object is as the following:
  somethingData: {
        // labels: [],
        // datasets: [{
        //   label: "",
        //   data: [],
        //   backgroundColor: ''
        // }]
      }
*/

export default class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RINDealsData: {},
      asylumSeekersData: {},
      resettlementData: {},
      demographicsData: {},
      asylumSeekersSelectedYear: 2012,
      demographicsSelectedYear: 2012,
      demographicsSelectedCountry: "Syrian Arab Republic",
      isLoadingAsylumSeekersData: true,
      isLoadingDmographicsData: true,
      allCountries: []
    }
  }

  componentWillMount() {
    this.getRINDealsData();
    this.getAsylumSeekersDataByYear();
    this.getResettlementData();
    this.getDemographicsData();
    this.getAllCounries();
  }

  componentDidMount() { }

  getAllCounries = () => {
    axios.get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        this.setState({ allCountries: res.data })
      })
      .catch(err => {
        console.log(err);

      })
  }

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

  getRINDealsData = () => {
    let labels = ["Housing", "Education", "Agriculture", "Health", "Water", "Nutrition", "Infancy"];
    let datasets = [{}];
    datasets[0].label = "Conducted Deals";
    datasets[0].backgroundColor = [
      'rgba(232, 51, 56, 0.6)',
      'rgba(255, 144, 104, 0.6)',
      'rgba(255, 183, 94, 0.6)',
      'rgba(141, 194, 111, 0.6)',
      'rgba(100, 179, 244, 0.6)',
      'rgba(100, 65, 165, 0.6)',
      'rgba(252, 103, 250, 0.6)'
    ];
    datasets[0].data = [];
    labels.map(type => {
      axios.get(`/api/projectscount/${type}`)
        .then(res => {
          datasets[0].data.push(res.data[0]["count(*)"]);
        })
        .catch(err => {
          console.log(err);
        });
    });

    this.setState({ RINDealsData: { labels: labels, datasets: datasets } });
  }

  getAsylumSeekersDataByYear = (e) => {
    const year = e && e.target.value > -1 ? e.target.value : this.state.asylumSeekersSelectedYear;
    this.setState({ asylumSeekersSelectedYear: year, isLoadingAsylumSeekersData: true });

    axios.get(`http://popdata.unhcr.org/api/stats/asylum_seekers.json?year=${year}&&country_of_origin=SYR`)
      .then(res => {
        this.setState({ isLoadingAsylumSeekersData: false }, () => {
          let labelsOfAsylumCountries = [];
          let dataOfAppliedCount = [];
          let dataOfAccepteddCount = [];
          for (let i = 0; i < 50; i++) {
            if ((!labelsOfAsylumCountries.includes(res.data[i].country_of_asylum_en)) && (res.data[i].applied_during_year > 4)) {
              labelsOfAsylumCountries.push(res.data[i].country_of_asylum_en);
              dataOfAppliedCount.push(res.data[i].applied_during_year);
              dataOfAccepteddCount.push(res.data[i].applied_during_year - res.data[i].rejected);
            }
          }

          let datasets = [{}, {}];
          datasets[0].data = dataOfAppliedCount;
          datasets[0].label = "Asylum Applications";
          datasets[0].backgroundColor = "green";
          datasets[1].data = dataOfAccepteddCount;
          datasets[1].label = "Accepted Applications";
          datasets[1].backgroundColor = "blue";
          this.setState({ asylumSeekersData: { labels: labelsOfAsylumCountries, datasets: datasets } });
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  getResettlementData = () => {
    const labels = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018];
    const countriesOfAsylum = ["AUS", "CAN", "DEU", "GBR", "USA"];
    const colors = ["rgb(232, 51, 56)", "rgb(141, 194, 111)", "rgb(100, 179, 244)", "rgb(100, 65, 165)", "rgb(255, 144, 104)"];
    let datasets = [];
    for (let i = 0; i < countriesOfAsylum.length; i++) {
      datasets.push({});
      datasets[i].label = countriesOfAsylum[i];
      datasets[i].backgroundColor = colors[i];
      datasets[i].borderColor = colors[i];
      datasets[i].fill = false;
      datasets[i].data = [];

      for (let j = 0; j < labels.length; j++) {
        axios.get(`http://popdata.unhcr.org/api/stats/resettlement.json?year=${labels[j]}&country_of_asylum=${countriesOfAsylum[i]}`)
          .then(res => {
            let totalValue = 0;
            for (let r = 0; r < res.data.length; r++) {
              if (typeof res.data[r].value === "number") {
                totalValue += res.data[r].value;
              }
            }
            datasets[i].data.push(totalValue);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
    this.setState({ resettlementData: { labels: labels, datasets: datasets } });
  }

  getDemographicsData = (e) => {
    const year = e && e.target.value > -1 ? e.target.value : this.state.demographicsSelectedYear;
    this.setState({ demographicsSelectedYear: year, isLoadingDmographicsData: true });

    let labels = [];
    let femaleValueData = [];
    let maleValueData = [];
    axios.get(`http://popdata.unhcr.org/api/stats/demographics.json?year=${year}&country_of_residence=SYR`)
      .then(res => {
        this.setState({ isLoadingDmographicsData: false }, () => {
          res.data.forEach(oneData => {
            labels.push(oneData.location_name);
            femaleValueData.push(oneData.female_total_value);
            maleValueData.push(oneData.male_total_value);
          });
          let datasets = [{}, {}];
          datasets[0].data = femaleValueData;
          datasets[0].label = "Female Total Value";
          datasets[0].backgroundColor = "pink";
          datasets[1].data = maleValueData;
          datasets[1].label = "Male Total Value";
          datasets[1].backgroundColor = "#ADD8E6";

          this.setState({ demographicsData: { labels: labels, datasets: datasets } });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let { allCountries, isLoadingAsylumSeekersData, isLoadingDmographicsData, demographicsSelectedYear, demographicsSelectedCountry } = this.state;

    const years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    let allYears = years.map((year, i) => {
      return (
        <option value={year} key={i}>
          {year}
        </option>
      );
    });

    let countries = allCountries.map((country, i) => {
      return (
        <option value={country.name} key={i}>
          {country.name}
        </option>
      )
    })

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
          <div className="rin-deals-chart">
            <h3 className="chart-heading" style={{ marginTop: 0 }}>The RIN Deals</h3>
            <PieChart data={this.state.RINDealsData} />
          </div>
          <div className="asylum-seekers-chart">
            <h3 className="chart-heading">UNHCR Statistics of Asylum Seekers from Syria in {this.state.asylumSeekersSelectedYear}</h3>
            <select onChange={this.getAsylumSeekersDataByYear}>
              <option value={-1}>Select Year</option>
              {allYears}
            </select>
            <div className="chart-preloader">
              <CircularProgress className="preloader" size={"7vw"} thickness={3} style={{ visibility: isLoadingAsylumSeekersData ? "visible" : "hidden" }} />
              <BarChart data={this.state.asylumSeekersData} />
            </div>
          </div>
          <div className="resettlement-chart">
            <h3 className="chart-heading">UNHCR Statistics of Resettlement (2010 - 2018)</h3>
            <LineChart data={this.state.resettlementData} getResettlementData={this.getResettlementData} />
          </div>
          <div className="demographics-chart">
            <h3 className="chart-heading">UNHCR Statistics of Demographics in {demographicsSelectedCountry} ({demographicsSelectedYear})</h3>
            <select onChange={this.getDemographicsData}>
              <option value={-1}>Select Year</option>
              {allYears}
            </select>
            <select>
              <option value={-1}>Select country</option>
              {countries}
            </select>
            <div className="chart-preloader">
              <CircularProgress className="preloader" size={"7vw"} thickness={3} style={{ visibility: isLoadingDmographicsData ? "visible" : "hidden" }} />
              <HorizontalBarChart data={this.state.demographicsData} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
