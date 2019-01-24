import React, { Component } from 'react';




export default class WidgetItemFather extends Component {
	
	constructor(props) {
		super(props);
		
	}
	popSave = (data) => {
		const { delectService } = this.props;
		delectService(data.widgetId);
		this.setState({
			showModal: false
		})
	}

	popClose = () => {
		this.setState({
			showModal: false
		})
	}
	isContained = (a, b) => {
		if (!(a instanceof Array) || !(b instanceof Array)) return false;
		if (a.length < b.length) return false;
		var aStr = a.toString();
		for (var i = 0, len = b.length; i < len; i++) {
			if (aStr.indexOf(b[i]) == -1) return false;
		}
		return true;
	}
	onHandChange = (flag) => {
		const { selectList, selectGroup, selectListActions, selectGroupActions, propsIndex, manageList } = this.props;
		const {
			data: {
				widgetId
			}
		} = this.props;
		let selectList2;
		if (!flag) {
			selectList2 = selectList.filter((item, i) => {
				return item !== widgetId;
			});
			const selectGroup2 = selectGroup.filter((item, i) => {
				return propsIndex !== item;
			});
			selectGroupActions(selectGroup2);
		} else {
			selectList2 = [widgetId, ...selectList];
			// 判断当前分组下的子节点是否都在selectList中
			let newArr = manageList[propsIndex].children.map((item, index) => {
				return item.widgetId;
			})
			console.log(this.isContained(selectList2, newArr));
			if (this.isContained(selectList2, newArr)) {
				selectGroup.push(propsIndex);
				selectGroupActions(selectGroup);
			}
		}
		selectListActions(selectList2);
	}
}

