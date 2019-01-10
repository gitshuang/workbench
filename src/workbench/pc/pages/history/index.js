import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import HistoryInner from './historyInner';
import { historyPart} from './style.css';
class History extends Component {
  
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  handleClickOutside() {
    this.props.openHistory()
  }

  render() {
    return (
      <div className={historyPart}>
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: `fadeInLeft`,
              leave: 'animated',
              leaveActive: `fadeOutLeft`,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {this.props.historyShow && 
              <HistoryInner outsideClickIgnoreClass='diworkiconfont' openHistory={this.props.openHistory} >
                
              </HistoryInner>
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    )

  }
}
export default History;

