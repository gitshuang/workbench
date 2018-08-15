import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import homeActions from 'store/root/home/actions';

import Form, { FormItem } from 'bee/form';
import FormControl from 'bee/form-control';
import Select from 'bee/select';
import CitySelect from 'bee/city-select';
import { openMess } from 'pub-comp/notification';
import 'assets/style/Form.css';
import {
  applyForm, applyBtn,
} from './style.css';

const { requestStart, requestSuccess, requestError } = rootActions;
const { setCreateEnter } = homeActions;
const { Option } = Select;

@withRouter
@connect(
  mapStateToProps(),
  {
    requestStart,
    requestSuccess,
    requestError,
    setCreateEnter,
  },
)
class CreateEnter extends Component {
  static propTypes = {
    userInfo: PropTypes.shape({
      userName: PropTypes.string,
      userEmail: PropTypes.string,
      userMobile: PropTypes.string,
    }),
    setCreateEnter: PropTypes.func,
    updateenter: PropTypes.string,
  };
  static defaultProps = {
    userInfo: {},
    setCreateEnter: () => { },
    updateenter: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      tenantIndustry: 'A',
      tenantSize:'A',//staff的范围
      linkman: '',
      companyname:'',
      tenantTel:'',
    };
    this.address = '北京|北京|东城区|';
  }

  onChange = (obj) => {
    this.address = obj.province + obj.city + obj.area;
    alert(this.address)
  }

  

  setOptherData = (obj) => {
    this.state[obj.name] = obj.value;
    this.setState({
      ...this.state,
    });
  }

  checkForm = (flag, data) => {
    const { setCreateEnter, updateenter, requestStart, requestSuccess, requestError, } = this.props;
    const { tenantIndustry } = this.state;

    const Address = data.find(da => da.name === 'address');
    const TenantAddress = data.find(da => da.name === 'tenantAddress');
    if (Address.value && Address.value !== '') {
      TenantAddress.value = `${Address.value.province}|${Address.value.city}|${Address.value.area}|${TenantAddress.value}`;
    } else {
      TenantAddress.value = this.address + TenantAddress.value;
    }

    const TenantIndustry = data.find(da => da.name === 'tenantIndustry');
    if (!TenantIndustry.value && TenantIndustry.value === '') {
      TenantIndustry.value = tenantIndustry;
    }
    // this.setState({tenantId:"tenantId",processValue:1});//测试用的，要注销
    if (flag) {
      this.setState({
        disabled: false,
      });
      requestStart();
      const argu1 = data.reduce((obj, { value, name }) => {
        if (name) {
          obj[name] = value;
        }
        return obj;
      }, {});
      setCreateEnter(argu1, updateenter).then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return;
        }
        requestSuccess();
        this.setState({
          disabled: true,
          processValue: 1,
        });
        const { tenantId } = payload;
        localStorage.setItem('create', '1');
      });
    }
  }
  
  inputOnChange = (e, name) => {
    this.state[name] = e;
    this.setState({
      ...this.state,
    });
  }

  submitService = () =>{
    let{tenantIndustry, tenantSize,companyname, linkman, tenantTel} = this.state;
    if(tenantIndustry== ''||tenantSize==''||companyname==''||linkman==''||tenantTel==''){
      openMess({
        content: '选项不可为空',
        duration: 2,
        type: 'warning',
        closable: false,
      });
    }

  }
  render() {
    const {
      tenantIndustry, tenantSize,companyname, linkman,  tenantTel,
    } = this.state;
    let disabled = false;
    if(tenantIndustry==''||tenantSize == ''|| companyname == '' || linkman == ''|| tenantTel=='' || !(/^1[34578][0-9]{9}$/).test(tenantTel)){
      disabled = true;
    }
    return (
      <div className="applyService">
        <Form submitCallBack={this.checkForm} showSubmit={false} className={applyForm}>
        <FormItem
            showMast={false}
            labelName={<span>企业名称</span>}
            isRequire
            valuePropsName="value"
            errorMessage="请输入企业名称"
            method="blur"
            inline
          >
            <FormControl ref={ref=>this.companyRef = ref}name="companyname" placeholder="请输入企业名称" value={companyname} onChange={(e) => { this.inputOnChange(e, 'companyname'); }} />
          </FormItem>
        
          <FormItem
            showMast={false}
            labelName={<span>行业</span>}
            isRequire
            valuePropsName="value"
            errorMessage="请选择所属行业"
            method="blur"
            inline
          >
            <Select
              defaultValue="-所属行业-"
              name="tenantIndustry"
              style={{width:'370px'}}
              onChange={(e) => { this.setOptherData({ name: 'tenantIndustry', value: e }); }}
            >
              <Option value="A">农、林、牧、渔业</Option>
              <Option value="B">采矿业</Option>
              <Option value="C">制造业</Option>
              <Option value="D">电力、热力、燃气及水的生产和供应业</Option>
              <Option value="S">环境和公共设施管理业、社会保障和社会组织</Option>
              <Option value="E">建筑业</Option>
              <Option value="G">交通运输、仓储业和邮政业</Option>
              <Option value="I">信息传输、计算机服务和软件业</Option>
              <Option value="F">批发和零售业</Option>
              <Option value="H">住宿、餐饮业</Option>
              <Option value="J">金融、保险业</Option>
              <Option value="K">房地产业</Option>
              <Option value="L">租赁和商务服务业</Option>
              <Option value="M">科学研究、技术服务和地质勘查业</Option>
              <Option value="N">水利、环境和公共设施管理业</Option>
              <Option value="O">居民服务和其他服务业</Option>
              <Option value="P">教育</Option>
              <Option value="Q">卫生、社会保障和社会服务业</Option>
              <Option value="R">文化、体育、娱乐业</Option>
              <Option value="T">国际组织</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>规模</span>}
            isRequire
            valuePropsName="value"
            errorMessage="请选择规模范围"
            method="blur"
            inline
          >
            <Select
              defaultValue="-规模范围-"
              name="tenantSize"
              style={{width:'370px'}}
              onChange={(e) => { this.setOptherData({ name: 'tenantSize', value: e }); }}
            >
              <Option value="A">0－50</Option>
              <Option value="B">51-100</Option>
              <Option value="C">101-200</Option>
              <Option value="D">201-500</Option>
              <Option value="E">501-1000</Option>
              <Option value="F">1001－2000</Option>
              <Option value="G">2000人</Option>
            </Select>
          </FormItem>

          <FormItem
            showMast={false}
            labelName={<span>所在省市</span>}
            isRequire={false}
            valuePropsName="value"
            errorMessage="请输入所在省市"
            method="blur"
            inline
          >
            <CitySelect name="address" onChange={this.onChange} />
          </FormItem>
          <FormItem
            showMast={false}
            labelName={<span>联系人</span>}
            isRequire
            valuePropsName="value"
            errorMessage="请输入联系人姓名"
            method="blur"
            inline
          >
            <FormControl name="linkman" placeholder="请输入联系人姓名" value={linkman} onChange={(e) => { this.inputOnChange(e, 'linkman'); }} />
          </FormItem>

          <FormItem
            className="input_phone"
            showMast={false}
            valuePropsName="value"
            labelName={<span>手机号</span>}
            isRequire
            method="blur"
            htmlType="tel"
            errorMessage="手机号格式错误"
            inline
          >
            <FormControl name="tenantTel" placeholder="请输入手机号" value={tenantTel} onChange={(e) => { this.inputOnChange(e, 'tenantTel'); }} />
          </FormItem>

        </Form>
        {
          disabled?
          <div className={`${applyBtn} disabled`} >立即申请</div>
          :
          <div className={applyBtn} onClick={this.submitService}>立即申请</div>

        }
            {/* <div className={applyBtn} onClick={this.submitService}>立即申请</div> */}
      </div>
    );
  }
}

export default CreateEnter;
