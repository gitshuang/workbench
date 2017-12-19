import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps, findPath } from '@u';
/*   actions   */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  components 组件 */
import Icon from 'components/icon';
import {Message} from 'tinper-bee';
/*  containers 容器组件  */
import TabsContainer from 'containers/tabs';
import HeaderContainer from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import ContentContainer from 'containers/content';
import SideBarContainer from 'containers/sideBar';
import TitleServiceContainer from 'containers/titleService';
import Pin from 'containers/pin';

/*  style样式库组件  */
import styles from './style.css';

/*  定义style  css-loader  */
const {
  workArea,
  sideBarArea,
  contentArea,
  hasTab,
  tabArea,
  wrap,
  title_service_display,
  header,
  active,
  work,
  titleArea,
  service,
  pin,
} = styles;
/* 声明actions */
const {requestStart, requestSuccess, requestError} = rootActions;
const {
  setMenus,
  setCurrent,
  titleServiceDisplay,
  pinDisplayBlock,
  setPinCancel,
  getProductInfo,
  returnDefaultState
  } = workActions;


@withRouter
@connect(
  mapStateToProps(
    'widthBrm',
    'pinType',
    'pinDisplay',
    'current',
    'tabs',
    'menus',
    'titleServiceType',
    'expandedSidebar',
    'type',
    {
      key: 'domainName',
      value: ({ domainName, type }) => {
        return type === 1 ? '' : domainName;
      },
    },
    {
      namespace: 'work'
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getProductInfo,
    titleServiceDisplay,
    pinDisplayBlock,
    setPinCancel,
    returnDefaultState,
    setCurrent,
  }
)
export default class Work extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.replace('');
  }

  getProductInfo(code, type, subcode) {
    const {
      getProductInfo,
      requestStart,
      requestError,
      requestSuccess,
      history,
      } = this.props;
    requestStart();
    this.setState({
      loaded: false,
    })
    getProductInfo(code, type, subcode).then(({error, payload}) => {
      if (error) {
        requestError(payload);
      } else {
        if (!subcode) {
          const {
            curServe: {
              serveCode: subcode
            },
          } = payload;
          history.replace(`/${type}/${code}/${subcode}`);
        }
        this.setState({
          loaded: true,
        });
      }
      requestSuccess();
    });
  }

  componentWillMount() {
    const {
      match: {
        params: {
          code,
          type,
          subcode,
        },
      },
    } = this.props;
    this.getProductInfo(code, type, subcode);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: {
          code: newCode,
          type: newType,
          subcode: newSubcode,
          }
        }
      } = nextProps;
    const {
      match: {
        params: {
          code: oldCode,
          type: oldType,
          subcode: oldSubcode,
          }
        },
      menus,
      setCurrent,
    } = this.props;
    const typeChange = newType !== oldType;
    const codeChange = newCode !== oldCode;
    const subcodeChange = newSubcode !== oldSubcode;
    if (typeChange || codeChange) {
      this.getProductInfo(newCode, newType, newSubcode);
    } else if (subcodeChange) {
      if (newSubcode) {
        setCurrent(newSubcode);
      } else {
        this.getProductInfo(newCode, newType);
      }
    }
  }

  componentWillUnmount() {
    const { returnDefaultState } = this.props;
    returnDefaultState();
  }

  pinDisplayFn = ()=> {
    const {
      current: {
        serveCode,
        },
      pinDisplayBlock,
      pinType,
      pinDisplay,
      setPinCancel,
      requestStart,
      requestError,
      requestSuccess,
      } = this.props;
    if (pinType) {
      requestStart();
      setPinCancel(serveCode).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        }
        Message.create({content: '移除成功',duration:2,position: 'top', color: "light"});
        requestSuccess();
      });
      return false;
    }
    if (!pinDisplay) {
      pinDisplayBlock();
    }
  }

  makeLayout() {
    const { loaded } = this.state;
    const { expandedSidebar, type } = this.props;
    if (loaded) {
      switch (type) {
        case 1:
          return (
            <div className={workArea}>
              <ContentContainer />
            </div>
          );
        case 2:
          return (
            <div className={workArea}>
              {
                expandedSidebar ? (
                  <div className={sideBarArea}>
                    <SideBarContainer />
                  </div>
                ) : null
              }
              <div className={contentArea}>
                <ContentContainer />
              </div>
            </div>
          );
        case 3:
          return (
            <div className={workArea}>
              {
                expandedSidebar ? (
                  <div className={sideBarArea}>
                    <SideBarContainer />
                  </div>
                ) : null
              }
              <div className={hasTab}>
                <div className={contentArea}>
                  <ContentContainer hasTab={true}/>
                </div>
                <div className={tabArea}>
                  <TabsContainer />
                </div>
              </div>
            </div>
          );
      }
    }
  }

  render() {
    const {
      pinType,
      pinDisplay,
      titleServiceDisplay,
      titleServiceType,
      current: {
        title,
        hasRelationFunc,
      },
      domainName,
      widthBrm,
      type,
      } = this.props;
    const { loaded } = this.state;
    let iconName = <Icon title="返回首页" type="home"/>
    return (
      <div className={`${wrap} um-win ${work}`}>
        <div className={header}>
          <div className="um-header">
            <HeaderContainer onLeftClick={ this.goBack } iconName={iconName} leftContent={ domainName }>
              <div className={titleArea}>
                <span>{ title }</span>
                {
                  hasRelationFunc ?
                    (<Icon
                      title="相关服务"
                      type="pull-down"
                      className={`
                        ${titleServiceType?title_service_display:""}
                        ${service}
                      `}
                      onClick={ titleServiceDisplay }/>) : undefined
                }
                <Icon
                  title="添加到首页"
                  className={pin}
                  style={{
                    right: hasRelationFunc ? '-70px' : '-35px',
                  }}
                  type={pinType?"pin2":"pin"}
                  onClick={ this.pinDisplayFn }
                />
              </div>
            </HeaderContainer>
          </div>
        </div>
        <div className={`um-content ${workArea}`}>
          {
            widthBrm ? <BreadcrumbContainer withSidebar={ type !== 1 }/> : null
          }
          { this.makeLayout() }
        </div>
        {
          hasRelationFunc ? <TitleServiceContainer outsideClickIgnoreClass={'icon-xiala'}/> : null
        }
        <Pin outsideClickIgnoreClass={'icon-dingzhi'}/>
      </div>
    );
  }
}
