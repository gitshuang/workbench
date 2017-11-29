import React, {
  Component,
  Children,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';
import {
  connect
} from 'react-redux';
import {
  mapStateToProps
} from '@u';
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';
import Icon from 'bee-icon';
import {
  title,
  uf,
  serviceName,
  serviceIcon,
  services,
  uf_name,
  uf_service
} from './style.css';
const {
  requestStart,
  requestSuccess,
  requestError
} = rootActions;
const {
  titleServiceHidden,
  getTitleService
} = workActions;

@connect(mapStateToProps(
    'titleServiceType',
    {
      "namespace": "work"
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    titleServiceHidden,
    getTitleService
  }
)
@onClickOutside
class titleServiceContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      service: [],
      contacts: []
    }
  }
  componentWillReceiveProps({titleServiceType}) {
    if (titleServiceType && !this.state.loaded) {
      const {
        requestStart,
        requestSuccess,
        requestError,
        getTitleService
      } = this.props;
      getTitleService().then(({
        error,
        payload
      }) => {
        if (error) {
          requestError(payload);
        } else {
          this.setState({
            loaded: true,
            service: payload.relationServes,
            contacts: payload.relationUsers
          });
          requestSuccess();
        }
      });
    }
  }
  handleClickOutside(evt) {
    const {
      titleServiceHidden,
      titleServiceType
    } = this.props;
    if (titleServiceType) {
      titleServiceHidden();
    }
  }
  render() {
    const {
      titleServiceType
    } = this.props;
    return (
      <div className={title + ' um-css3-hc'} style={{ display: titleServiceType ? 'block' : 'none' }} >
        <div className={services}>
          <h4>相关服务</h4>
          <ul className="clearfix">
            {
              this.state.service.map(({ serveIcon, serveName }, i) =>
                <li key={i}>
                  <div className={serviceIcon}>
                    <img src={serveIcon} className={uf_service} />
                  </div>
                  <span className={serviceName}>{serveName}</span>
                </li>
              )
            }
          </ul>
        </div>
        <div className="">
          <h4>相关联系人</h4>
          <ul className="clearfix">
            {
              this.state.contacts.map(({ userAvator, userName }, i) =>
                <li key={i}>
                  <div className={serviceIcon}>
                    <img src={userAvator} className={uf_name} />
                  </div>
                  <span className={serviceName}>{userName}</span>
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default titleServiceContainer;
