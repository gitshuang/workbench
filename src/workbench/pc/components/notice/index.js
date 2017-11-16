/* notice */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import Button from 'bee-button';
import { dispathMessageTypeHandler } from 'public/regMessageTypeHandler';
import "./index.css"

const defaultProps = {
  notice: 'notice',
  mode: 'dark',
  iconName: ''
};

const propTypes = {
  notice: PropTypes.string,
  iconName: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ])
}


class Notice extends Component {
  constructor(props, context) {
    super(props, context);
  }

  handClick(param) {
    const type = this.props.data.btns;
    dispathMessageTypeHandler(type[param].type);
  }

  render() {
    const {
      notice,
      data: {
        content,
        btns,
        icon
      },
    } = this.props;

    return (
      <div >
        <img src={icon}/>
        <p title={content}>{content}</p>
        {
          btns.map((btn, i) => (
            <Button  className={`${notice}Btn`} size="sm" onClick={ this.handClick.bind(this,i) } >{btn.typeBtn}</Button>
          ))
        }

        {/*<div className="hideAuto"><Icon type="xiaoxi" /></div>*/}
      </div>
    );
  }
}

Notice.propTypes = propTypes;
Notice.defaultProps = defaultProps;

export default Notice;
