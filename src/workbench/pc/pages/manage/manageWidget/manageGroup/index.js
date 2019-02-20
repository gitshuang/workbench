
import React from 'react';
import GroupItem from './groupItem';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import PopDialog from 'pub-comp/pop';
import { ButtonCheckClose, ButtonCheckSelected, ButtonDefaultWhite } from 'pub-comp/button';
import { avoidSameName } from '@u';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { dropSideCards, dropSideCardsInGroup } = manageActions;
import WidgetItem from '../manageWidgetItem';
import * as utilService from '../../utils';
import { findDOMNode } from 'react-dom';
import GroupTitle from './groupTitle.js'

import {
  widgetTitle,
  addGroupBtn,
  newGroupName,
  addBtn,
  groupArea,
  selectedBackClass,
  titleInputArea,
  iconBox,
  btn,
  newGroupName_focus,
  newGroupName_blur,
  widgetTitleInit,
  check_group,
  noChildStyle
} from './style.css';



const itemSource = {
  beginDrag(props) {
    return { id: props.id, type: props.type, parentId: props.parentId,index: props.index, };
  }
};

const itemTarget = {
  hover(props, monitor, component) {
		const dragItem = monitor.getItem();
         
		if (dragItem.type === 1) { //1是group
			//组hover到组
			const dragIndex = monitor.getItem().index;
			const hoverIndex = props.index;

			if (dragIndex === hoverIndex) {
				return;
			}

			const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			props.moveGroupItem(dragIndex, hoverIndex);

			monitor.getItem().index = hoverIndex;
		} else if (dragItem.type === 3||dragItem.type === "cardList") { //3 是widget
      //卡片到组
      const hoverItem = props;
			const { x, y } = monitor.getClientOffset();
			const groupItemBoundingRect = findDOMNode(component).getBoundingClientRect();
			const groupItemX = groupItemBoundingRect.left;
			const groupItemY = groupItemBoundingRect.top;
			
			props.moveCardInGroupItem(dragItem, hoverItem, x - groupItemX, y - groupItemY);
		}
	},
	drop(props, monitor, component) {
		const dragItem = monitor.getItem();
    const dropItem = props;
		if (dragItem.type === 1) {//释放的分组对象
			props.moveGroupDrag(dragItem.id, props.id);
    } else if (dragItem.type === 3) {//释放的分组内的卡片
			props.onCardDropInGroupItem(dragItem, dropItem);
		} else if (dragItem.type === 'cardList') {//释放的Sider区域的卡片
			props.onCardListDropInGroupItem(dragItem, dropItem);
		}
	}

};


@connect(
  mapStateToProps(
		'manageList',
		'layout',
		'defaultLayout',
    {
      namespace: 'manage',
    },
  ),
  {
    dropSideCards,
    dropSideCardsInGroup
  }
)

