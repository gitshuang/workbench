import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content, contentArea, active } from './style.css';
import IFrame from 'components/iframe';

function appendSearchParam(url, params) {
  if (url) {
    var urlObj = new URL(url);
    Object.keys(params).forEach((name) => {
      urlObj.searchParams.append(name, params[name]);
    });
    return urlObj.toString();
  }
  return url;
}

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
    const { hasTab, current: { menuItemId: currentId, url: currentLocation, serveCode: curServeCode }, tabs, menus } = this.props;

    if (hasTab) {
      return (
        <div className={contentArea} >
          {
            tabs.map(({ id, location, serveCode }) => (
              <div key={id} className={cs(
                content,
                {
                  [active]: currentId === id,
                }
              )} >
                <IFrame title={id} url={appendSearchParam(location, { serveCode })} />
              </div>
            ))
          }
        </div>
      );
    } else {
      return (
        <div className={contentArea} >
          <div className={`${content} ${active}`} >
            <IFrame title={currentId} url={appendSearchParam(currentLocation, { serveCode: curServeCode })} />
          </div>
        </div>
      );
    }
  }
}

export default ContentContainer;
