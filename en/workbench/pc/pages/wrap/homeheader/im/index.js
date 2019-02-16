import React, { Component, } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps, } from '@u';
import Icon from 'pub-comp/icon';

import actions from 'store/root/actions';
import { im } from './style.css';

const {
    showIm,
    hideIm,
} = actions;

@connect(
    mapStateToProps(
        'messageType',
        'imShowed',
    ),
    {
        showIm,
        hideIm,
    }
)
class Im extends Component {
    static propTypes = {
        messageType: PropTypes.bool,
        imShowed: PropTypes.bool,
        showIm: PropTypes.func,
        hideIm: PropTypes.func,
    }

    static defaultProps = {
        messageType: true,
        imShowed: false,
        showIm: () => { },
        hideIm: () => { },
    }

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.refs.IM.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
    }

    toggleIM = (e) => {
        e.stopPropagation();
        const {
            imShowed,
            showIm,
            hideIm,
        } = this.props;
        if (imShowed) {
            hideIm();
        } else {
            showIm();
        }
    }

    render() {
        const { messageType, imShowed, classname} = this.props;
        const imClass = imShowed ? "active tc" : "tc";
        return (
            <div ref="IM" className={`${imClass} ${im} ${classname}`} onClick={this.toggleIM}>
                <Icon title="" type="news" />
                <span className="CircleDot" style={{ display: messageType ? 'block' : 'none' }}></span>
            </div>
        );
    }
}

export default Im;
