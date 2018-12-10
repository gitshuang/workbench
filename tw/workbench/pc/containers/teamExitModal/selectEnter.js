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
        <span>請選擇想要進入的企業/團隊:</span>
        <DropdownButton
          marginLeft={-187}
          getPopupContainer={() => document.getElementById("open_select")}
          lastIem={true}
          label="請選擇企業/團隊" type="home" dataItem={_dataItem} />
      </div>
    )
  }
}
export default SelectEnter;
