import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';

import { Pages } from 'router';

import Homeheader from './homeheader';
import Iframe from 'components/iframe';

@withRouter
@connect(
  mapStateToProps(
    'tabs',
    'activeCarrier',
  ),
  {

  },
)
class Wrap extends Component {
  static propTypes = {
    tabs: PropTypes.array,
  };
  static defaultProps = {
    tabs: [],
  };
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

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


  rendercontent = () => {
    const { tabs, activeCarrier } = this.props;
    if (tabs && tabs.length) {
      return tabs.map(item => {
        const dis = item.id === activeCarrier ? 'block' : 'none';
        return (
          <div className='' style={{ display: dis }} key={item.id}>
            {this.renderActive(item)}
          </div>
        )
      });
    }
    return null;
  }

  render() {
    const { activeCarrier, routes } = this.props;
    return (
      <div className='um-win'>
        <Homeheader />
        <div className='content'>
          {
            this.rendercontent()
          }
        </div>
        {
          activeCarrier === 'home'
            ?
            routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))
            : null
        }
      </div>
    );
  }
}
export default Wrap;

