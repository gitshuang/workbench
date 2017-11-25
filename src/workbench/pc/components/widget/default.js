import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import PopDialog from 'components/pop';
import Icon from 'bee-icon';
import Checkbox from 'bee-checkbox';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
  pop_cont,
  footer
} from './style.css'

const widgetStyle = [
  // 小
  {
    width: 176
  },
  // 中
  {
    width: 360
  },
  // 大
  {
    width: 360,
    height: 360
  }
];

class WidgetItem extends Component {

  static propTypes = {
    data: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      widget: null,
      showModal:false
    }
  }
  componentWillMount() {
    const { data: { jsurl } } = this.props;
    if (jsurl) {
      getData(jsurl, (result) => {
        this.setState({
          loaded: true,
          widget: result.default ? result.default : result,
        })
      })
    }
  }

  popSave = (data)=>{
    // this.state.data
    // const { deleteFolder } = this.props;
    // deleteFolder(data.widgetId);
  }

  popClose = ()=>{
      this.setState({
        showModal:false
      })
  }

  fileDele = () =>{
    this.setState({
      showModal:true
    })
  }

// >>>>>>> 新建服务按钮以及action
//     const {data: {background, widgetId: id, size, widgetName: name, icon, }, clickHandler, } = this.props;
// <<<<<<< HEAD
// =======

  render() {

    const pop_btn = [
      {label:"确认",fun:this.popSave,className:""},
      {label:"取消",fun:this.popClose,className:""}
    ]   //设置操作按钮

    const { index,connectDragSource, connectDropTarget,isDragging } = this.props;
    const {data: {background, widgetId: id, size, widgetName: name, icon, }, clickHandler, } = this.props;

    const { widget: Widget, loaded } = this.state;
    let contentElm;
    if (loaded) {
      contentElm = (<Widget/>);
    } else {
      contentElm = (<Loading container={this} show={true} />);
    }
// >>>>>>> 新建服务按钮以及action

    return (
      <li className={widgetItem}
        style={{...widgetStyle[size], backgroundImage: background }}
        onClick={clickHandler} >
        <div className={title}>
          <div className={title_left}><img src={icon} /></div>
          <div className={title_right}>{name}</div>
        </div>

        <div className={content}>
          {contentElm}
        </div>

        <div className={footer}>
          <div><Checkbox disabled className="test" /></div>
          
          <div onClick={this.fileDele}><Icon type="uf-del" /></div>
        </div>

        <PopDialog className="pop_dialog_delete" show = { this.state.showModal } data={this.props.data} btns={pop_btn} >
            <div className={pop_cont}>
              <Icon type="uf-exc-t" />
              <span>您确认要删除服务[{this.props.data.widgetName}]?</span>
            </div>
        </PopDialog>
        
      </li>
    );
  }
}

export default WidgetItem;