@DragSource("item", itemSource, (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
})
@DropTarget("item", itemTarget, (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    getItemType: monitor.getItem(),
  }
})
export default class ManageGroup extends GroupItem {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      inFoucs: false,
      showModal: false,
      selectGroup: [],
      selectList: [],
    }
  }
  componentWillMount() {
    const {
      data: {
        widgetName,
        isNew,
      },
      manageList,
      languagesJSON
    } = this.props;

    if (isNew) {
      setTimeout(() => {

        const nameArr = manageList.map(({ widgetName }) => {
          return widgetName;
        });
        const newGroupName = avoidSameName(nameArr, languagesJSON.group);
        this.setState({
          groupName: newGroupName,
        });
        this.refs.groupName.focus();
        this.refs.groupName.select();

        const { checkFun, currEditonlyId } = this.props;
        checkFun(currEditonlyId + "_btn");
      }, 0);
    } else {
      this.setState({
        groupName: widgetName,
      });
    }
  }
	componentDidMount() {
		let clientWidth;
		const containerDom = document.querySelector('#widget-container');
		if (containerDom) {
			clientWidth = containerDom.clientWidth;
		}
		if (this.props.layout.containerWidth !== clientWidth) {
			this.props.handleLoad();
			// console.log('handle');
		}
	}

  componentWillReceiveProps(nextProps) {
    if (
      this.props.currEditonlyId !== nextProps.currEditonlyId &&
      this.props.data.isNew
    ) {
      this.props.renameGroup({
        id: this.props.data.widgetId,
        name: this.state.groupName == "" ? this.props.data.widgetName : this.state.groupName,
        dontChangeCurrEditonlyId: true,
      });
      this.setState({
        inFoucs: false
      })
    }
  }

 //创建卡片
 createCards(cards, groupID, index) {
	let itemDoms = [];
	_.forEach(cards, (c, i) => {
		itemDoms.push(
			<WidgetItem
				id={c.widgetId}
				groupID={groupID}
				groupIndex={index}
				index={i}
				type={c.type}
				gridx={c.gridx}
				gridy={c.gridy}
				width={c.width}
				height={c.height}
				haspower={c.haspower}
				isShadow={c.isShadow}
				isChecked={c.isChecked}
				key={`${groupID}_${c.widgetId}`}
				name={c.widgetName}
			/>
		);
	});
	return itemDoms;
}

  render() {

    var {
      manageList,
      dragState,
      selectGroup,
      currEditonlyId,
      languagesJSON,
    } = this.props;

   
    const {
      data: {
        widgetId,
        widgetName,
        children,
      },
      index,
      connectDragSource,
      connectDropTarget,
			isDragging,
			cards,
			id,
			layout,
			defaultLayout
    } = this.props;
    const {
      inFoucs,
      groupName,
      showModal,
    } = this.state;
    const checkType = selectGroup.indexOf(index) > -1 ? true : false
    const opacity = isDragging ? 0 : 1;
    let groupTitle;
    if (currEditonlyId == widgetId) {
      groupTitle = (
        <div className={widgetTitle} >
          <div className={titleInputArea}>
            <input
              className={`${inFoucs ? newGroupName_focus : newGroupName_blur} ${newGroupName} input`}
              value={groupName}
              maxLength="4"
              autoFocus="autofocus"
              onChange={this.editGroupName}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              // placeholder="分组名称,最多4个字符"
              placeholder={languagesJSON.groupName_max_words_four}
              ref="groupName" />
          </div>
          <ButtonCheckSelected id={`${widgetId}_btn`} className={btn} onClick={() => { this.renameGroupFn(index) }}><Icon type="right"></Icon></ButtonCheckSelected>
          <ButtonCheckClose className={btn} onClick={() => { this.renameGroupCancel(index) }}><Icon type="cancel"></Icon></ButtonCheckClose>
        </div>
      );
    } else {
      groupTitle = (
        // um-box-justify
        <div className={`${widgetTitle} ${widgetTitleInit} `} >
          <div className={check_group}>
            <Checkbox checked={checkType} onChange={(e) => { this.selectFn(e, index) }}>{widgetName}</Checkbox>
            {
              (languagesJSON.noDataGroup && children.length === 0)
                ?
                <span className={noChildStyle}><Icon type="notice" />{languagesJSON.noDataGroup}</span>
                :
                null
            }
          </div>
          <div>
            <div className={iconBox}>
              <Icon title={languagesJSON.rename_group} type="record" onClick={() => { this.openRenameGroupFn(widgetId) }} />
              <Icon title={languagesJSON.delete} type="dustbin" onClick={() => { this.delectGroupFn(index) }} />
              {
                index ?
                  <Icon title={languagesJSON.move_up} type="move-upward" onClick={() => { this.moveTopFn(index); }} />
                  : <Icon title={languagesJSON.move_up} type="move-upward" className="disabled" onClick={() => { return false }} />}
              {
                index !== manageList.length - 1 ?
                  <Icon title={languagesJSON.move_down} type="move-down" onClick={() => { this.moveBottomFn(index) }} />
                  :
                  <Icon title={languagesJSON.move_down} type="move-down" className="disabled" onClick={() => { return false }} />}
            </div>
            {/* {this.renderDrop(index)} */}
          </div>
        </div>
      );
    }

    const pop_btn = [
      {
        label: `${languagesJSON.confirm}`,
        fun: this.delectGroupFn,
        className: "",
      },
      {
        label: `${languagesJSON.cancel}`,
        fun: this.popClose,
        className: "",
      }
    ]

    if (isDragging) {
      //return null
    }

    var { isOver, getItemType } = this.props;
    var overStyle = {};
    if (isOver && getItemType.type === 1) {
      overStyle = {
        'transform': 'scale(1,1)',
        'boxShadow': '0 0 0 3px #ddd,0 0 0 6px rgba(0,205,195,1)',
        'borderRadius': '0',
      }
		}
		const containerHeight = utilService.getContainerMaxHeight(cards, layout.rowHeight, layout.margin);
    let _html = (<div className={`${groupArea} animated zoomIn`} style={{ ...overStyle }}>
      <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
        {groupTitle}
        <div  id="widget-container" style={{
          height:
            containerHeight > defaultLayout.containerHeight
              ? containerHeight
              : defaultLayout.containerHeight
        }}
>
         
						{this.createCards(cards, id, index)}
        </div>
      </section>

      <div className={addBtn} >
        <ButtonDefaultWhite className={addGroupBtn} onClick={this.addGroupFn.bind(this, index)}>
          <Icon type="add"></Icon>
          {languagesJSON.addGroup}
        </ButtonDefaultWhite>
      </div>
      <PopDialog className="pop_dialog_delete" show={showModal} type="delete" close={this.popClose} btns={pop_btn} data={{ index }}>
        <div className="pop_cont">
          <span>{languagesJSON.confirm_del_this_item}</span>
        </div>
      </PopDialog>
    </div>);
    return dragState ? connectDragSource(connectDropTarget(_html)) : _html;
  }
}

