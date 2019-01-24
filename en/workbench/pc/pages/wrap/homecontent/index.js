import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import { Pages } from 'router';
import Iframe from 'components/iframe';

@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
    {
      namespace: 'wrap',
    }
  ),
  {},
)
class Homecontent extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    activeCarrier: PropTypes.string,
  };
  static defaultProps = {
    tabs: [],
    activeCarrier: '',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderActive = (item) => {
    const {
      id,
      type,
      url,
      title,
    } = item;
    if (type === "service") {
      return <Iframe id={id} title={title} url={url} />
    }
    const component = Pages[url];
    return component;
  }

  render() {
    const { activeCarrier, tabs } = this.props;
    return (
      <div>
        {
          tabs.map(item => {
            const dis = item.id === activeCarrier ? 'block' : 'none';
            return (
              <div style={{ display: dis }} key={item.id}>
                {this.renderActive(item)}
              </div>
            )
          })
        }
      </div>
    );
  }
}
export default Homecontent;

