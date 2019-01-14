import GroupItem from './groupItem';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';
import PopDialog from 'pub-comp/pop';
import { ButtonCheckClose, ButtonCheckSelected, ButtonDefaultWhite } from 'pub-comp/button';
import { avoidSameName } from '@u';
import Icon from 'pub-comp/icon';
import Checkbox from 'bee/checkbox';
import WidgetList from '../manageWidgetList';
import { findItemById } from '../../utils';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { dropSideCards,dropSideCardsInGroup } = manageActions;

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
    return { id: props.id, type: props.type, parentId: props.parentId };
  }
};

const itemTarget = {
  hover(props,monitor,component){
    const isJustOverThisOne = monitor.isOver({ shallow: true });
    //console.log("isJustOverThisOne=======",isJustOverThisOne);
  },
  drop(props, monitor) {
    console.log("在group中drop============================++++++++++++++")
    const isJustOverThisOne = monitor.isOver({ shallow: true });

    console.log("isJustOverThisOne=======",isJustOverThisOne);
    const draggedId = monitor.getItem().id;
    const preParentId = monitor.getItem().parentId;
    const draggedType = monitor.getItem().type;
    let afterParentId = props.data.parentId;
    if (draggedId !== props.id && draggedType === 1 && props.data.type === 1) {//组向组拖拽
      props.moveGroupDrag(draggedId, props.id);
    } else if (draggedType === 3 && props.data.type === 1) { //widget向组内非widget拖拽
      !props.data.parentId && (afterParentId = props.data.widgetId);
      //因为冒泡 所以已经有的话 不需要执行move
      let dataItem = findItemById(props.data.children, draggedId);
      if (typeof dataItem === "undefined" || (dataItem && dataItem.widgetId !== draggedId)) {
        // 当前分组中不存在当前拖拽的项 或者 存在当前项并且当前项的id不是当前拖拽的id
        props.moveItemDrag(draggedId, preParentId, draggedType, props.id, afterParentId, props.data.type);
      }
    }
    else if (draggedType == "cardlist" && props.data.type === 1&&isJustOverThisOne) {//左侧cards向组内非widget位置拖拽
      const cardList = monitor.getItem().cardList;
      const siderCardPops = {
        id: draggedId,
        preParentId: preParentId,
        afterId: props.id,
        parentId: props.data.widgetId,
        afterType: props.data.type,
        monitor,
        cardList
    }
      props.dropSideCardsInGroup(siderCardPops);
      
    }
  }
};


@connect(
  mapStateToProps(
    'manageList',
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


  render() {

    var {
      manageList,
      dragState,
      selectGroup,
      currEditonlyId,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
      languagesJSON,
    } = this.props;

    var widgetSelectListProps = {
      applicationsMap,
      manageList,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
    }
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
            </div>
            {this.renderDrop(index)}
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
    let _html = (<div className={`${groupArea} animated zoomIn`} style={{ ...overStyle }}>
      <section style={{ ...opacity }} className={inFoucs ? selectedBackClass : ""} >
        {groupTitle}
        <div>
          <WidgetList index={index} data={children} parentId={this.props.data.widgetId}
            {...widgetSelectListProps} languagesJSON={languagesJSON} />
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

