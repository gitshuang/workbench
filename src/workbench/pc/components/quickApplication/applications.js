import React, { Component } from 'react';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import {
  serviceContainer,
  service,
  serviceBtn,
  contentDiv,
  content,
  linkCont,
  btn,
} from './style.css';

@onClickOutside
class Applications extends Component {
  static propTypes = {
    serviceList: PropTypes.arrayOf(PropTypes.object),
    closeServiceModal: PropTypes.func,
    openAllFn: PropTypes.func,
    openServiceFn: PropTypes.func,
    quickServiceDisplay: PropTypes.bool,
  };
  static defaultProps = {
    serviceList: [],
    closeServiceModal: () => {},
    openAllFn: () => {},
    openServiceFn: () => {},
    quickServiceDisplay: false,
  };
  constructor(props) {
    super(props);
    // 定时器
    this.interval = null;
    this.state = {
      openAllstate: false,
    };
  }

  componentWillMount() {
    const { serviceList } = this.props;
    const openAllstate = !!(serviceList && serviceList.length <= 12);
    this.setState({
      openAllstate,
    });
  }

  onClickScroll = () => {
    const div = this.list;
    const bottom = div.offsetHeight;
    let Top = 0;
    if (this.interval) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        if (Top >= bottom) {
          clearInterval(this.interval);
          this.interval = null;
          Top = 0;
        } else {
          if (div.pageYOffset) {
            div.pageYOffset += 3;
          } else if (div.scrollTo) {
            div.scrollTo(0, (div.scrollTop + 3));
          } else {
            div.scrollTop += 3;
          }
          Top += 3;
        }
      }, 10);
    }
  }

  onscrollFun = () => {
    const div = this.list;
    const scrollTop = Math.floor(div.scrollTop || div.pageYOffset || div.scrollTop);
    if (div.scrollHeight === div.clientHeight + scrollTop) {
      this.setState({
        openAllstate: true,
      });
    } else if (scrollTop <= 10) {
      this.setState({
        openAllstate: false,
      });
    }
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
    openAllFn();
  }

  // open service
  openApp = (applicationCode) => {
    const { openServiceFn } = this.props;
    this.handleClickOutside();
    openServiceFn(applicationCode);
  }

  render() {
    const { serviceList } = this.props;
    return (
      <div className={serviceContainer}>
        <div className={service} ref={(c) => { this.list = c; }} onScroll={this.onscrollFun}>
          <ul className="clearfix">
            {
              serviceList && serviceList.map(({
                applicationCode,
                applicationIcon,
                applicationName,
              }) => (
                <div
                  key={applicationCode}
                  className={contentDiv}
                  onClick={() => { this.openApp(applicationCode); }}
                  onKeyDown={() => { this.openApp(applicationCode); }}
                  role="presentation"
                >
                  <li><img alt={applicationName} src={applicationIcon} /></li>
                  <div className={content} title={applicationName}>{applicationName}</div>
                </div>
                ))
            }
          </ul>
        </div>
        {
          this.state.openAllstate ? (
            <div
              className={linkCont}
              onClick={this.openAllAppList}
              onKeyDown={this.openAllAppList}
              role="presentation"
            >
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
