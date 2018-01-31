import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';
import CreateEnter from './createEnter';
import { page_enterprise ,demo3} from './style.css';

const { getSearchTeamList } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'teamList',
    {
      namespace: 'home',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getSearchTeamList,
  }
)
class Enterprise extends Component {

  constructor(props) {
    super(props);
  } 
  
   render() {
    const {  teamList  } = this.props;

    return (
      <div className={page_enterprise}> 
        <CreateEnter />
      </div>
    );
  }
}
export default Enterprise;

