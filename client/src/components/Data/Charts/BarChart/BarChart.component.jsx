import React, { Component } from 'react';
import "./BarChart.css";
import { Bar } from 'react-chartjs-2';
import axios from "axios";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: this.props.datasestLabel,
                    data: [],
                    backgroundColor: 'green',
                    //backgroundColor: []
                }]
            }
        }
    }

    componentWillMount() {
        this.getChartData();
    }

    componentDidMount() { }

    getChartData = () => {
        axios.get("http://popdata.unhcr.org/api/stats/asylum_seekers.json?year=2012&&country_of_origin=SYR")
            .then(res => {
                let labelsOfAsylumountries = [];
                let dataOfAppliedCount = [];
                for (let i = 0; i < 20; i++) {
                    if (!labelsOfAsylumountries.includes(res.data[i].country_of_asylum_en)) {
                        labelsOfAsylumountries.push(res.data[i].country_of_asylum_en);
                        dataOfAppliedCount.push(res.data[i].applied_during_year);
                    }
                }

                let datasets = this.state.chartData.datasets;
                datasets[0].data = dataOfAppliedCount;
                this.setState({ chartData: { ...this.state.chartData, labels: labelsOfAsylumountries, datasets: datasets } }, () => { console.log(this.state.chartData) })
            })
            .catch(err => {
                console.log(err);

            })
    }

    render() {
        return (
            <div className="barChart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'right',
                            labels: {
                                fontColor: '#000'
                            }
                        }
                    }}
                    height={200}
                />
            </div>
        )
    }
}
