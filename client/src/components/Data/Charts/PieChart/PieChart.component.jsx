import React, { Component } from 'react';
import "./PieChart.css";
import { Pie } from 'react-chartjs-2';

export default class PieChart extends Component {
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

    componentWillMount() { }

    componentDidMount() { }

    getChartData = () => { }

    render() {
        return (
            <div className="pieChart">
                <Pie
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