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
  services
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
    'titleService', {
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
class QuickServiceContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      service: [],
      contacts: []
    }
  }

  componentDidMount() {
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
          service: payload.service,
          contacts: payload.contacts
        });
        requestSuccess();
      }
    });
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
              this.state.service.map((item, i) =>
                <li key={i}>
                  <div className={serviceIcon}>
                    <Icon type="uf-cloud-o" className={uf}></Icon>
                  </div>
                  <span className={serviceName}>服务名称</span>
                </li>
              )
            }
          </ul>
        </div>
        <div className="">
          <h4>相关联系人</h4>
          <ul className="clearfix">
            {
              this.state.contacts.map((item, i) =>
                <li key={i}>
                  <div className="serviceIcon">
                    <Icon type="uf-cloud-o" className={uf}></Icon>  
                  </div> 
                  <span className={serviceName}>人名</span>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                </li>
              )
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default QuickServiceContainer;