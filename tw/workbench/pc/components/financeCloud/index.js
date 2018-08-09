import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FinanceCloud from 'ficloud-workbench';
import 'ficloud-workbench/dist/ficloud-workbench.css';

class FinanceCloudComponents extends Component {
  static propTypes = {
    menuItems: PropTypes.array,
    current: PropTypes.object,
    updateCurrent: PropTypes.func
  }

  constructor(props) {
    super(props);
  }

  render() {
    const {menuItems, current, updateCurrent} = this.props;

    return (
      <FinanceCloud menuItems={menuItems} current={current} updateCurrent={updateCurrent}/>
    );
  }

}

export default FinanceCloudComponents;
