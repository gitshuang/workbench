import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';

import Header from 'containers/header';
import BreadcrumbContainer from 'components/breadcrumb';
import Upload from 'containers/upload';

import { umContent, content, user, info } from './style.css';
import bg from 'assets/image/homepage.png';
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
  },
)
class HomePage extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    history: PropTypes.shape({
      go: PropTypes.func,
      push: PropTypes.func,
      replace: PropTypes.func,
    }),
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    routes: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    history: {},
    location: {},
    routes: [],
    logo: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      brm: [{ name: '个人主页' }]
    };
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  setUrl = (url) => {
    this.setState({
      logo: url
    });
  }

  render() {
    const { brm } = this.state;
    return (
      <div className="um-win">
        <div className="um-header header">
          <Header onLeftClick={this.goHome} iconName="computer" >
            <div>
              <span>个人主页</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <BreadcrumbContainer data={brm} goback={this.goBack} />
          </div>
        </div>
        <div className={`${umContent} content um-box um-content`}>
          <div className={content}>
            <div className={user}>
              <img src={bg} />
              <div className={info}>
                <dl className="clearfix">
                  <dt>
                  <Upload
                    name='logo'
                    logo={""}
                    onChange={(e) => { this.setUrl("logo", e) }}
                    tip=''
                  />
                  </dt>
                  <dd>
                    <h5>于水水</h5>
                    <h6></h6>
                    <div>
                      <button>发消息</button>
                      <button>发邮件</button>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
