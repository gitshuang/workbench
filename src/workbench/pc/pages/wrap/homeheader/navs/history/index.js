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
      <div className={historyPart} style={this.props.style}>
        <TransitionGroup>
          <CSSTransitionGroup
            transitionName={{
              enter: 'animated',
              enterActive: `fadeIn`,
              leave: 'animated',
              leaveActive: `fadeOut`,
            }}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {this.props.historyShow && 
              <HistoryInner 
                outsideClickIgnoreClass='ignoreClass-history' 
                openHistory={this.props.openHistory} 
              />
            }
          </CSSTransitionGroup>
        </TransitionGroup>
      </div>
    )

  }
}
export default History;

