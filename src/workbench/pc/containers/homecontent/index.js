import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import RouteWithSubRoutes from 'pub-comp/routeWithSubRoutes';

@connect(
  mapStateToProps(
    'userInfo',
  ),
  {
    
  },
)
class Homecontent extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }


  renderActive = (item) => {
    const {
      id,
      type,
      url,
      title,
    } = item;
  }


  rendercontent = () => {
    const { tabs } = this.props;
    if (tabs && tabs.length) {
      return tabs.map((item, index) => {
        return (
          <div className={box}>
            {context}
          </div>
        )
      });
    }
    return null;
  }

  render() {
    const { tabs, routes } = this.props;
    const flag = tabs && tabs.length ? 0 : 1;
    return (

      <div>
        {/* {this.rendercontent()} */}
        <div style={{ opacity: flag }}>
          {
            routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))
          }
        </div>
      </div>
    );
  }
}
export default Homecontent;

