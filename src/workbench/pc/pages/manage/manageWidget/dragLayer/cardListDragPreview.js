import React, { Component } from 'react';
import background_card from 'assets/image/background_card.png';
//拖拽预览组件类
export default class CardListDragPreview extends Component {
	constructor(props) {
		super(props);
	}
	//当拖拽的siderCard的数量变化时，重新渲染
	shouldComponentUpdate(nextProps, nextState) {
		const thisProps = this.props || {},
			thisState = this.state || {};
		if (this.props.cardListLength !== nextProps.cardListLength) {
			return true;
		}
		return false;
	}
	render() {
		const { cardListLength } = this.props;
		let divDom = <div
						className='layer-card'
					>
						<span className='layer-card-span'>＋{cardListLength}</span>
						<img 
							src={background_card}
							alt='logo'
						/>
					</div>
			
		
		return <div className="desk_setting_layer_card_list">{divDom}</div>;
	}
}
