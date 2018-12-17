import React, { PropTypes } from 'react';
import { Element } from 'react-scroll';
import { content } from './style.css';

const ElementsWrapper = ({
  children,
  items,
  className,
}) => (
    <div className={content}>
      {children.map((child, i) => (
        <Element className={className} name={items[i].target} key={i} >{child}</Element>
      ))}
    </div>
  );

ElementsWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};
ElementsWrapper.defaultProps = {
  children: [],
  className: '',
  items: [],
};

export default ElementsWrapper;
