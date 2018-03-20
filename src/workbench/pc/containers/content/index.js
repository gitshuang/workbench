import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content, contentArea, active } from './style.css';
import IFrame from 'components/iframe';


@connect(
  mapStateToProps(
    'tabs',
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
    current: PropTypes.object,
  }
  constructor(props) {
    super(props);
  }

  render() {
    const { hasTab, current: { menuItemId: currentId, url: currentLocation }, tabs } = this.props;

    if (hasTab) {
      return (
        <div className={contentArea} >
          {
            tabs.map(({ id, location }) => {
              return (
                <div key={id} className={cs(
                  content,
                  {
                    [active]: currentId === id,
                  }
                )} >
                  <IFrame title={id} url="http://localhost:3001" />
                </div>
              )}
            )
          }
        </div>
      );
    } else {
      return (
        <div className={contentArea} >
          <div className={`${content} ${active}`} >
            <IFrame title={currentId} url="http://localhost:3001" />
          </div>
        </div>
      );
    }
  }
}

export default ContentContainer;
