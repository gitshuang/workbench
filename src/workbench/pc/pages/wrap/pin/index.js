import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
import wrapActions from 'store/root/wrap/actions';
import homeActions from 'store/root/home/actions';
/*  comp */
import MoveToGroup from 'pub-comp/moveToGroup';
import LanguagesJSON from 'yutils/languages';
import { pin } from './style.css';


const { getWorkList } = homeActions;
const {
  requestStart,
  requestSuccess,
  requestError,
} = rootActions;
const {
  closePin,
  setFolders,
  addFolders,
} = wrapActions;
@connect(
  mapStateToProps(
    'currItem',
    'folders',
    'pinDisplay',
    {
      namespace: 'wrap',
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    closePin,
    setFolders,
    addFolders,
    getWorkList,
  }
)
@onClickOutside
class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  handleClickOutside(evt) {
    const { closePin, pinDisplay } = this.props;
    if (pinDisplay) {
      closePin();
    }
  }

  confirmFn = (parentId) => {
    const {
      currItem: {
        title,
        id: serviceCode,
      },
      setFolders,
      requestStart,
      requestSuccess,
      requestError,
      getWorkList,
    } = this.props;
    requestStart();
    setFolders(
      serviceCode,
      title,
      parentId,
    ).then(({ error, payload }) => {
      debugger
      if (error) {
        requestError(payload);
      }
      this.cancelFn();
      getWorkList();
      requestSuccess();
    });
  }

  cancelFn = () => {
    const { closePin } = this.props;
    closePin();
  }

  addFolders = (name) => {

    const {
      addFolders,
      requestError,
    } = this.props;
    return addFolders(name).then((action) => {
      const { error, payload } = action;
      if (error) {
        requestError(payload);
      }
      return action;
    });
  }

  render() {
    const { folders } = this.props;
    const content = (
      <div className={`um-css3-hc ${pin}`} >
        <MoveToGroup
          data={folders}
          onSave={this.confirmFn}
          onCancel={this.cancelFn}
          onAddGroup={this.addFolders}
          caller={LanguagesJSON.add}
          languagesJSON={LanguagesJSON}
        />
      </div>
    );

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
