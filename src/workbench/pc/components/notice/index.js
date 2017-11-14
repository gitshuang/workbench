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

  handClick() {
    const type = this.props.data.type;
    dispathMessageTypeHandler(type);
  }

  render() {
    const {
      notice,
      data: {
        content,
        typeBtn,
        icon
      },
    } = this.props;

    return (
      <div >
        <img src={icon}/>
        <p title={content}>{content}</p>
        <Button  className={`${notice}Btn`} size="sm" onClick={ this.handClick.bind(this) } >{typeBtn}</Button>
      </div>
    );
  }
}

Notice.propTypes = propTypes;
Notice.defaultProps = defaultProps;

export default Notice;
