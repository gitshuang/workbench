import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { 
  serviceContainer, 
  service, 
  serviceGroup, 
  serviceBtn, 
  contentDiv, 
  content, 
  link_cont, 
  btn,
} from './style.css';

@onClickOutside
class Applications extends Component {

  constructor(props) {
    super(props);
    // 定时器
    this.interval = null;
    this.state = {
      openAllstate: false,
    }
  }

  componentDidMount() {
    const { serviceList } = this.props;
    const openAllstate = serviceList && serviceList.length <= 12 ? true : false;
    this.setState({
      openAllstate,
    });
  }

  // open service 
  openApp = (applicationCode) => {
    const { openServiceFn } = this.props;
    this.handleClickOutside();
    // this.props.history.push(`/app/${applicationCode}`);
    openServiceFn(applicationCode);
  }

  // outside click 事件 
  handleClickOutside() {
    const { closeServiceModal, quickServiceDisplay } = this.props;
    if (quickServiceDisplay) {
      closeServiceModal();
    }
  }

  // open allApplicatoin button click
  openAllAppList = () => {
    const { openAllFn } = this.props;
    this.handleClickOutside();
    //this.props.history.push('/application');
    openAllFn();
  }

  onClickScroll = (e) => {
    let div = this.refs.list;
    const { serviceList } = this.props;
    let bottom = div.offsetHeight;
    let _top = 0;
    if (this.interval) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        if (_top >= bottom) {
          clearInterval(this.interval);
          this.interval = null;
          _top = 0;
        } else {
          if (div.pageYOffset) {
            div.pageYOffset = (div.pageYOffset + 3);
          } else if (div.scrollTo) {
            div.scrollTo(0, (div.scrollTop + 3));
          } else {
            div.scrollTop = (div.scrollTop + 3);
          }
          _top += 3;
        }
      }, 10)
    }
  }

  onscrollFun = () => {
    let div = this.refs.list;
    let scrollTop = Math.floor(div.scrollTop || div.pageYOffset || div.scrollTop);
    if (div.scrollHeight == div.clientHeight + scrollTop) {
      this.setState({
        openAllstate: true
      })
    } else {
      if (scrollTop <= 10) {
        this.setState({
          openAllstate: false
        })
      }
    }
  }

  render() {
    const { serviceList } = this.props;
    return (
      <div className={serviceContainer}>
        <div className={service} ref="list" onScroll={this.onscrollFun}>
          <ul className="clearfix">
            {
              serviceList && serviceList.map(({
                applicationCode,
                applicationIcon,
                applicationId,
                applicationName,
              }) => (
                  <div key={applicationCode} className={contentDiv} onClick={() => { this.openApp(applicationCode) }}>
                    <li><img src={applicationIcon} /></li>
                    <div className={content} title={applicationName}>{applicationName}</div>
                  </div>
                ))
            }
          </ul>
        </div>
        {
          this.state.openAllstate ? (
            <div className={link_cont} onClick={this.openAllAppList}>
              <a>全部应用</a>
            </div>
          ) : (
              <div className={serviceBtn}>
                <button className={btn} onClick={this.onClickScroll}>更多应用</button>
              </div>
            )
        }
      </div>
    );
  }
}

export default Applications;
