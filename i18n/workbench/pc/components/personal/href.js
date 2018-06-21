import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Href extends Component {
  static propTypes = {
    hrefs: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    hrefs: [],
  };
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { hrefs } = this.props;
    const list = hrefs.map((item, index) => <a href={item.href} key={index} target="_blank">{item.name}</a>);
    return (
      <div>{list}</div>
    );
  }
}

export default Href;
