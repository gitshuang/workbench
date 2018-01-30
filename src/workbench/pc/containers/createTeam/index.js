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
    const value = e.target.value;
    if( value.length > 60 ){
      alert("123");
      return false;
    }
    this.setState({
      value
    })
  }

  imgChange = () => {}

  render() {
    return (
      <div className={wrap}>
        <h5>创建团队</h5>  
        <div className="um-box">
          <label>团队名称<span>*</span>：</label> 
          <input
            className="um-bf1"
            placeholder="最多60个字符"
            value={this.state.value}
            onChange={(e)=>{this.onChange(e)}}
          />
        </div>
        <div className="um-box">
          <label>团队头像：</label>
          <div>
            <img id="imgSrc" />
            <input type="file" onChange={this.imgChange} />
          </div>
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
