import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { content, contentArea, active,load } from './style.css';
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
      isReady: false
    }
    this.t = null;
  }

  componentWillReceiveProps(nextProps){
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
    if(typeChange || codeChange || subcodeChange){
      clearTimeout(this.t);
      this.setState({
        isReady: false
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
    const { getPinGroup } = this.props;
    this.t = setTimeout( ()=>{
      this.setState({
        isReady: true
      });
    },100);
    getPinGroup();
  }


  renderHtml() {
    const { hasTab, current, tabs, type, menus } = this.props;
    if (type === 4) {
      return (
        <div className={`${content} ${active}`}>
          <FinanceCloudContent
            onLoad={this.getPinGroup}
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
            <IFrame onLoad={this.getPinGroup} title={id} url={location} />
          </div>
        )
      })
    } else {
      return (
        <div className={`${content} ${active}`} >
          <IFrame onLoad={this.getPinGroup} title={current.menuItemId} url={current.url} />
        </div>
      );
    }
  }

  render() {
    return (
      <div className={contentArea}>
        {this.renderHtml()}
        {
          !this.state.isReady ? 
          <div className={load}>
            <div>
              <img src={loading}  />
              <p>加载中...</p>
            </div>
          </div>
          : null
        }
        
      </div>
    )
  }
}

export default ContentContainer;
