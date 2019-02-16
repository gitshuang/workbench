import React, {Component} from 'react';
import Img from './download.svg';
import {wrap, titleContainer, title, echartContainer, svg} from './index.css';

import request from 'yutils/request';

import {getContentType, getUrlWithParams, getDataProObj} from 'yutils/request';

let echart = require('./echarts.common.min');

class CostAnalysis extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [0, 0, 0, 0, 0, 0],
			period: [1, 2, 3, 4, 5, 6]
		}
	}

	componentDidMount() {
		const {widgetId} = this.props;
		this.echartLine = echart.init(document.getElementById('echart_line_' + widgetId));
		this.renderEchart();
		this.getData()
	}

	getData = () => {
		const {params, xDataProp, yDataProp, method, contentType} = this.props;
		let {dataUrl} = this.props;

		const options = {
			method: method || 'GET',
			headers: {
				'content-type': getContentType(contentType)
			},
		};

		if (params && method && method.toString().toLocaleUpperCase() === 'POST' && getContentType(contentType) === 'application/json') {
			options.body = JSON.stringify(eval('(' + params + ')'));
		} else {
			dataUrl = getUrlWithParams(dataUrl, params);
		}

		request(`${dataUrl}`, options, (getStatus) => {
			let xData = [], yData = [];
			if (xDataProp) {
				xData = getDataProObj(xDataProp, getStatus);
				yData = getDataProObj(yDataProp, getStatus);
			} else {
				let datas = getDataProObj(yDataProp, getStatus);
				for (let key in datas) {
					xData.push(key)
					yData.push(datas[key]);
				}
			}
			this.setState({data: yData, period: xData}, () => {
				this.renderEchart()
			});
		});

	}

	reLoad = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.getData()
	}
	renderEchart = () => {
		const {formatterSuffix, chartType} = this.props;
		this.echartLine.setOption({
			title: {
				show: false,
			},
			toolbox: {
				show: false,
			},
			tooltip: {
				show: false,
			},
			grid: {
				left: '32px',
				right: '32px',
				bottom: '32px',
				top: '3px',
				containLabel: true
			},
			color: ['#4A5A69',],
			axisPointer: {triggerTooltip: false, triggerOn: 'none'},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisTick: {show: false},
				axisLabel: {
					formatter: function (value, index) {
						return value + formatterSuffix
					}
				},
				axisLine: {lineStyle: {color: '#888888'},},
				data: this.getxAxisData(),
			},
			yAxis: {
				show: true,
				type: 'value',
				axisTick: {show: false},
				axisLabel: {
					show: false
				},
				axisPointer: {triggerTooltip: false},
				axisLine: {
					show: false
				},
			},
			series: [
				{
					type: chartType || 'line',
					smooth: false,
					barWidth: 30,
					areaStyle: {
						normal: {
							// 右下左上
							color: new echart.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: 'rgba(74,90,105,1)'
							}, {
								offset: 1,
								color: 'rgba(207,241,255,0)'
							}])
						}
					},
					data: this.state.data,
				}
			]
		});
	}
	getxAxisData = () => {
		return this.state.period.map((value, index) => {
			let obj = {
				textStyle: {
					fontSize: 12,
					color: '#888888',
				}
			}
			obj['value'] = value;
			if (index === 0) {
				obj.textStyle['align'] = 'left';
			} else if (index + 1 === this.state.period.length) {
				obj.textStyle['align'] = 'right';
			}
			return obj;
		})
	}

	render() {
		const {widgetId} = this.props;
		return (
			<div className={wrap}>
				<div id={'echart_line_' + widgetId} className={echartContainer}>
				</div>
				<div>
					<a>
						<img className={svg} src={Img} onClick={this.reLoad}/>
					</a>
				</div>
			</div>
		);
	}
}

export default CostAnalysis;
