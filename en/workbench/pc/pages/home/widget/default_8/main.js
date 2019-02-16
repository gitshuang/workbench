import React, {Component} from 'react';
import Img from './download.svg';
import style, {wrap, title, titleContainer, content, imgstyle} from './index.css'

import request from 'yutils/request';

import {getContentType, getUrlWithParams, getDataProObj} from 'yutils/request';

class PeMy extends Component {
	constructor() {
		super();
		this.state = {
			data: 0
		};
	}

	componentDidMount() {
		this.getData();
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
			let data = 0;
			try {
				data = getDataProObj(dataProp, getStatus);
			} catch (e) {
				console.log('' + 'getStatus.' + dataProp);
			}
			try {
				data = parseInt(data, 10);
			} catch (e) {
				throw new Error(e);
			}
			this.setState({
				data: data > 999 ? '999+' : data
			})
		});


	}

	reRreshPage = (e) => {
		e.preventDefault();
		e.stopPropagation();
		this.getData();
	}

	render() {
		const {dataDesc} = this.props;
		return (
			<div className={wrap}>
				<div className={style['my-count']}>
					<span>{this.state.data}</span>
				</div>
				<div className={style['my-err-count']}>
					<span className={this.state.data !== 0 ? style['is-error'] : style['isnt-error']}>{dataDesc}</span>
				</div>
				<div>
					<a onClick={this.reRreshPage}>
						<img className={style['svg']} src={Img}/>
					</a>
				</div>
			</div>
		)
	}

}

export default PeMy;
