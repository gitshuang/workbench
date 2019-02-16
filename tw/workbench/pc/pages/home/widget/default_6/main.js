import React, {Component} from 'react';
import Img from './download.svg';
import {wrap, titleContainer, title, conLeft, iconL, textL, textL_below, conRight, iconR, svg} from './index.css'
import Utils from './utils';

import request from 'yutils/request';

import {getContentType, getUrlWithParams, getDataProObj} from 'yutils/request';
import {getSumSign} from 'yutils/utils';

class MyBill extends Component {
	constructor() {
		super();
		this.state = {
			rightData: 0,
			leftData: 0
		};
		this.reLoad = this.reLoad.bind(this);
	}

	componentDidMount() {
		this.getData()
	}

	getData = () => {

		const {params, leftDataProp, rightDataProp, method, contentType} = this.props;

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
			let leftData = 0;
			try {
				leftData = getDataProObj(leftDataProp, getStatus);
			} catch (e) {
				console.log('' + 'getStatus.' + leftDataProp);
			}
			let rightData = 0;
			try {
				rightData = getDataProObj(rightDataProp, getStatus);
			} catch (e) {
				console.log('' + 'getStatus.' + rightData);
			}

			this.setState({
				rightData,
				leftData
			})
		});
	}

	reLoad = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.getData()
	}

	render() {
		const {leftDataType, rightDataType, iconLSrc, iconRSrc, descL, descR} = this.props;
		let {leftData, rightData} = this.state;
		if (leftDataType && leftDataType === 'sum') {
			leftData = getSumSign() + Utils.formatCurrency(leftData);
		}
		if (rightDataType && rightDataType === 'sum') {
			rightData = getSumSign() + Utils.formatCurrency(rightData);
		}
		return (
			<div className={wrap}>
				<div className={conLeft}>
					<img className={iconR} src={iconLSrc}/>
					<div className={textL}>{leftData}</div>
					<div className={textL_below}>{descL}</div>
					<div>
						<a onClick={this.reLoad}>
							<img className={svg} src={Img}/>
						</a>
					</div>
				</div>
				<div className={conRight}>
					<img className={iconR} src={iconRSrc}/>
					<div className={textL}>{rightData}</div>
					<div className={textL_below}>{descR}</div>
				</div>
			</div>
		)
	}

}

export default MyBill;
