import React, {Component} from 'react';
import Img from './download.svg';
import request from '../../../utils/request';

import {getContentType, getUrlWithParams, getDataProObj} from '../../../utils/request';

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
import {getSumSign} from "../../../utils/utils";
import Utils from "../default_6/utils";

class FinanceAnalysis extends Component {
	constructor() {
		super();
		this.state = {
			basicData: 0
		};
		this.reLoad = this.reLoad.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {

		const {params, dataProp, method, contentType} = this.props;

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

			this.setState({
				basicData
			})
		});

	}

	reLoad = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.getData()
	}

	render() {
		const {icon, dataDesc, dataType} = this.props;
		let {basicData} = this.state;
		if (dataType && dataType === 'sum') {
			basicData = getSumSign() + Utils.formatCurrency(basicData);
		}
		return (
			<div className={wrap}>
				<div className={conLeft}>
					<img className={iconL} src={icon}/>
					<div className={textL}>{basicData}</div>
					<div className={textL_below}>{dataDesc}</div>
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