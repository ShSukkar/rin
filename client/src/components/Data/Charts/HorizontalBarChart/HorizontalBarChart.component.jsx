import React, { Component } from 'react';
import "./HorizontalBarChart.css";
import { HorizontalBar } from 'react-chartjs-2';

export default class HorizontalBarChart extends Component {
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
            <div className="horizontalBarChart">
                <HorizontalBar
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
