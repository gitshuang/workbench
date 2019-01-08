import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
/*  comp */
import MoveToGroup from 'pub-comp/moveToGroup';
import LanguagesJSON from 'yutils/languages';
import { pin } from './style.css';
const {
  requestStart,
  requestSuccess,
  requestError,
  closePin,
  getFolders,
  setFolders,
  addFolders,
} = rootActions;

@connect(
  mapStateToProps(
    'currItem',
    'folders',
    'pinDisplay',
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    closePin,
    getFolders,
    setFolders,
    addFolders,
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
    } = this.props;
    requestStart();
    setFolders(
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
