import React, {Component} from 'react';
import Img from './download.svg';
import * as style from './index.css'

import request from 'yutils/request';

import {getContentType, getUrlWithParams, getDataProObj} from 'yutils/request';

class PeGoal extends Component {
	constructor() {
		super();
		this.state = {
			width: 126,
			strokeWidth: 8,
			status: 10,
			getStatus: null
		};
		this.relativeStrokeWidth = this.relativeStrokeWidth.bind(this)
		this.trackPath = this.trackPath.bind(this)
		this.stroke = this.stroke.bind(this)
		this.circlePathStyle = this.circlePathStyle.bind(this)
		this.reRreshPage = this.reRreshPage.bind(this)
	}

	componentDidMount() {
		this.getData();
	}

	renderLeftContent = (getStatus) => {
		if (getStatus) {
			const renderArray = [];
			for (let i = 1; i <= 3; i++) {
				const dataProp = this.props[`dataProp_${i}`];
				const dataDesc = this.props[`dataProp_${i}_desc`];
				const dataType = this.props[`dataProp_${i}_type`];
				const dataColor = this.props[`dataProp_${i}_color`];
				const data = getDataProObj(dataProp, getStatus);
				if (dataProp) {
					renderArray.push(<div key={i} className={style["goal-li"]}>
						<div className={style["goal-label"]}>
							{dataDesc ? dataDesc + ' ' + '' + ' ' : ''}
						</div>
						<div className={style["goal-val"]} style={dataColor ? {color: dataColor} : {}}>
							{dataProp ? ((dataType && dataType === '%') ? (Math.round(data * 100) + ' %') : data) : ''}
						</div>
					</div>);
				}
			}
			return renderArray;
		}
		return <div/>
	}

	getData = () => {

		const {params, method, contentType} = this.props;

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
			this.setState({getStatus});
			this.setState({
				scale: 0
			})
		});

	}

	reRreshPage(e) {
		// debugger
		e.preventDefault();
		e.stopPropagation();
		this.componentDidMount();
	}

	trackPath() {
		var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth()) / 2, 10);
		return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
	}

	stroke() {
		var ret;
		switch (this.status) {
			case 'success':
				ret = '#13ce66';
				break;
			case 'exception':
				ret = '#ff4949';
				break;
			default:
				ret = 'rgba(246,247,249,1)';
		}
		return ret;
	}

	relativeStrokeWidth() {
		return (this.state.strokeWidth / this.state.width * 100).toFixed(1);
	}

	perimeter() {
		var radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
		return 2 * Math.PI * radius;
	}

	circlePathStyle() {
		var perimeter = this.perimeter();
		return {
			strokeDasharray: `${perimeter}px,${perimeter}px`,
			strokeDashoffset: (1 - this.state.scale / 100) * perimeter + 'px',
			transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
		};
	}

	render() {
		let pathStyle = this.circlePathStyle()
		const {dataProp, dataDesc} = this.props;
		console.log(JSON.stringify(this.state.getStatus));
		return (
			<div className={style.goal}>
				<div className="my-content-goal">
					<div className={style["my-content-goal"] + " " + style["my-content-goal-left"]}>
						<ul className={style["goal-ul"]}>
							{this.renderLeftContent(this.state.getStatus)}
						</ul>
						<div className="my-content-goal goal-refresh">
							<a onClick={this.reRreshPage}>
								<img className={style['svg']} src={Img}/>
							</a>
						</div>
					</div>
					<div className={"my-content-goal " + style["my-content-goal-right"]}>
						<svg viewBox="0 0 100 100" style={{width: "100px", height: "100px", transform: "translateY(0px)"}}>
							<path d={this.trackPath()} stroke="rgba(131,140,151,1)" strokeWidth={this.relativeStrokeWidth()}
										fill="none"></path>
							<path d={this.trackPath()} strokeLinecap="round" stroke={this.stroke()}
										strokeWidth={this.relativeStrokeWidth()} fill="none" style={pathStyle}></path>
						</svg>
						<div className={style["sn-progress-text"]}>
							<div style={{color: 'black'}}>{getDataProObj(dataProp, this.state.getStatus)}</div>
							<div className={style["sn-progress-info"]}>{dataDesc}</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default PeGoal;
