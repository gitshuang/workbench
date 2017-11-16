import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content, contentArea, active } from './style.css';

@connect(
  mapStateToProps(
    'tabs',
    'menus',
    'current',
    {
      namespace: 'work',
    },
  ),
)
class ContentContainer extends Component {
  static propTypes = {
    hasTab: PropTypes.bool,
    tabs: PropTypes.array,
    menus: PropTypes.array,
    current: PropTypes.object,
  }
  constructor(props) {
    super(props);
  }
  render() {
    const { hasTab, current: { id: currentId, location: currentLocation }, tabs, menus } = this.props;
    if (hasTab) {
      return (
        <div className={contentArea} >
          {
            tabs.map(({ id, location }) => (
              <div key={id} className={cs(
                content,
                {
                  [active]: currentId === id,
                }
              )} >
                <iframe title={id} src={location} />
              </div>
            ))
          }
        </div>
      );
    } else {
      return (
        <div className={contentArea} >
          <div className={content} >
            <iframe title={currentId} src={currentLocation} />
          </div>
        </div>
      );
    }
  }
}

export default ContentContainer;
