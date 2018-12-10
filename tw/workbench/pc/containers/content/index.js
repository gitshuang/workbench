import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content, contentArea, active, load } from './style.css';
import IFrame from 'components/iframe';
import { withRouter } from 'react-router-dom';
import FinanceCloudContent from 'components/financeCloud'

import workActions from 'store/root/work/actions';
const { getPinGroup } = workActions;
import loading from 'assets/image/loading.gif';

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
  { getPinGroup }
)
class ContentContainer extends Component {
  static propTypes = {
    hasTab: PropTypes.bool,
    tabs: PropTypes.array,
    current: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      time: false,
    }
    this.t = null;
  }

  componentDidMount() {
    this.setTime();
  }

  setTime = () => {
    clearTimeout(this.t);
    this.t = null;
    this.t = setTimeout(() => {
      if (!this.state.time) {
        this.setState({
          time: true
        });
      }
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    const {
      match: {
        params: {
          code: newCode,
          type: newType,
          subcode: newSubcode,
        },
      },
    } = nextProps;
    const {
      match: {
        params: {
          code: oldCode,
          type: oldType,
          subcode: oldSubcode,
        },
      },
    } = this.props;
    // 判断新旧type true为变化诶
    const typeChange = newType !== oldType;
    const codeChange = newCode !== oldCode;
    const subcodeChange = newSubcode !== oldSubcode;
    if (typeChange || codeChange || subcodeChange) {
      this.setState({
        isReady: false,
        time: false,
      },()=>{
        this.setTime();
      });
    }
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
    history.replace(`/${type}/${code}/${serviceCode}`);
  }

  getPinGroup = () => {
    const { getPinGroup, current } = this.props;
    if (!current.url) return false;
    this.setState({
      isReady: true,
      time: false
    });
    getPinGroup();
  }


  renderHtml() {
    const { hasTab, current, tabs, type, menus } = this.props;
    const { isReady, time } = this.state;
    if (type === 4) {
      return (
        <div className={`${content} ${active}`}>
          <FinanceCloudContent
            onLoad={getPinGroup}
            env={process.env.NODE_ENV}
            current={{ ...current, extendDesc: current.ext1 }}
            menuItems={menus}
            updateCurrent={this.updateCurrent}
          />
        </div>
      );
    }
    if (hasTab) {
      return tabs.map(({ id, location }) => {
        return (
          <div key={id} className={cs(
            content,
            {
              [active]: current.menuItemId === id,
            }
          )}>
            <IFrame onLoad={getPinGroup} title={id} url={location} />
          </div>
        )
      })
    } else {
      return (
        <div className={`${content} ${active}`} >
          <IFrame onLoad={this.getPinGroup} title={current.menuItemId} url={current.url} />
          {
            !isReady && time ?
              <div className={load}>
                <div>
                  <img src={loading} />
                  <p>加載中...</p>
                </div>
              </div>
              : null
          }
        </div>
      );
    }
  }

  render() {
    return (
      <div className={contentArea}>
        {this.renderHtml()}
      </div>
    )
  }
}

export default ContentContainer;
