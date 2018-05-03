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
import { pageHome } from './style.css';

const { getWorkList } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'workList',
    'metaData',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getWorkList,
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
  };
  static defaultProps = {
    requestStart: () => {},
    requestSuccess: () => {},
    requestError: () => {},
    getWorkList: () => {},
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
      lazyLoadNum:-1,
    }
    this.updateViewport = this.updateViewport.bind(this)
  }
  componentWillMount() {
    const {
      requestStart, requestSuccess, requestError, getWorkList,
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

  }
  renderMetadata = (name) => {
    const { metaData } = this.props;
    return metaData && metaData.properties && metaData.properties[name];
  }
  componentDidMount() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  }
  componentDidUpdate(){
    var total = 0
    this.props.workList.forEach((v,k)=>{
      total += v.children.length
    });
    if(this.state.lazyLoadNum === total){
      window.removeEventListener('scroll', this.updateViewport);
      window.removeEventListener('resize', this.updateViewport);
    }
  }

  updateViewport=()=>{
    if( this.refs.home.offsetHeight <= window.pageYOffset + window.innerHeight){}
    var self = this;
    self.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight
      }
    });
  }
  loadOk = (()=>{
    var self = this;
    var count=0;
    return function(){
      ++count
      self.setState({
        lazyLoadNum:count,
      })
    };
  })()
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
      conts.push(<WidgeList groupMeta={groupMeta} listMeta={listMeta} {...props} viewport={this.state.viewport} loadOk={this.loadOk}/>);
    });
    return (
      <div ref='home' className={`${page_home} home`} style={contentStyle}>
        <HeaderPage list={list} headerData={headerData}/>
        <ElementsWrapper items={list} offset={-55}>
          {conts}
        </ElementsWrapper>
        <HomeFolderDialog />
      </div>
    );
  }
}
export default Home;

