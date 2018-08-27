import React, {Component} from 'react';
import store from '../../../store';
import Img from './download.svg';
import * as style from './index.css'

class PeGoal extends Component {
	constructor() {
		super();
		this.state = {
			using: '60',
			total: '100',
			rate: 5,
			width: 126,
			strokeWidth: 8,
			status: 10,
			delay: 0,
			activity: 10,
			delaycnt: 0
		};
		// goal_finish_rate 完成率
		// goal_delay_rate 延期率
		// goal_activity_cnt 活跃数
		// goal_finish_cnt  完成数
		this.relativeStrokeWidth = this.relativeStrokeWidth.bind(this)
		this.trackPath = this.trackPath.bind(this)
		this.stroke = this.stroke.bind(this)
		this.circlePathStyle = this.circlePathStyle.bind(this)
		this.reRreshPage = this.reRreshPage.bind(this)
	}

	componentDidMount() {
		const xhr = new XMLHttpRequest();
		// xhr.open("GET", "/performance-okr/pm/obj/queryPsnGoalStatis ", true);
		xhr.open("GET", "http://hrcloud.yyuap.com/performance-okr/pm/obj/queryPsnGoalStatis ", true);
		xhr.withCredentials = true; //支持跨域发送cookies
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status === 200) {
				let getStatus = JSON.parse(xhr.responseText);
				let data = getStatus.data;
				this.setState({
					rate: Math.round(data.goal_finish_rate * 100),
					delay: Math.round(data.goal_delay_rate * 100),
					activity: Math.round(data.goal_activity_cnt),
					delaycnt: data.goal_delay_cnt
				})
			} else {
				this.setState({
					scale: 0
				})
			}
		}
		this.setState({
			scale: 10
		})
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
		return (
			<div className={style.goal}>
				<div className="my-content-goal">
					<div className={style["my-content-goal"] + " " + style["my-content-goal-left"]}>
						<div className={style["goal-title"]}>
							我的目标
						</div>
						<ul className={style["goal-ul"]}>
							<div className={style["goal-li"]}>
								<div className={style["goal-label"]}>
									当前活动目标 ：
								</div>
								<div className={style["goal-val"]}>
									{this.state.activity}
								</div>
							</div>
							<div className={style["goal-li"]}>
								<div className={style["goal-label"]}>
									目标按时达成率 ：
								</div>
								<div className={style["goal-val"]}>
									{/*30%*/}
									{this.state.rate} %
								</div>
							</div>
							<div className={style["goal-li"]}>
								<div className={style["goal-label"]}>
									目标逾期率 ：
								</div>
								<div className={style["goal-val"] + ' ' + style["goal-val-warning"]}>
									{/*70%*/}
									{this.state.delay} %
								</div>
							</div>
						</ul>
						<div className="my-content-goal goal-refresh">
							<a onClick={this.reRreshPage}>
								<img className={style['svg']} src={Img}/>
							</a>
						</div>
					</div>
					<div className={"my-content-goal " + style["my-content-goal-right"]}>
						<svg viewBox="0 0 100 100" style={{width: "100px", height: "100px", transform: "translateY(40px)"}}>
							<path d={this.trackPath()} stroke="rgba(131,140,151,1)" strokeWidth={this.relativeStrokeWidth()}
										fill="none"></path>
							<path d={this.trackPath()} strokeLinecap="round" stroke={this.stroke()}
										strokeWidth={this.relativeStrokeWidth()} fill="none" style={pathStyle}></path>
						</svg>
						<div className={style["sn-progress-text"]}>
							<div>{this.state.delaycnt}</div>
							<div className={style["sn-progress-info"]}>已逾期</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

}

export default PeGoal;
