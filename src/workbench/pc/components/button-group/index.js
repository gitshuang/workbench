import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { button_group } from './style.css'

class Header extends Component {

    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     children: PropTypes.node,
    // }

    render() {
        
        return (
            <div className={button_group} >
            </div>
        );
    }
}

export default Header;
