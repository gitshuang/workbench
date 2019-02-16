import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { withRouter } from 'react-router-dom';

import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';

import Form, { FormItem } from 'bee/form';
import Upload from 'components/upload';
import FormControl from 'bee/form-control';
import Radio from 'bee/radio';
import Select from 'bee/select';
import { ButtonBrand } from 'pub-comp/button';
import { openMess } from 'pub-comp/notification';

import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import 'assets/style/Form.css';
import { enter_form, lxr_hr, team_cont, form_team } from './createTeam.css';


const { requestStart, requestSuccess, requestError } = rootActions;
const {
  getTeamInfo,
  createTeam,
} = teamconfigActions;

class SubmitBtn extends Component {
  click = (e) => {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
  }
  render() {
    return (
      <div className={'u-form-submit'}>
        {
          this.props.disabled
            ?
            <ButtonBrand onClick={(e) => { this.click(e) }} >保存</ButtonBrand>
            :
            <ButtonBrand disabled={true} >保存</ButtonBrand>
        }
      </div>
    );
  }
}

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    getTeamInfo,            // 获取团队基础信息
    createTeam,             // 保存团队基本设置
  }
)
class CreateTeam extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      isWaterMark: 1,
      errorType: false,
    }
  }

  componentWillMount() {
    const { getTeamInfo, requestError, requestSuccess } = this.props;
    getTeamInfo().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.setState({
        ...payload
      });
      requestSuccess();
    });
  }

  clickFn = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('校验失败', values);
      } else {
        this.checkForm(values);
      }
    });
  }

  checkForm = (data) => {
    const { logo, tenantId } = this.state;
    const { createTeam, changeTenantName } = this.props;
    this.setState({
      disabled: false
    });
    data.tenantId = tenantId;
    data.logo = logo;
    requestStart();
    createTeam(data).then(({ error, payload }) => {
      this.setState({ disabled: true });
      if (error) {
        requestError(payload);
        return;
      }
      // 改变当前页面上边的团队名称
      changeTenantName(payload.tenantName);
      // 重新拉取userinfo 
      dispatchMessageTypeHandler({
        type: 'refreshUserInfo',
      });
      requestSuccess();
      openMess({
        title: '保存成功',
        duration: 2,
        type: 'success',
        closable: false,
      });
    });
  }

  onChangeUpload = (url) => {
    this.setState({
      logo: url
    })
  }

  render() {
    const { tenantName, logo, allowExit, isWaterMark, invitePermission, joinPermission } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    const _this = this;
    return (
      <div className={team_cont}>

        <div className={form_team}>
          <Form submitCallBack={this.checkForm} showSubmit={false} className={enter_form}>
            <FormItem>
              <label><span>团队名称<font color='red'> &nbsp;*&nbsp;</font></span></label>
              <FormControl
                name="tenantName"
                value={tenantName || ""}
                onChange={(e) => { this.inputOnChange(e, "tenantName") }}
                placeholder="最多60个字符"
                {...getFieldProps('tenantName', {
                  validateTrigger: 'onBlur',
                  initialValue: tenantName,
                  rules: [{ required: true, message: "请输入团队名称", }],
                })}
              />
              <span className='error'>
                {getFieldError('tenantName')}
              </span>
            </FormItem>

            <FormItem >
              <label><span>团队头像<font color='red'> &nbsp; &nbsp;</font></span></label>
              <div style={{ float: "left" }}>
                <Upload name='logo' logo={logo || ""} onChange={this.onChangeUpload} />
              </div>
            </FormItem>

            <FormItem>
              <label><span>邀请规则<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Select
                style={{ width: 338, marginRight: 6 }}
                {
                ...getFieldProps('invitePermission', {
                  initialValue: invitePermission || '1',
                  rules: [{ required: true }]
                })
                }
              >
                <Option value="1">全员邀请</Option>
                <Option value="2">禁止邀请</Option>
                <Option value="0">管理员邀请</Option>
              </Select>
            </FormItem>

            <FormItem>
              <label><span>申请权限<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Select
                style={{ width: 338, marginRight: 6 }}
                {
                ...getFieldProps('joinPermission', {
                  initialValue: joinPermission || '1',
                  rules: [{ required: true }]
                })
                }
              >
                <Option value="0">允许 </Option>
                <Option value="1">禁止</Option>
              </Select>
            </FormItem>

            <FormItem>
              <label><span>允许用户退出<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Radio.RadioGroup
                name="allowExit"
                selectedValue={allowExit || '0'}
                {
                ...getFieldProps('allowExit', {
                  initialValue: allowExit || '0',
                  onChange(value) {
                    _this.setState({ allowExit: value });
                  },
                  rules: [{ required: true }]
                })
                }
              >
                <Radio value="0" >禁止</Radio>
                <Radio value="1" >允许</Radio>
              </Radio.RadioGroup>
            </FormItem>

            <FormItem>
              <label><span>通讯录显示水印<font color='red'>&nbsp;*&nbsp;</font></span></label>
              <Radio.RadioGroup
                name="isWaterMark"
                selectedValue={isWaterMark}
                {
                ...getFieldProps('isWaterMark', {
                  initialValue: isWaterMark,
                  onChange(value) {
                    _this.setState({ isWaterMark: value });
                  },
                  rules: [{ required: true }]
                })
                }
              >
                <Radio value={0} >禁止</Radio>
                <Radio value={1} >允许</Radio>
              </Radio.RadioGroup>
            </FormItem>
            <SubmitBtn
              isSubmit
              disabled={this.state.disabled}
              onClick={this.clickFn}
            />
          </Form>
        </div>

        <div className={lxr_hr}>
          <hr />
        </div>
      </div>
    );
  }
}

export default Form.createForm()(CreateTeam);