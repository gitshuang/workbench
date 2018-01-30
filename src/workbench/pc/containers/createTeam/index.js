import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl, Checkbox, Button } from 'tinper-bee';
import {
  wrap,
} from './index.css';

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    }
  }

  componentWillMount() {

  }

  onChange = (e) => {
    //const { value } = this.state;
    if( e > 59 ){
      alert("123");
      return false;
    }
    this.setState({
      value: e
    })
  }

  render() {
    return (
      <div className={wrap}>
        <h5>创建团队</h5>  
        <div className="um-box">
          <label>团队名称<span>*</span>：</label> 
          <FormControl
            className="um-bf1"
            placeholder="最多60个字符"
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <div className="um-box">
          <label>团队头像：</label>
          <img id="imgSrc" />
        </div>
        <div>
          <Checkbox colors="info">设置为默认登录团队</Checkbox>
        </div>
        <div>
          <Button>创建</Button>
        </div>
      </div>  
    )
  }
}

export default CreateTeamContent;
