import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import loginpageActions from 'store/root/loginpage/actions';
import rootActions from 'store/root/actions';

import Form from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import { texts } from 'yutils/entertext';
import {
  applyForm, applyBtn,
} from './style.css';
const FormItem = Form.FormItem;
const { applyService } = loginpageActions;
const { requestStart, requestSuccess, requestError } = rootActions;
const { Option } = Select;

@withRouter
@connect(
  mapStateToProps(
    'currLan',
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    applyService,
  },
)

class CreateEnter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      tenantIndustry: 'A',
      tenantSize: 'A',//staff的范围
      linkman: '',
      companyName: '',
      tenantTel: '',
      defaultValue: {
        province: '北京',
        city: '北京',
      }
    };
  }
  onChange = (obj) => {
    this.setState({
      defaultValue: {
        province: obj.province,
        city: obj.city,
      }
    })
  }

  submitService = () => {
    let {tenantIndustry , tenantSize, companyName, linkman,tenantTel} = this.props.form.getFieldsValue();
    const { applyService, requestStart, requestSuccess, requestError, } = this.props;
    if (tenantIndustry == '' || tenantSize == '' || companyName == '' || linkman == '' || tenantTel == '') {
      return false;
    }
    let param = {
      companyName: companyName,
      contactName: linkman,
      phoneNumber: tenantTel,
      trade: tenantIndustry,
      scale: tenantSize,
      province: this.province,
      city: this.city,
    }
    this.setState({ flag: true });
    requestStart()
    applyService(param).then(({ error, payload }) => {
      if (error) {
        this.setState({
          flag: false, // 可以再提交一次
        });
        requestError(payload);
        return;
      }
      this.setState({
        flag: false,
      });
      requestSuccess();
      window.location.reload();
    });

  }
  render() {
    const {
      flag //设置在提交请求的过程中不可再次提交
    } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    // let value =
    let {tenantIndustry , tenantSize, companyName, linkman,tenantTel} = this.props.form.getFieldsValue();
    let disabled = false;
    if (flag || tenantIndustry == '' || tenantSize == '' || companyName == '' || linkman == '' || tenantTel == '' || !(/^1[34578][0-9]{9}$/).test(tenantTel)) {
      disabled = true;
    }
    return (
      <div className="applyService">
        <Form className={applyForm} showSubmit={false}>
          <FormItem>
            <label><span>企业名称<font color="red">&nbsp;*&nbsp;</font></span></label>
            <FormControl
              name="companyName"
              value={companyName}
              className="companyInput"
              placeholder="请输入企业名称"
              {...getFieldProps('companyName', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: '请输入企业名称', }],
              })}
            />
            <span className='error'>
              {getFieldError('companyName')}
            </span>
          </FormItem>

          <FormItem>
            <label><span>{texts.tenantIndustryLabel}<font color="red">&nbsp;*&nbsp;</font></span></label>
            <Select
              name="tenantIndustry"
              {
              ...getFieldProps('tenantIndustry', {
                initialValue: tenantIndustry || 'A',
                rules: [{ required: true }]
              })
              }
            >
              {
                texts.tenantIndustry.map(({ label, value }) =>
                  <Select.Option key={value} value={value}>{label}</Select.Option>)
              }
            </Select>
          </FormItem>

          <FormItem>
            <label><span>{texts.tenantSizeLabel}<font color="red">&nbsp;*&nbsp;</font></span></label>
            <Select
              {
              ...getFieldProps('tenantSize', {
                initialValue: tenantSize || 'A',
                rules: [{ required: true }]
              })
              }
            >
              {
                texts.tenantSizeOption.map(({ label, value }) =>
                  <Select.Option key={`${value}`} value={value}>{label}</Select.Option>)
              }
            </Select>
          </FormItem>
          <FormItem>
            <label><span>{texts.addressLabel}&nbsp;&nbsp;</span></label>
            <CitySelect
              name="address"
              onChange={this.onChange}
              defaultValue={this.state.defaultValue}
              lang={this.props.currLan}
            />
          </FormItem>

          <FormItem>
            <label><span>{texts.linkmanLabel}<font color="red">&nbsp;*&nbsp;</font></span></label>
            <FormControl
              name="linkman"
              value={linkman || ''}
              placeholder={texts.linkmanError}
              className="linkman"
              {...getFieldProps('linkman', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: texts.linkmanError, }],
              })}
            />
            <span className='error'>
              {getFieldError('linkman')}
            </span>
          </FormItem>
          <FormItem>
            <label><span>{texts.tenantTelLabel}<font color="red">&nbsp;*&nbsp;</font></span></label>
            <FormControl
              name="tenantTel"
              value={linkman || ''}
              placeholder={texts.tenantTelPlace}
              className="tenantTel"
              {...getFieldProps('tenantTel', {
                validateTrigger: 'onBlur',
                rules: [{ required: true, message: texts.tenantTelPlace, },
                  {pattern:/^1[34578][0-9]{9}$/, message:texts.tenantTelError}],
              })}
            />
            <span className='error'>
              {getFieldError('tenantTel')}
            </span>
          </FormItem>

        </Form>
        {
          disabled ?
            <div className={`${applyBtn} disabled`} >Apply Now</div>
            :
            <div className={applyBtn} onClick={this.submitService}>Apply Now</div>
        }
      </div>
    );
  }
}
export default Form.createForm()(CreateEnter);
// export default CreateEnter;
