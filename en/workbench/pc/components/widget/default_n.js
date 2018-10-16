import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';

import {
	widgetItem,
	title,
	titleRight,
	defaultArea,
	iconImg,
} from './style.css'
import Loading from 'bee/loading';
import Default_4 from "./default_4/main";
import Default_5 from "./default_5/main";
import Default_6 from "./default_6/main";
import Default_7 from "./default_7/main";
import Default_8 from "./default_8/main";
import Default_9 from "./default_9/main";

const widgetStyle = [
	// 小
	{
		width: 176,
	},
	// 中
	{
		width: 360,
	},
	// 大
	{
		width: 360,
		height: 360,
	},
];

class WidgetItem extends Component {
	static propTypes = {
		data: PropTypes.shape({
			background: PropTypes.string,
			size: PropTypes.number,
			widgetName: PropTypes.string,
			icon: PropTypes.string,
		}),
		clickHandler: PropTypes.func,
	};
	static defaultProps = {
		data: {},
		clickHandler: () => {
		},
		viewport: {
			top: 0,
			height: 0
		},
	};

	constructor(props) {
		super(props);
		this.state = {
			shouldLoad: false,
			defaultImgIndex: -1
		}
	}

	componentWillMount() {
		this.setState({ defaultImgIndex: parseInt(Math.random() * 4 + 1, 10) })
	}

	componentDidMount() {
		const { from } = this.props;
		if (from === "folder") {
			this.setState({
				shouldLoad: true
			});
			return false;
		}
		if (!this.state.shouldLoad && this.props.viewport) {
			var el = findDOMNode(this.refs.default_widget);
			this.updataLoadState(el.offsetTop, el.offsetHeight)
		}
	}

	componentDidUpdate(prevProps) {
		if (!this.state.shouldLoad && prevProps.viewport) {
			var el = findDOMNode(this.refs.default_widget);
			this.updataLoadState(el.offsetTop, el.offsetHeight)
		}
	}

	updataLoadState(top, height) {
		if (this.state.shouldLoad) {
			return;
		}
		var min = this.props.viewport.top;
		var max = this.props.viewport.top + this.props.viewport.height;
		if ((min <= (top + height) && top <= max)) {
			this.setShowImage(true);
		}
	}

	setShowImage(show) {
		this.setState({
			shouldLoad: !!(show)
		})
		this.props.loadOk();
	}

	renderWidget = (type) => {
		const { data } = this.props;
		switch (type) {
			case 4:
				return <Default_4 {...data} />;
			case 5:
				return <Default_5 {...data} />;
			case 6:
				return <Default_6 {...data} />;
			case 7:
				return <Default_7 {...data} />;
			case 8:
				return <Default_8 {...data} />;
			case 9:
				return <Default_9 {...data} />;
		}
	}

	render() {
		const {
			data: {
				background,
				size,
				widgetName: name,
				type
			},
			clickHandler,
		} = this.props;

		const style = {
			...widgetStyle[size - 1],
		};
		if (background) {
			style.backgroundImage = `url(${background})`;
		}
		return (
			<li ref="default_widget" className={`${widgetItem}`}
				onClick={clickHandler}
				onKeyDown={clickHandler}
				role="presentation"
			>
				{this.state.shouldLoad ? (<div>
					<div className={title}>
						<div className={titleRight}>{name}</div>
					</div>
					{this.renderWidget(type)}
				</div>) : (
						<Loading container={this} show={true} />)
				}
			</li>
		);
	}
}

export default WidgetItem;
