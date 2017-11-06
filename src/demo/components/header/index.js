import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { header, left, right } from './style.css'

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
  }
  render() {
    const { children, title } = this.props;
    return (
      <div className={header}>
        {
          Children.map(children, (child, i) => {
            const {
              props: {
                className,
                position,
              },
            } = child;
            let newClassName = '';
            if (position === 'right') {
              newClassName = className ? `${className} ${right}` : right;
            } else {
              newClassName = className ? `${className} ${left}` : left;
            }
            return cloneElement(child, { className: newClassName, key: i });
          })
        }
        { title }
      </div>
    );
  }
}

export default Header;
