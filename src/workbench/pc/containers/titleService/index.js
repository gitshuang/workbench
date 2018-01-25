import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import { mapStateToProps, findPath,getStrLenSubstr} from '@u';
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
  }
)
@onClickOutside
class titleServiceContainer extends Component {
  handleClickOutside(ev) {
    let oEvent= ev||event;
    const {
      titleServiceHidden,
      titleServiceType
    } = this.props;
    if (titleServiceType  && (oEvent.target).getAttribute("title") != "相关服务") {
      titleServiceHidden();
    }
  }
  handlerClickService(serviceCode) {
    const {
      history,
      match: {
        params: {
          code,
          type,
        },
      },
      menus,
    } = this.props;
    const menuPath = findPath(menus, 'children', 'serviceCode', serviceCode);
    if (menuPath.length) {
      history.push(`/${type}/${code}/${serviceCode}`);
    } else {
      history.push(`/service/${serviceCode}`);
    }
    this.handleClickOutside();
  }
  render() {
    const {
      titleServiceType,
      current: {
        relationServices: service,
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
                  service.map(({ serviceIcon, serviceName, serviceCode }, i) =>
                    <li key={"xgfw_"+i} onClick={this.handlerClickService.bind(this, serviceCode)}>
                      <div className={serviceIcon}>
                        <img src={serviceIcon} className={uf_service} />
                      </div>
                      <span className={serviceName} title={serviceName}>{getStrLenSubstr(serviceName,4,10)}</span>
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
