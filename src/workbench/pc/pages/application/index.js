import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

import Header from 'containers/header';

const {requestStart, requestSuccess, requestError} = rootActions;
//const {changeUserInfoDisplay, getWidgetList, getWorkList} = homeActions;

@withRouter
@connect(
  ()=>({}),
  {
    requestStart,
    requestSuccess,
    requestError,
  }
)

class Application extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { requestStart, requestSuccess, requestError, } = this.props;
  }

  goBack() {
    this.props.history.replace('');
  }

  render() {
    return (
      <div className="um-win">
        <div className="um-header">
          <Header onLeftClick={ this.goBack.bind(this) } iconName={"back"} leftContent={"返回"}>
            <div position="center">
              <span>全部应用</span>
            </div>
          </Header>
        </div>
        <div className="um-content"></div>
      </div>
    );
  }
}

export default Application;
