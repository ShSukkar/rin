import React, { Component } from 'react';
import "./LineChart.css";
import { Line } from 'react-chartjs-2';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets: [{
                    label: '',
                    data: [],
                    backgroundColor: 'green',
                    //backgroundColor: []
                }]
            }
        }
    }

    componentWillMount() { }

    componentDidMount() { }

    getChartData = () => { }

    render() {
        return (
            <div className="lineChart">
                <Line
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
                />
            </div>
        )
    }
}
