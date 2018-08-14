import React, {Component} from 'react';
import {connect} from 'react-redux';
import {mapStateToProps} from '@u';
import PopDialog from 'pub-comp/pop';
import rootActions from 'store/root/actions';
import {titleStyle} from './style.css'

const {showDialog, closeDialogNew} = rootActions;

@connect(
  mapStateToProps(
    'showModal',
    'dialogType',
    'dialogTitle',
    'dialogMsg'
  ),
  {
    showDialog,
    closeDialogNew
  }
)
class PopDialogComp extends Component {

  render() {
    const {dialogType, dialogMsg, dialogTitle, showModal, closeDialogNew} = this.props;
    let btnLabel = "OK";
    let _btn = [
      {
        label: btnLabel,
        fun: () => {
          closeDialogNew();
        },
        type: dialogType === "success" ? null : dialogType,
        className: 'basic_dialog_modal u-button'
      }
    ];
    const title = <span className={titleStyle}>{dialogTitle}</span>
    return (
      <PopDialog
        className="basic_dialog_modal"
        type={dialogType}
        backdrop={"static"}
        show={showModal}
        title={title}
        backup={false}
        close={closeDialogNew}
        btns={_btn}
      >
        <div className="content_div"><p className="content_p">{dialogMsg}</p></div>
      </PopDialog>
    )
  }
}

export default PopDialogComp;
