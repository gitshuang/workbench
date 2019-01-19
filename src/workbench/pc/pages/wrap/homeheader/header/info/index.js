import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';

import Icon from 'pub-comp/icon';
import InfoContent from './infoContent';
import { win, avator } from './info.css';

@connect(mapStateToProps('userInfo'), {})
class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDisplay: false,
        };
    }

    handerClick = () => {
        const { infoDisplay } = this.state;
        this.setState({
            infoDisplay: !infoDisplay,
        });
    }

    closeInfo = () => {
        this.setState({
            infoDisplay: false
        });
    }

    render() {
        const { userInfo: { userAvator } } = this.props;
        const { infoDisplay } = this.state;
        return (
            <div className={win}>
                <div className={`${avator} ignoreClass`} onClick={this.handerClick}>
                    {
                        userAvator
                            ? <img alt="" src={userAvator} />
                            : <Icon type="staff-solid" />
                    }
                </div>
                <CSSTransitionGroup
                    transitionName={{
                        enter: 'animated',
                        enterActive: `fadeInRight`,
                        leave: 'animated',
                        leaveActive: `fadeOutRight`,
                    }}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    {
                        infoDisplay
                            ?
                            <InfoContent
                                closeInfo={this.closeInfo}
                                outsideClickIgnoreClass={'ignoreClass'}
                            />
                            : null
                    }
                </CSSTransitionGroup>
            </div>
        )

    }
}
export default Info;

