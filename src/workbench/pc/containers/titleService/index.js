import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group';
import {
  mapStateToProps
} from '@u';
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';
import Icon from 'bee-icon';
import {
  title,
  uf,
  serviceName,
  serviceIcon,
  services,
  uf_name,
  uf_service
} from './style.css';
const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;
const {
  titleServiceHidden,
  getTitleService
} = workActions;

@withRouter
@connect(mapStateToProps(
    'titleServiceType',
    'current',
    {
      "namespace": "work"
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    titleServiceHidden,
    getTitleService
  }
)
@onClickOutside
class titleServiceContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      service: [],
      contacts: []
    }
  }
  componentWillReceiveProps({titleServiceType}) {
    if (titleServiceType && !this.state.loaded) {
      const {
        requestStart,
        requestSuccess,
        requestError,
        getTitleService,
        current
      } = this.props;
      getTitleService(current.serveCode).then(({
        error,
        payload
      }) => {
        if (error) {
          requestError(payload);
        } else {
          this.setState({
            loaded: true,
            service: payload.relationServes,
            contacts: payload.relationUsers
          });
          requestSuccess();
        }
      });
    }
  }
  handleClickOutside(evt) {
    const {
      titleServiceHidden,
      titleServiceType
    } = this.props;
    if (titleServiceType) {
      titleServiceHidden();
    }
  }
  handlerClickService(serveCode) {
    this.props.history.push(`/serve/${serveCode}`);
  }
  render() {
    const {
      titleServiceType
    } = this.props;
    const content = titleServiceType ? (
      <div className={`${title} um-css3-hc`}>
        <div className={services}>
          <h4>相关服务</h4>
          <ul className="clearfix">
            {
              this.state.service.map(({ serveIcon, serveName, serveCode }, i) =>
                <li key={i} onClick={this.handlerClickService.bind(this, serveCode)}>
                  <div className={serviceIcon}>
                    <img src={serveIcon} className={uf_service} />
                  </div>
                  <span className={serviceName} title={serveName}>{serveName}</span>
                </li>
              )
            }
          </ul>
        </div>
        <div>
          <h4>相关联系人</h4>
          <ul className="clearfix">
            {
              this.state.contacts.map(({ userAvator, userName }, i) =>
                <li key={i}>
                  <div className={serviceIcon}>
                    <img src={userAvator} className={uf_name} />
                  </div>
                  <span className={serviceName}>{userName}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    ) : null;
    return (
      <CSSTransitionGroup
        transitionName={ {
          enter: 'animated',
          enterActive: 'fadeIn',
          leave: 'animated',
          leaveActive: 'fadeOut',
        } }
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300} >
        { content }
      </CSSTransitionGroup>
    );
  }
}

export default titleServiceContainer;
