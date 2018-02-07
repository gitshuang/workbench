import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';

import rootActions from 'store/root/actions';
import teamconfigActions from 'store/root/teamconfig/actions';

import TeamRemoveModal from 'containers/teamRemoveModal';
import TeamUpgradeModal from 'containers/teamUpgradeModal';


import { Checkbox, Button, Icon, Tabs, Dropdown, Menu, Radio, Select } from 'tinper-bee';
const { TabPane } = Tabs;
const { Item } = Menu;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

const { requestStart, requestSuccess, requestError } = rootActions;
const { 
  uploadApplication, 
  createTeam, 
  changeIdentity,
  openRemoveModal,
  closeRemoveModal, 
  openUpgradeModal, 
} = teamconfigActions;

import {
  wrap,
  header,
  content,
  box,
  box2,
  box3,
  item,
  image,
  footer,
  applicationBtns,
  active,
  applicationLists,
  memberBtns,
  memberLists,
} from './index.css';

@withRouter
@connect(
  mapStateToProps(
    'teamData',
    'removeModal',      //  团队成员删除弹窗开关
    'upgradeModal',     //  升级为企业弹窗开关
    {
      namespace: "teamconfig"
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    uploadApplication,      // 上传
    createTeam,             // 保存团队基本设置
    changeIdentity,         // 团队成员更换身份
    openRemoveModal,        // 团队成员打开删除弹窗
    openUpgradeModal,       // 打开升级为企业弹窗  
  }
)

class CreateTeamContent extends Component {
  constructor(props) {
    super(props);
    this.imgObj = {};
    this.state = {
      value: "",            // 基础设置团队名称
      imgWarning: "",       // 团队头像警告格式
      imgUrl: "",           //   基础设置  选择头像回显
      backUrl: "",          // 上传成功后返回的url
      selectedValue1: "0",  //搜索可见
      selectedValue2: "0",  //允许用户是否退出空间
      request: "all",       //邀请成员权限
      join: "allow",        //加入权限
      btnType: "web",       // 团队应用当前按钮
      deleteMemberId: "",   // 选择删除成员的ID

    }
  }

  componentWillMount() {
    this.queryUser();
    this.queryApplication();
    this.queryBasicConfig();
  }

  // 查询用户列表
  queryUser = () => {

  }

  // 查询团队应用
  queryApplication = () => {

  }

  // 查询基础设置
  queryBasicConfig = () => {

  }


  // 基础设置  输入框改变
  onChange = (e) => {
    const value = e.target.value;
    if (value.length > 60) {
      return false;
    }
    this.setState({
      value
    })
  }

  // 基础设置  图片更改
  imgChange = (e) => {
    if (e.target.value.trim().length === 0) {
      return false;
    }
    const { uploadApplication, requestStart, requestSuccess, requestError } = this.props;
    let val = e.target.value && e.target.value.substr(e.target.value.lastIndexOf("."));
    if (val && !val.match(/.jpg|.gif|.png|.bmp|.svg/i)) {
      this.setState({
        imgWarning: "必须是一个图片"
      });
      return false;
    }
    let obj = this.refs.btn_file.files[0];
    let imgUrl = window.URL.createObjectURL(obj);
    this.setState({
      imgUrl
    });
    const form = new FormData();
    form.append('btn_file', obj);

    requestStart();
    uploadApplication(form).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      const backUrl = payload.url;
      this.setState({
        backUrl: backUrl
      });
      requestSuccess();
    });
  }
  // 基础设置  搜索可见是否
  handleRadioChange1 = (value) => {
    this.setState({ selectedValue1: value });
  }
  // 基础设置    邀请成员权限
  handleChange1 = value => {
    console.log(`selected ${value}`);
    this.setState({
      request: value
    });
  };
   // 基础设置加入权限
  handleChange2 = value => {
    console.log(`selected ${value}`);
    this.setState({
      join: value
    });
  };
  // 基础设置  用户退空间 是否允许
  handleRadioChange2 = (value) => {
    this.setState({ selectedValue2: value });
  }
  // 基础设置  保存
  create = () => {
    const { history, createTeam, requestStart, requestSuccess, requestError, changeUserInfoDisplay, getUserInfo } = this.props;
    const { value, backUrl } = this.state;
    if (!value) {
      alert("请输入团队名称");
      return false;
    }
    let data = {
      tenantName: value
    };
    if (backUrl) {
      data.logo = backUrl;
    }

    requestStart();
    createTeam(data).then(({ error, payload }) => {
      requestSuccess();
      if (error) {
        requestError(payload);
        return;
      }
      // getUserInfo();
      // history.replace('/');
      // changeUserInfoDisplay();
      const tenantId = payload.tenantId;
      localStorage.setItem('create', "1");
      window.location.href = "/?tenantId=" + tenantId + "&switch=true";
    });

  }

  
  // 基础设置
  baseConfig = () => {
    const { value, imgUrl, imgWarning } = this.state;
    return (
      <div className={box}>
        <div className={item + " um-box"}>
          <label>团队名称<span>*</span></label>
          <input
            placeholder="最多60个字符"
            value={value}
            onChange={(e) => { this.onChange(e) }}
          />
        </div>
        <div className={item + " um-box"}>
          <label>团队头像</label>
          <div className={image}>
            {imgUrl ? <img ref="imgSrc" src={imgUrl} /> : null}
            <div>
              <Icon type="icon-copyreader" />
              <input type="file" ref="btn_file" onChange={(e) => { this.imgChange(e) }} />
            </div>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>搜索可见</label>
          <div className="um-box-vc">
            <Radio.RadioGroup
              name="yssorno"
              selectedValue={this.state.selectedValue1}
              onChange={this.handleRadioChange1}
            >
              <Radio value="0">否</Radio>
              <Radio value="1">是</Radio>
            </Radio.RadioGroup>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>邀请成员权限</label>
          <div>
            <Select
              defaultValue="all"
              style={{ width: 200, marginRight: 6 }}
              onChange={this.handleChange1}
            >
              <Option value="all">全员邀请</Option>
              <Option value="member">所有成员</Option>
              <Option value="enable">禁止邀请</Option>
            </Select>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>加入权限</label>
          <div>
            <Select
              defaultValue="allow"
              style={{ width: 200, marginRight: 6 }}
              onChange={this.handleChange2}
            >
              <Option value="allow">所有用户都可申请加入</Option>
              <Option value="enable">禁止用户申请加入</Option>
            </Select>
          </div>
        </div>
        <div className={item + " um-box"}>
          <label>允许用户退出空间</label>
          <div className="um-box-vc">
            <Radio.RadioGroup
              name="yssorno"
              selectedValue={this.state.selectedValue2}
              onChange={this.handleRadioChange2}
            >
              <Radio value="0">禁止</Radio>
              <Radio value="1">允许</Radio>
            </Radio.RadioGroup>
          </div>
        </div>
        <div className={footer}>
          <Button onClick={this.create}>保存</Button>
        </div>
      </div>
    )
  }


 /* &&&&& 应用设置 &&&&&   */ 
  // 点击按钮切换不同的形态
  changeDuan = (type) => {
    this.setState({
      btnType: type
    });
  }

  // 设置团队应用
  teamApplication = () => {
    const { btnType } = this.state;
    return (
      <div className={box2}>
        <div className={applicationBtns}>
          <span>
            <Button className={btnType == "web" ? active : ""} onClick={() => { this.changeDuan('web') }}>Web端</Button>
            <Button className={btnType == "mob" ? active : ""} onClick={() => { this.changeDuan('mob') }}>手机端</Button>
            <Button className={btnType == "khd" ? active : ""} onClick={() => { this.changeDuan('khd') }}>PC客户端</Button>
          </span>
          <Button colors="danger">添加应用</Button>
        </div>
        <div className={applicationLists}>
          <ul>
            <li className="um-box">
              <div>
                <img src="" />
              </div>
              <div>
                <h6>应用名称</h6>
                <p>到期时间：2018年18月18日</p>
              </div>
              <div>
                <p>已过期</p>
              </div>
              <div className="um-bf1 tr">
                <Button>续费</Button>
                <Button>删除</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }



 /* &&&&& 用户设置 &&&&&   */ 
  // 更换用户身份
  handleChange3 = value => {
    console.log(`selected ${value}`);
    const { changeIdentity,requestError,requestSuccess } = this.props;
    changeIdentity(value).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      requestSuccess();
    });
  };
  // 删除用户
  deleteMember = (item) => {
    const id = item || "";
    this.setState({
      deleteMemberId: id
    });
    const {openRemoveModal} = this.props;
    openRemoveModal();
  }
  // 设置团队成员 
  teamMember = () => {
    return (
      <div className={box3}>
        <div className={memberBtns}>
          <Button colors="danger">邀请成员</Button>
        </div>
        <h5>当前人数12人</h5>
        <div className={memberLists}>
          <ul>
            <li className="um-box um-box-vc">
              <div>
                <img src="" />
              </div>
              <div>
                <p>笑笑笑</p>
              </div>
              <div>
                <p>xiao@yonyou.com</p>
              </div>
              <div className="um-bf1  um-box-vc">
                <Select
                  defaultValue="manage"
                  style={{ width: 80, marginRight: 6 }}
                  onChange={()=>{this.handleChange3()}}
                >
                  <Option value="manage">管理员</Option>
                  <Option value="member">成员</Option>
                </Select>
              </div>
              <div className="tr">
                <Button onClick={()=>{this.deleteMember()}}>删除</Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

                     
 /* &&&&& 公共头部那里的方法集合  &&&&&   */ 
  // 打开升级为企业弹窗
  openUpgradeModal = () => {
    const { openUpgradeModal } = this.props;
    openUpgradeModal();
  }
  onVisibleChange = (visible) => {
    console.log(visible);
  }

  onSelect = ({ key }) => {
    console.log(`${key} selected`);
  }

  render() {
    const menu1 = (
      <Menu
        onSelect={this.onSelect}>
        <Item key="1">移交团队</Item>
        <Item key="2">解散团队</Item>
        <Item key="3">退出团队</Item>
      </Menu>
    );
    const { removeModal, upgradeModal } = this.props;
    return (
      <div className={wrap}>
        <div className={header}>
          <h2>用友网络用户体验小组</h2>
          <div className="um-box um-box-center">
            <div>
              <Button onClick={this.openUpgradeModal}>升级为企业</Button>
            </div>
            <div>
              <Dropdown
                trigger={['click']}
                overlay={menu1}
                animation="slide-up"
                onVisibleChange={this.onVisibleChange}
              >
                <Button className="um-box-vc um-box-center">相关操作<Icon type="icon-pull-down" /></Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className={content}>
          <Tabs
            defaultActiveKey="1"
          >
            <TabPane tab='基础设置' key="1">
              {this.baseConfig()}
            </TabPane>
            <TabPane tab='团队应用' key="2">
              {this.teamApplication()}
            </TabPane>
            <TabPane tab='团队成员' key="3">
              {this.teamMember()}
            </TabPane>
          </Tabs>
        </div>

        {
          removeModal ? <TeamRemoveModal
            deleteMemberId = { this.state.deleteMemberId }
            queryUser = { ()=>{this.queryUser()} }
          /> : null
        }
        {
          upgradeModal ? <TeamUpgradeModal /> : null
        }
      </div>
    )
  }
}

export default CreateTeamContent;
