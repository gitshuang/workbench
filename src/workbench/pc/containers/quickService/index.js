import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { serviceContainer,service,serviceGroup,serviceBtn,contentDiv,content } from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';
import { withRouter } from 'react-router-dom';

const {changeQuickServiceHidden,} = actions;

@withRouter
@connect(mapStateToProps(
  'quickServiceDisplay',
  'quickServiceAnimate',
  'serviceList'
  ),
  {
    changeQuickServiceHidden,
  }
)
@onClickOutside
class QuickServiceContainer extends Component {

  handleClickOutside(evt) {
    const {changeQuickServiceHidden,quickServiceDisplay } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    }
  }

  openApplication = () => {
    console.log(this.props)
    const {changeQuickServiceHidden } = this.props;
    changeQuickServiceHidden();
    this.props.history.push('/application');;
  }

  render() {
    const { quickServiceDisplay,quickServiceAnimate, serviceList } = this.props;
    return (
      <div className={`${serviceContainer} ${quickServiceAnimate}`}>
      <div className={`${service} ` } >
        <div className={`${serviceGroup} `}>
          <h4>分组一</h4>
          <ul className="clearfix">
            {
              serviceList.map((service, i) => (
                <div className={contentDiv}><li key={i} >{service.name}</li><div className={content}>{service.name}</div></div>
              ))
            }
          </ul>
        </div>
        <div className={`${serviceGroup} `}>
          <h4>分组二</h4>
          <ul className="clearfix">
            {
              serviceList.map((service, i) => (
                <div className={contentDiv}><li key={i} >{service.name}</li><div className={content}>{service.name}</div></div>
              ))
            }
          </ul>
        </div>

      </div>
      <div className={`${serviceBtn} ` }><button className="btn" onClick={this.openApplication}>全部服务</button></div>
      </div>
    );
  }
}

export default QuickServiceContainer;
