import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import teamconfigActions from 'store/root/teamconfig/actions'; 
const { exitTeam, closeExitModal } = teamconfigActions; 
import PopDialog from 'components/pop';
import {content} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    }
  ),
  {
    exitTeam,
    closeExitModal
  }
)
class SelectEnter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {

  }
 
  render() { 
    return (
       <div></div>
    )
  }
}
export default SelectEnter;
