import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import { ElementsWrapper } from 'components/scrollNav';
import HomeFolderDialog from 'containers/homeFolderDialog';
import WidgeList from 'containers/homeWidgetList';
import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';
import HeaderPage from './headerPage';
import HomeMark from './mark';
import { pageHome } from './style.css';

const { getWorkList, getApplicationList } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'workList',
    'metaData',
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getWorkList,
    getApplicationList
  },
)
class Home extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getWorkList: PropTypes.func,
    metaData: PropTypes.shape({
      groupMeta: PropTypes.object,
      contentData: PropTypes.object,
      headerData: PropTypes.object,
      listMeta: PropTypes.object,
    }),
    workList: PropTypes.arrayOf(PropTypes.object),
    getApplicationList: PropTypes.func,
  };
  static defaultProps = {
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
    getWorkList: () => {},
    getApplicationList: () => {},
    metaData: {},
    workList: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        top: 0,
        height: 0,
      },
      lazyLoadNum: -1,
      homemark: false,
      applications: [],
    };
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentWillMount() {
    const {
      requestStart, requestSuccess, requestError, getWorkList, getApplicationList,
      userInfo,
    } = this.props;
    requestStart();
    const param = {
      componentCode: 'yonyoucloud',
      viewCode: 'home',
      deviceType: 'PC',
      lang: 'US',
    };
    getWorkList(param).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
    // 请求应用

    const { admin } = userInfo;
    const timeType = this.totalTime();
    if (admin && timeType){
      const time = new Date().getTime();
      localStorage.setItem('time',time);
      getApplicationList().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
        }
        this.setState({
          applications: payload.applications,
        });
        if(this.forTime(payload.applications)){
          this.setState({
            homemark: true
          })
        }
        requestSuccess();
      });
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
  }
  componentDidUpdate() {
    let total = 0;
    this.props.workList.forEach((v) => {
      total += v.children.length;
    });
    if (this.state.lazyLoadNum === total) {
      window.removeEventListener('scroll', this.updateViewport);
      window.removeEventListener('resize', this.updateViewport);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  }

  totalTime = () => {
    const time = new Date().getTime();
    const localTime = localStorage.getItem('time');
    if (!localTime) return true;
    const tol = Number(localTime) + (24*60*60*1000);
    if(time > tol){
      return true;
    }
    return false;
  }

  forTime = (applications) => {
    let type = false;
    for(var i=0;i<applications.length;i++){
      const time = applications[i].expired;
      if (!time) {
        type = false;
        continue;
      }
      const currTime = new Date().getTime();
      const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
      if (currTime > time || timeDiff <= 30) {
        type = true;
        break;
      }
    };
    return type;
  }

  updateViewport=() => {
    const self = this;
    // if (this.refs.home.offsetHeight <= window.pageYOffset + window.innerHeight){}
    self.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight,
      },
    });
  }
  
  loadOk = (() => {
    const self = this;
    let count = 0;
    return () => {
      count += 1;
      self.setState({
        lazyLoadNum: count,
      });
    };
  })()

  renderMetadata = (name) => {
    const { metaData } = this.props;
    return metaData && metaData.properties && metaData.properties[name];
  }

  linkTo = () => {
    this.closeHomeMark();
    this.props.history.push(`/app/application`);
  }

  closeHomeMark = () => {
    this.setState({
      homemark: false
    });
  }

  render() {
    const {
      workList,
    } = this.props;
    const list = [];
    const conts = [];
    // 元数据拉过来的值
    const groupMeta = this.renderMetadata('group');
    const contentData = this.renderMetadata('content');
    const headerData = this.renderMetadata('header');
    const listMeta = this.renderMetadata('list');
    const contentStyle = contentData && contentData.style && JSON.parse(contentData.style);
    workList.forEach((da, i) => {
      const {
        widgetId: id,
        widgetName: name,
      } = da;
      const props = {
        key: `nav${id}`,
        data: da,
        noTitle: !i,
      };
      if (i === workList.length - 1) {
        props.style = {
          height: window.innerHeight,
        };
      }
      list.push({
        label: name,
        target: `nav${id}`,
      });
      conts.push(<WidgeList
        groupMeta={groupMeta}
        listMeta={listMeta}
        {...props}
        viewport={this.state.viewport}
        loadOk={this.loadOk}
      />);
    });
    return (
      <div ref='home' className={`${pageHome} home`} style={contentStyle}>
        <HeaderPage list={list} headerData={headerData}/>
        <ElementsWrapper items={list} offset={-55}>
          {conts}
        </ElementsWrapper>
        <HomeFolderDialog />
        {
          this.state.homemark ? <HomeMark 
            linkTo={this.linkTo} 
            homemark={this.state.homemark} 
            closeHomeMark={this.closeHomeMark}
            /> : null
        }
      </div>
    );
  }
}
export default Home;

