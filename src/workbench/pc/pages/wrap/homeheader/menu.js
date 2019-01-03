import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import MenuBarInner, {getChildrenDeep} from './menuInner';
import Icon from 'pub-comp/icon';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { openWin } from '../../../public/regMessageTypeHandler';
import { openService } from 'public/regMessageTypeHandler';
import rootActions from 'store/root/actions';
import menuActions from 'store/root/menubar/actions';
const { requestStart, requestSuccess, requestError } = rootActions;
const { getAllMenuList } = menuActions;

@connect(
  mapStateToProps(
    'allMenuList'
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getAllMenuList,
  },
)
class MenuBar extends Component {
  static propTypes = {
    allMenuList: PropTypes.arrayOf(PropTypes.object),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getAllMenuList: PropTypes.func,
  };
  static defaultProps = {
    allMenuList: [],
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getAllMenuList: () => { },
  };
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
      openKeys: [],
      selectedKeys: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.sideBarAllSub = {};//所有在sideBarList展示的数据
  }

  componentDidMount() {
    const {
      requestStart,
      requestSuccess,
      requestError,
      getAllMenuList,
    } = this.props;
    requestStart();
    getAllMenuList().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return;
      }
      let deep ;
      if(payload[0].menuItems.length>0 ){
        deep = getChildrenDeep(payload[0].menuItems, 2);
      }else{
        deep = getChildrenDeep(payload[0].menuItems,1);
      }
      //解说：默认打开第一个菜单，如果deep>2则表示有三级，菜单栏才会有子节点，不然全都右边list展示
      this.setState({
        openKeys:[payload[0].menuBarId],
        selectedKeys:deep>2? [ payload[0].menuItems[0].menuItemId ]:[],
        currentSubBar: deep>2? {data:payload[0].menuItems[0].children,name:payload[0].menuItems[0].menuItemName} :{},
        allMenuList: payload
      })
      requestSuccess();
    });
  }
  // 点击bottomBar打开页签，bottomBar是一二级菜单中二级，一二三级菜单三级，一二三四级菜单四级
  openService = (id,name,url,serviceCode) =>{
    openService(serviceCode);
    // openWin({
    //   id: id,
    //   title: name,
    //   // data: {
    //   //   type: 'addressbook',
    //   //   value: text
    //   // }
    // });
    this.setState({menuShow:false})
  }
  // 获取所有需要在三四级区域展示的数据
  setSideBarAllSub = (id,name,data) =>{
      this.sideBarAllSub[id] = {name:name,data:data}
  }
  // 点击菜单外面可以关闭
  handleClickOutside() {
    this.setState({
      menuShow: false,
    })
  }
  menuShow = () => {
    this.setState({
      menuShow: !this.state.menuShow
    })
  }
  handleClick({key}) {
    this.setState({
      selectedKeys:[key],
      currentSubBar:this.sideBarAllSub[key]
    })
  }
  onOpenChange = (openKeys) => {
    this.setState({
      openKeys:openKeys.length>1?[openKeys[openKeys.length-1]]:openKeys,
    });
  }

  render() {
    let { menuShow, allMenuList, openKeys, selectedKeys,currentSubBar } = this.state;
    return (
      <div>
        <Icon type='master' className="ignoreClass" onClick={this.menuShow} />
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: `fadeInLeft`,
              leave: 'animated',
              leaveActive: `fadeOutLeft`,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {
              menuShow?(
                <MenuBarInner 
                  allMenuList={allMenuList}
                  openKeys={openKeys}
                  selectedKeys={selectedKeys}
                  currentSubBar={currentSubBar}
                  menuShow={this.menuShow}
                  handleClick={this.handleClick}
                  onOpenChange={this.onOpenChange}
                  setSideBarAllSub={this.setSideBarAllSub}
                  openService={this.openService}
                  outsideClickIgnoreClass={'ignoreClass'}
                />
              ):null
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    );
  }
}
export default MenuBar;

