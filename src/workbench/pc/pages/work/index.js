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
const {workArea, sideBarArea, contentArea, hasTab, tabArea, wrap,title_service_display,header,active} = styles;
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
        'domainName',
        'pinType',
        'pinDisplay',
        'current',
        'tabs',
        'menus',
        'titleServiceType',
        'expandedSidebar',
        'type',
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
      getProductInfo(code, type, subcode).then(({error, payload}) => {
        if (error) {
          requestError(payload);
        } else {
          this.setState({
            loaded: true,
          });
          if (!subcode) {
            const {
              curServe: {
                serveCode: subcode
              },
            } = payload;
            history.replace(`/${type}/${code}/${subcode}`);
          }
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
      if (!(newCode === oldCode && newType === oldType) || !newSubcode) {
        this.setState({
          loaded: false,
        })
        this.getProductInfo(newCode, newType);
      } else if (newSubcode && newSubcode !== oldSubcode) {
        setCurrent(newSubcode);
      }
    }
    componentWillUnmount(){
        const { returnDefaultState } = this.props;
        returnDefaultState();
    }
    pinDisplayFn =()=> {
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
                Message.create({content: '从首页移除成功', position: 'top',color:"success"});
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
              <div className={workArea} >
                <ContentContainer />
              </div>
            );
          case 2:
            return (
              <div className={workArea} >
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
              <div className={workArea} >
                {
                  expandedSidebar ? (
                    <div className={sideBarArea}>
                      <SideBarContainer />
                    </div>
                  ) : null
                }
                <div className={hasTab}>
                  <div className={contentArea}>
                    <ContentContainer hasTab={true} />
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
        let iconName = <Icon type="home" style={{fontSize:"24px"}}/>
        return (
          <div className={wrap + " um-win"}>
            <div className={header}>
              <div className="um-header">
                <HeaderContainer onLeftClick={ this.goBack } iconName={iconName} leftContent={ domainName }>
                  <div className={"um-box"}>
                    <span>{ title }</span>
                    {
                      hasRelationFunc ?
                        (<Icon
                          type="pull-down"
                          style={{marginLeft:"15px",fontSize:"18px",fontWeight:900}}
                          className={titleServiceType?title_service_display:""}
                          onClick={ titleServiceDisplay } />) : undefined
                    }
                    <Icon
                      type={pinDisplay?"pin2":"pin"}
                      className={ pinType ? active : '' }
                      style={{ marginLeft:"15px",fontSize:"18px",fontWeight:900}}
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
            <Pin outsideClickIgnoreClass={'icon-dingzhi'} />
          </div>
        );
    }
}
