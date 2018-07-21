import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {connect} from 'react-redux';
import {mapStateToProps} from '@u';
import {content, contentArea, active} from './style.css';
import IFrame from 'components/iframe';
import {withRouter} from 'react-router-dom';
import FinanceCloudContent from 'components/financeCloud'

// import FinanceCloudContent from 'components/financeCloud/App'

@withRouter
@connect(
  mapStateToProps(
    'tabs',
    'current',
    'menus',
    'type',
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

  updateCurrent = (serviceCode) => {
    const {
      match: {
        params: {
          code,
          type
        },
      },
      history
    } = this.props;
    history.replace(`/${type}/${code}/${serviceCode}`)
  }

  render() {
    const {hasTab, current, tabs, type, menus} = this.props;
    console.log(JSON.stringify(current));
    if (type === 4) {
      return (<div className={contentArea}>
        <div className={`${content} ${active}`}>
          <FinanceCloudContent current={{...current, extendDesc: current.ext1}} menuItems={menus}
                               updateCurrent={this.updateCurrent}/>
        </div>
      </div>);
    }
    if (hasTab) {
      return (
        <div className={contentArea}>
          {
            tabs.map(({id, location}) => {
                return (
                  <div key={id} className={cs(
                    content,
                    {
                      [active]: current.menuItemId === id,
                    }
                  )}>
                    <IFrame title={id} url={location}/>
                  </div>
                )
              }
            )
          }
        </div>
      );
    } else {
      return (
        <div className={contentArea}>
          <div className={`${content} ${active}`}>
            <IFrame title={current.menuItemId} url={current.url}/>
          </div>
        </div>
      );
    }
  }
}

export default ContentContainer;
