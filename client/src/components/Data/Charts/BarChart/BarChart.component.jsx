import React, { Component } from 'react';
import "./BarChart.css";
import { Bar } from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() { }

    componentDidMount() { }

    render() {
        return (
            <div className="barChart">
                <Bar
                    data={this.props.data}
                    options={{
                        title: {
                            display: true,
                            text: '',
                            fontSize: 25
                        },
                        legend: {
                            display: false,
                            position: 'right',
                            labels: {
                                fontColor: '#000'
                            }
                        }
                    }
                    }
                    height={200}
                />
            </div>
        )
    }
}
