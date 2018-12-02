import React, { Component } from 'react';
import "./HorizontalBarChart.css";
import { HorizontalBar } from 'react-chartjs-2';

export default class HorizontalBarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() { }

    componentDidMount() { }

    getChartData = () => { }

    render() {
        return (
            <div className="horizontalBarChart">
                <HorizontalBar
                    data={this.props.data}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            // position: 'left',
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
