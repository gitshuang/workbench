import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import DropdownButton from 'components/dropdown';

import { select_enter } from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
  }
)
class SelectEnter extends Component {

  constructor(props) {
    super(props);
  }

  changeTenant(tenantId) {
    const {
      location: {
        origin,
        pathname,
        hash,
      },
    } = window;
    window.location.replace(
      `${origin ? origin : ''}${pathname ? pathname : ''}?tenantId=${tenantId}&switch=true`,
    );
  }

  render() {
    const {
      userInfo: {
        logo,
        allowTenants,
        company,
      }
    } = this.props;
    let currentId = this.props.userInfo.currentTeamConfig.tenantId;
    let _dataItem = [];
    allowTenants.forEach(({ tenantId: name, tenantName: value, type }) => {
      // if (company != value) {
      if (currentId != name) {
        let obj = {
          name,
          value,
          type,
          fun: this.changeTenant,
        };
        _dataItem.push(obj);
      }
    })
    return (
      <div id="open_select" className={select_enter}>
        <span>请选择想要进入的企业/团队:</span>
        <DropdownButton
          marginLeft={-187}
          getPopupContainer={() => document.getElementById("open_select")}
          lastIem={true}
          label="请选择企业/团队" type="home" dataItem={_dataItem} />
      </div>
    )
  }
}
export default SelectEnter;
