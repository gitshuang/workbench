import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps, findPath } from '@u';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';
import {
  title,
  uf,
  serviceName,
  serviceIcon,
  services,
  uf_name,
  uf_service,
} from './style.css';

const {
  titleServiceHidden,
  setCurrent,
} = workActions;

@withRouter
@connect(mapStateToProps(
    'titleServiceType',
    'current',
    'menus',
    {
      "namespace": "work"
    }
  ),
  {
    titleServiceHidden,
    setCurrent,
  }
)
@onClickOutside
class titleServiceContainer extends Component {
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
    const {
      history,
      menus,
      setCurrent,
    } = this.props;
    const menuPath = findPath(menus, 'children', 'serveCode', serveCode);
    if (menuPath.length) {
      const current = menuPath.slice(-1)[0];
      const { menuItemId } = current;
      setCurrent(menuItemId);
    } else {
      history.push(`/serve/${serveCode}`);
    }
    this.handleClickOutside();
  }
  render() {
    const {
      titleServiceType,
      current: {
        relationServes: service,
        relationUsers: contacts,
      },
    } = this.props;
    const content = titleServiceType ? (
      <div className={`${title} um-css3-hc`}>
        {
          service.length ? (
            <div className={services}>
              <h4>相关服务</h4>
              <ul className="clearfix">
                {
                  service.map(({ serveIcon, serveName, serveCode }, i) =>
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
          ) : null
        }
        {
          contacts.length ? (
            <div>
              <h4>相关联系人</h4>
              <ul className="clearfix">
                {
                  contacts.map(({ userAvator, userName }, i) =>
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
          ) : null
        }
      </div>
    ) : null;
    return (
      <TransitionGroup>
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
      </TransitionGroup>
    );
  }
}

export default titleServiceContainer;
