import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';


/*   actions   */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  components 组件 */
import Icon from 'pub-comp/icon';
import Message from 'bee/message';
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

import { ResizableBox } from 'react-resizable';

/*  定义style  css-loader  */
const {
  workArea,
  sideBarArea,
  contentArea,
  hasTab,
  tabArea,
  wrap,
  titleServiceDisplayStyle,
  work,
  titleArea,
  service,
  pin,
  marginTop,
  marginLeft,
  iframeCont,
  contenthasTab
} = styles;
/* 声明actions */
const { requestStart, requestSuccess, requestError } = rootActions;
const {
  setCurrent,
  titleServiceDisplay,
  titleServiceHidden,
  pinDisplayBlock,
  setPinCancel,
  getProductInfo,
  returnDefaultState,
  resetHistory
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
    'backUrl',
		'productInfo',
    {
      key: 'domainName',
      value: ({ domainName, type }) => (type === 1 ? '' : domainName),
    },
    {
      namespace: 'work',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getProductInfo,
    titleServiceDisplay,
    titleServiceHidden,
    pinDisplayBlock,
    setPinCancel,
    returnDefaultState,
    setCurrent,
    resetHistory
  },
)
export default class Work extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getProductInfo: PropTypes.func,
    titleServiceDisplay: PropTypes.func,
    titleServiceHidden: PropTypes.func,
    pinDisplayBlock: PropTypes.func,
    setPinCancel: PropTypes.func,
    returnDefaultState: PropTypes.func,
    setCurrent: PropTypes.func,
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    current: PropTypes.shape({
      serviceCode: PropTypes.string,
    }),
    pinType: PropTypes.bool,
    pinDisplay: PropTypes.bool,
    expandedSidebar: PropTypes.bool,
    type: PropTypes.number,
    titleServiceType: PropTypes.bool,
    domainName: PropTypes.string,
    widthBrm: PropTypes.bool,
		productInfo: PropTypes.object
  };
  static defaultProps = {
    history: {},
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getProductInfo: () => { },
    titleServiceDisplay: () => { },
    titleServiceHidden: () => { },
    pinDisplayBlock: () => { },
    setPinCancel: () => { },
    returnDefaultState: () => { },
    setCurrent: () => { },
    match: {},
    current: {},
    pinType: false,
    pinDisplay: false,
    expandedSidebar: false,
    type: 1,
    titleServiceType: false,
    domainName: '',
    widthBrm: false,
		productInfo: {}
	};

  constructor(props) {
    super(props);
    this.state = {
			loaded: false,
			width: 220,
      marginLeftState: 230,
      height: 500,
    };
    this.goBack = this.goBack.bind(this);
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
			setCurrent,
			productInfo
		} = this.props;
		if (!productInfo.curMenuBar) {
			this.getProductInfo(code, type, subcode);
		} else {
			setCurrent(subcode);
    }
    this.setState({
      height: document.body.offsetHeight - 86
    });
	}


  componentDidMount() {
    // const { history } = this.props;
    // history.block((location) => {
    //   console.log(location);
    // });
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: {
          code: newCode,
          type: newType,
          subcode: newSubcode,
        },
      },
      expandedSidebar: newExpandedSidebar,
    } = nextProps;
    const {
      match: {
        params: {
          code: oldCode,
          type: oldType,
          subcode: oldSubcode,
        },
      },
      setCurrent,
      expandedSidebar: oldExpandedSidebar,
    } = this.props;
    const typeChange = newType !== oldType;
    const codeChange = newCode !== oldCode;
    const subcodeChange = newSubcode !== oldSubcode;
    // 增加判断sidebar  是否是展开
    if(newExpandedSidebar !== oldExpandedSidebar){
      const section = document.querySelector('section');
      if(!newExpandedSidebar){
        this.setState({
          marginLeftState: 0,
          width: 0
        });
      }else{
        this.setState({
          marginLeftState: 230,
          width: 220
        });
        if (section) {
          section.setAttribute("style", "width:220px")
        }
      }
    }
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

  // 从页面离开  直接清空state
  componentWillUnmount() {
    const { returnDefaultState } = this.props;
    returnDefaultState();
  }

  // 获取地址
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
    });
    getProductInfo(code, type, subcode).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      } else {
        if (!subcode) {
          const {
            curService: {
              serviceCode: subcode,
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

  goBack() {
    this.props.resetHistory();
    this.props.history.replace('');
  }

  pinDisplayFn = () => {
    const {
      current: {
        serviceCode,
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
      setPinCancel(serviceCode).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          Message.create({
            content: '從首頁移除失敗!', duration: 1.5, position: 'topLeft', color: 'warning', style: { height: 'auto', top: -340 },
          });
          return false;
        }
        Message.create({
          content: '從首頁移除成功!', duration: 1.5, position: 'topLeft', color: 'success', style: { height: 'auto', top: -340 },
        });
        requestSuccess();
      });
      return false;
    }
    if (!pinDisplay) {
      pinDisplayBlock();
    }
    return true;
  }


	onResize = (event, {element, size}) => {
  	this.setState({width: size.width, marginLeftState: size.width + 10});
		const section = document.querySelector('section');
		if (section) {
			section.setAttribute("style", "width:" + size.width + "px")
		}
	};

  makeLayout = () => {
		const { expandedSidebar, type } = this.props;
		const header = document.querySelector('.um-header');
		const iframe = document.querySelector('iframe');
		  switch (type) {
        case 1:
          return (
            <div className={`${marginTop} ${iframeCont}`} style={{ marginTop: 94 }}>
              <ContentContainer />
            </div>
          );
        case 4:
          return (
            <div className={`${marginTop} ${iframeCont}`} style={{ marginTop: 94 }}>
              <ContentContainer />
            </div>
          );
        case 2:
          return (
            <div style={{height: "100%"}}>
              {
                expandedSidebar ? (
									<ResizableBox width={this.state.width} axis="x"
																height={this.state.width}
																minConstraints={[220, 150]} maxConstraints={[document.body.offsetWidth / 3, 300]}
																onResize={this.onResize}
																onResizeStart={() => {
																	iframe && iframe.setAttribute('style', 'pointer-events:none')
																}}
																onResizeStop={() => {
																	iframe && iframe.setAttribute('style', 'pointer-events:auto')
																}}
									>
										<div className={sideBarArea} style={{width: this.state.width}}>
											<SideBarContainer className="text"/>
										</div>
									</ResizableBox>
                ) : null
              }
							<div className={`${hasTab} ${marginTop} ${marginLeft}`} style={{marginLeft: this.state.marginLeftState}}>
                <div className={contentArea}>
                  <ContentContainer />
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div style={{height: "100%"}}>
              {
                expandedSidebar ? (
									<ResizableBox width={this.state.width} axis="x"
																height={this.state.width}
																minConstraints={[220, 150]} maxConstraints={[document.body.offsetWidth / 3, 300]}
																onResize={this.onResize}
																onResizeStart={() => {
																	iframe && iframe.setAttribute('style', 'pointer-events:none')
																}}
																onResizeStop={() => {
																	iframe && iframe.setAttribute('style', 'pointer-events:auto')
																}}
									>
										<div className={sideBarArea} style={{width: this.state.width}}>
											<SideBarContainer/>
										</div>
									</ResizableBox>
                ) : null
              }
							<div className={`${hasTab} ${marginTop} ${marginLeft}`} style={{marginLeft: this.state.marginLeftState}}>
								<div className={`${contentArea} ${contenthasTab}`}>
									<ContentContainer hasTab/>
								</div>
								<div className={tabArea}>
									<TabsContainer/>
								</div>
							</div>
            </div>
          );
        default:
          return null;
      }
  }

  btnOnclick = () => {
    const { titleServiceDisplay, titleServiceHidden, titleServiceType } = this.props;
    if (titleServiceType) {
      titleServiceHidden();
    } else {
      titleServiceDisplay();
    }
  }

  render() {
    const {
      pinType,
      titleServiceType,
      current: {
        title,
        hasRelationFunc,
      },
      domainName,
      widthBrm,
      type,
    } = this.props;
    const iconName = <Icon title="返回首頁" type="home" />;
    return (
      <div className={`${wrap} um-win ${work}`}>
        <div className="um-header header">
          <HeaderContainer onLeftClick={this.goBack} iconName={iconName} leftContent={domainName}>
            <div className={titleArea}>
              <span>{title}</span>
              {
                hasRelationFunc ?
                  (<Icon
                    title="相關服務"
                    type={titleServiceType ? 'upward' : 'pull-down'}
                    className={`
                      ${titleServiceType ? titleServiceDisplayStyle : ''}
                      ${service}
                    `}
                    onClick={this.btnOnclick}
                  />) : undefined
              }
              <Icon
                title="添加到首頁"
                className={pin}
                style={{
                  // right: hasRelationFunc ? '-27px' : '-27px',
                  position: 'absolute',
                  top: '0px',
                }}
                type={pinType ? 'pin2' : 'pin'}
                onClick={this.pinDisplayFn}
              />
            </div>
          </HeaderContainer>
          {
            widthBrm ? <BreadcrumbContainer withSidebar={type !== 1 && type !== 4}/> : null
          }
        </div>

        <div className={`${workArea}`}>
          {this.makeLayout()}
        </div>
        {
          hasRelationFunc ? <TitleServiceContainer outsideClickIgnoreClass="icon-xiala" /> : null
        }
        <Pin outsideClickIgnoreClass="icon-dingzhi" />
      </div>
    );
  }
}
