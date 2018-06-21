import React, { Component } from 'react';
import Select from 'bee/select';

import { language } from './style.css';

class Language extends Component {
  
  handleChange = (value) => {
    const { onChangeLanguage } = this.props;
    onChangeLanguage(value);
  }

  render() {
    const { defaultValue, languageList } = this.props;
    return(
      <div className={language}>
        <Select
          defaultValue={defaultValue}
          onChange={this.handleChange}
          dropdownClassName={"gnoreclass"}
          style={{width:"110px"}}
        >
        {
          languageList.map((item,index)=>{
            return (
              <Option value={item.value} key={index}>{item.context}</Option>
            )
          })
        }
        </Select>
      </div>
    )
  }
}

export default Language;
