import React, { PropTypes } from 'react';
import { Element } from 'react-scroll';
import { content } from './style.css';

const ElementsWrapper = ({
  children,
  items,
  style,
  className,
}) => (
  <div className={content}>
    {children.map((child, i) => (
      <Element style={style} className={className} name={items[i].target} key={i} >{child}</Element>
    ))}
  </div>
);

ElementsWrapper.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  style: PropTypes.shape({}),
  className: PropTypes.string,
  items: PropTypes.arrayOf(),
};
ElementsWrapper.defaultProps = {
  children: [],
  style: PropTypes.object,
  className: PropTypes.string,
  items: PropTypes.arrayOf(),
};

export default ElementsWrapper;
