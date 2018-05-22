import React, { Component } from 'react';
import {
  dispatch,
} from 'tools';
import {
  search_service,
  h_icon,
  h_name,
  search_help,
} from './index.css';

class Service extends Component {
  goDetail(e){
    e.stopPropagation();
    const {
      data: item,
    } = this.props;
    let code = "", _type = "";
    if (item.serviceId) {
      code = item.serviceCode;
      _type = 1;
    } else {
      code = item.applicationCode;
      _type = 2;
    }
    dispatch('openService', {
      serviceCode: code,
      type: _type,
    });
  }
  render() {
    const {
      data: {
        serviceId,
        serviceIcon,
        applicationIcon,
        serviceName,
        applicationName,
      },
    } = this.props;
    return (
      <div className={search_service} onClick={this.goDetail}>
        <div className={h_icon}>
          <img src={serviceId ? serviceIcon : applicationIcon} />
        </div>
        <div className={h_name}>
          <p className={search_help}>
            <span
              dangerouslySetInnerHTML={
                { __html: serviceId ? serviceName : applicationName }
              } />
          </p>
        </div>
      </div>
    )
  }
}

export default Service;
