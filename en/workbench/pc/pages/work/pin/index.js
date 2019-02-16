import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  comp */
import MoveToGroup from 'pub-comp/moveToGroup';
import Icon from 'pub-comp/icon';
import LanguagesJSON from 'yutils/languages';
/*  style */
import {
  pin,
  header,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { pinDisplayNone, setPinAdd, setAddGroup, getPinGroup } = workActions;

@connect(
  mapStateToProps(
    'pinDisplay',
    'current',
    'pinGroup',
    {
      "namespace": "work"
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    pinDisplayNone,
    setPinAdd,
    setAddGroup,
    getPinGroup
  }
)
@onClickOutside
class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuData: []
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const {
      pinGroup
    } = nextProps;
    this.setState({
      menuData: pinGroup,
    });
  }

  handleClickOutside(evt) {
    const { pinDisplayNone, pinDisplay } = this.props;
    if (pinDisplay) {
      pinDisplayNone();
    }
  }
  confirmFn = (parentId) => {
    const {
      current: {
        title,
        serviceCode,
      },
      setPinAdd,
      requestStart,
      requestSuccess,
      requestError,
    } = this.props;
    requestStart();
    setPinAdd(
      serviceCode,
      title,
      parentId,
    ).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      this.cancelFn();
      requestSuccess();
    });
  }

  cancelFn = () => {
    const { pinDisplayNone } = this.props;
    pinDisplayNone();
  }
  /*  menu  方法汇总   */

  /*  下三个方法为  添加新组  method  */
  addNewGroup = (name) => {
    const {
      setAddGroup,
      requestStart,
      requestSuccess,
      requestError,
    } = this.props;
    requestStart()
    return setAddGroup(name).then((action) => {
      const { error, payload } = action;
      if (error) {
        requestError(payload);
      } else {
        this.setState({
          menuData: [...this.state.menuData, {
            ...payload,
            widgetName: name,
            children: [],
          }],
        });
      }
      requestSuccess();
      return action;
    });
  }

  render() {
    const { pinDisplay } = this.props;
    const content = pinDisplay ? (
      <div className={`${pin} um-css3-hc`} >
        <div className={`${header} um-box`}>
          <div>
            <Icon type="yy-clud"></Icon>
          </div>
          <p></p>
        </div>
        <MoveToGroup
          data={this.state.menuData}
          onSave={this.confirmFn}
          onCancel={this.cancelFn}
          onAddGroup={this.addNewGroup}
          caller={LanguagesJSON.add}
          languagesJSON={LanguagesJSON}
        />
      </div>
    ) : null;

    return (
      <TransitionGroup>
        <CSSTransitionGroup
          transitionName={{
            enter: 'animated',
            enterActive: 'fadeIn',
            leave: 'animated',
            leaveActive: 'fadeOut',
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300} >
          {content}
        </CSSTransitionGroup>
      </TransitionGroup>
    );
  }
}

export default Pin;