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
        <span>Please choose the enterprise/team you want to join:</span>
        <DropdownButton
          marginLeft={-187}
          getPopupContainer={() => document.getElementById("open_select")}
          lastIem={true}
          label="Please choose an enterprise/team" type="home" dataItem={_dataItem} />
      </div>
    )
  }
}
export default SelectEnter;
