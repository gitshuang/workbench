import React, {Component} from 'react';
import Img from './download.svg';
import request from 'yutils/request';

import {getContentType, getUrlWithParams, getDataProObj} from 'yutils/request';

import {
	wrap,
	titleContainer,
	title,
	conLeft,
	iconL,
	textL,
	textL_below,
	text_icon_up,
	text_icon_down,
	svg
} from './index.css';
import {iconR} from "../default_6/index.css";

class FinanceAnalysis extends Component {
	constructor() {
		super();
		this.state = {
			basicData: 0,
			percentData: 0
		};
		this.reLoad = this.reLoad.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {

		const {params, dataProp, dataPropPercent, method, contentType} = this.props;

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
			let basicData = 0;
			try {
				basicData = getDataProObj(dataProp, getStatus);
			} catch (e) {
				console.log('属性计算错误：' + 'getStatus.' + dataProp);
			}
			let percentData = 0;
			try {
				percentData = getDataProObj(dataPropPercent, getStatus);
			} catch (e) {
				console.log('属性计算错误：' + 'getStatus.' + dataPropPercent);
			}

			this.setState({
				basicData,
				percentData
			})
		});

	}

	reLoad = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.getData()
	}

	render() {
		const {icon} = this.props;
		let percent = this.state.percentData === undefined || this.state.percentData === null ? '-' : (this.state.percentData * 100).toFixed(2) + "%"
		return (
			<div className={wrap}>
				<div className={conLeft}>
					<img className={iconL} src={icon}/>
					<div className={textL}>{this.state.basicData}</div>
					<div className={textL_below}>
						{
							this.state.percentData === undefined || this.state.percentData === null ? '' :
								<div className={this.state.percentData >= 0 ? text_icon_up : text_icon_down}></div>
						}
						{percent}</div>
					<div>
						<a onClick={this.reLoad}>
							<img className={svg} src={Img}/>
						</a>
					</div>
				</div>
			</div>
		)
	}

}

export default FinanceAnalysis;
