import React, { Component } from 'react';
import Icon from 'pub-comp/icon';
import { widgetList, clearfix, addModule, pop_dialog_widge_list } from './style.css'
import WidgetItem from './widgetItem';
import PopDialog from 'pub-comp/pop';
import SelectWidgetList from '../manageSelectWidgetList';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { getContainerMaxHeight } from '../../utils'

@connect(
  mapStateToProps(
    "manageList",
    "layout",
    "defaultLayout",
    {
      namespace: 'manage',
    },
  )
)
class WidgetList extends Component {

  //TUDO 数据中的 size ： sm 、lg、xg （小[标准]、中、大）

  // static propTypes = {
  //     widgeList: PropTypes.array.isRequired,
  // }
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      moveLine: 'none',
      checkId: '',
    }
  }

  openSelectWidget = () => {
    this.setState({
      showModal: true
    })
  }
  savePosition = (id, moveLine) => {
    this.setState({
      checkId: id,
      moveLine,
    })
  }
  moveLine = (id, moveLinePara) => {
    if (id == this.state.checkId) {
      return moveLinePara;
    } else {
      return 'none'
    }
  }
  moveItemDrag = (id, preParentId, preType, afterId, parentId, afterType) => {
    let data = { id, preParentId, preType, afterId, parentId, afterType }
    const { moveService } = this.props;
    moveService(data);
  }

  editTitle = (id, name) => {
    let data = { id, name }
    const { editTitle } = this.props;
    editTitle(data);
  }

  popClose = () => {
    this.setState({
      showModal: false
    })
  }

  render() {
    var {
      manageList,
      selectList,
      selectGroup,
      title,
      drag,
      selectListActions, selectGroupActions,
      delectService,
      applicationsMap,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
      currGroupIndex,
      languagesJSON,
      layout,
      defaultLayout
    } = this.props;
    var widgetItemProps = {
      manageList,
      selectList,
      selectGroup,
      currGroupIndex,
      title,
      drag,
      selectListActions, selectGroupActions,
      delectService,
    }

    var selectWidgetListProps = {
      applicationsMap,
      manageList,
      allServicesByLabelGroup,
      getAllServicesByLabelGroup,
      setCurrentSelectWidgetMap,
      addDesk,
      requestSuccess,
      requestError,
    }
    const { data, index } = this.props;
    const containerHeight = getContainerMaxHeight(data, layout.rowHeight, layout.margin);


    const list = data.map((item, i) => {
      const {
        type,
        parentId,
        widgetId: id,
      } = item;
      return (
        <WidgetItem
          ref={id}
          drag={drag}
          key={`widget-${id}-${i}`}
          data={item}
          id={id}
          parentId={parentId}
          index={id}
          propsIndex={index}
          type={type}
          savePosition={this.savePosition}
          moveLine={this.moveLine(id, this.state.moveLine)}
          moveItemDrag={this.moveItemDrag}
          editTitle={this.editTitle}
          {...widgetItemProps}
          languagesJSON={languagesJSON}
          isShadow={item.isShadow}
          gridx={item.gridx}
          gridy={item.gridy}
          width={item.width}
          height={item.height}
          widgetName={item.widgetName}
        />
      );
    })

    let _da = {};

    return (<ul className={`${widgetList} ${clearfix}`}
      style={{
        height:
          containerHeight > defaultLayout.containerHeight
            ? containerHeight
            : defaultLayout.containerHeight
      }}>
      {list}
      {/* <div className={addModule} onClick={this.openSelectWidget} >
          <Icon title={languagesJSON.addQuick_to_home} type="add"  />
        </div> */}

      <PopDialog className={pop_dialog_widge_list} type="info" title={languagesJSON.addQuick_to_home} close={this.popClose} backdrop={false} show={this.state.showModal} data={_da} >
        <SelectWidgetList close={this.popClose} parentId={this.props.parentId}
          {...selectWidgetListProps}
          languagesJSON={languagesJSON}
        />
      </PopDialog>

    </ul>);
  }
}

export default WidgetList;
