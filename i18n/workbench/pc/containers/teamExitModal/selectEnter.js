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

    let _dataItem = [];
    allowTenants.forEach(({ tenantId: name, tenantName: value, type }) => {
      if (company != value) {
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
        <span>$i18n{selectEnter.js0}$i18n-end/$i18n{selectEnter.js1}$i18n-end:</span>
        <DropdownButton
          marginLeft={-187}
          getPopupContainer={() => document.getElementById("open_select")}
          lastIem={true}
          label="$i18n{selectEnter.js2}$i18n-end/$i18n{selectEnter.js3}$i18n-end" type="home" dataItem={_dataItem} />
      </div>
    )
  }
}
export default SelectEnter;
