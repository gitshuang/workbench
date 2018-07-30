import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamActions from 'store/root/team/actions';

import Button from 'bee/button';
import Progress from 'pub-comp/progress';

import Upload from 'containers/upload';
import { check } from './checkTenantStatus'

const { requestStart, requestSuccess, requestError } = rootActions;
const { createTeam } = teamActions;
import {
  wrap,
  create_team_cont,
  item,
  name_error,
  upload,
  footer,
  footer_hr,
  process_loading_content,
  opacityHidden,
  opacityShow,
  submit_class,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    createTeam,
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      logo: "",
      disabled: false,
      error: false,
      processValue: 0,//0表示未开始，1表示开始progress
      tenantId: '',//tenantId
    }
    //progressbar
    this.loadingFunc = null;
    this.successFunc = null;
    this.timer = null;
  }

  componentWillMount() {

  }

  onChange = (e) => {
    const value = e.target.value;
    if (value.length > 60 || value == "") {
      this.setState({
        value,
        error: true
      });
      return false;
    }
    this.setState({
      value,
      error: false
    })
  }

  setUrl(name, url) {
    this.state[name] = url;
    this.setState({
      ...this.state
    })
  }

  create = () => {
    const { createTeam, requestStart, requestSuccess, requestError } = this.props;
    const { value, logo } = this.state;
    if (!value || value === "") {
      this.setState({
        error: true
      });
      return false;
    }
    let data = {
      tenantName: value
    };
    if (logo) {
      data.logo = logo;
    }
    this.setState({
      disabled: false
    });
    requestStart();
    createTeam(data).then(({ error, payload }) => {
      this.setState({
        disabled: true,
        processValue: 1,//开始progressbar
      });
      if (error) {
        requestError(payload);
        return;
      }
      requestSuccess();
      const tenantId = payload.tenantId;
      localStorage.setItem('create', "1");

      this.setState({ tenantId: tenantId }, () => {
        clearInterval(this.timer);
        check(tenantId, this.loadingFunc, this.successFunc);
      });//把processValue变成1.那么就开是走progress
    });
  }
  successLoading = () => {
    const { tenantId } = this.state;
    window.location.href = `/?tenantId=${tenantId}&switch=true`;
  }

  loadingCallBack = (loadingFunc, successFunc) => {
    this.timer = setInterval(loadingFunc, 500);
    this.loadingFunc = loadingFunc;
    this.successFunc = successFunc;
  }

  render() {
    const { logo, value, disabled, error } = this.state;
    let now = this.state.processValue;
    const nameBH = error ? 'block' : 'none';
    return (
      <div className={wrap}>
        <h5>创建团队</h5>
        <hr />
        <div className={create_team_cont}>
          <div className={item + " um-box "}>
            <label>团队名称<span>&nbsp;*&nbsp;</span></label>
            <input
              className="u-form-control"
              placeholder="最多60个字符"
              value={value}
              onChange={(e) => { this.onChange(e) }}
            />
          </div>
          <div className={`${name_error}`} style={{ display: nameBH }}>
            请输入团队名称
          </div>

          <div className={`${item} um-box ${upload}`}>
            <label>团队头像&nbsp; &nbsp; </label>
            <div>
              <Upload
                name='logo'
                logo={logo ? logo : ""}
                onChange={(e) => { this.setUrl("logo", e) }}
                tip=''
              />
            </div>
          </div>
        </div>
        <hr className={footer_hr} />
        <div className={footer}>
          <div className={now ? `${process_loading_content} ${opacityShow}` : process_loading_content}>
            <Progress loadingCallBack={this.loadingCallBack} startFlag={now} successFunc={this.successLoading} loadingDesc={'正在配置团队信息…'} />
          </div>
          <Button className={`${now ? opacityHidden : ''} ${submit_class}`} onClick={this.create} disabled={disabled} >创建</Button>
        </div>
      </div>
    )
  }
}

export default CreateTeamContent;
