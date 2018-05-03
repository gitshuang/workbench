import React, { Component } from 'react';
import {
  dispatch,
  trigger,
} from 'tools';
import {
  iconWrap,
  nameWrap,
  mleft50,
  h_contact,
} from './index.css';

class Addressbook extends Component {
  gochatDetail({ userId }) {
    return (e) => {
      e.stopPropagation();
      trigger('IM', 'switchChatTo', {
        yht_id: userId,
      });
    }
  }
  goAddress = () => {
    const { id, name, userId, tenantId } = this.props;
    dispatch('openService', {
      serviceCode: 'XTTONGXUNLU0000000',
      data: {
        genre: 4,
        fromDiworkAddressList: `${name}---${userId}---${tenantId}`,
      },
    });
  }
  goemailDetail({ id, userId, name, tenantId }){
    return (e) => {
      e.stopPropagation();
      dispatch('openService', {
        serviceCode: 'XTWEIYOU0000000000',
        data: {
          genre: 4,
          fromDiworkAddressList: `${name}---${userId}---${tenantId}`,
        },
      });
    }
  }
  renderPro = (userProject) => {
    let list = [];
    try {
      list = JSON.parse(userProject);
    } catch (e) {
      console.log(e);
    }
    const arrItem = list.map((item, index) => {
      return item.name + '、';
    });
    let _html = "";
    arrItem.forEach((item, index) => {
      _html += item;
    });
    const length = list.length;
    return "项目：" + _html + "等" + length + "个相关项目";
  }
  rendHor = (userHonor) => {
    let list = [];
    try {
      list = JSON.parse(userHonor);
    } catch (e) {
      console.log(e);
    }
    const arrItem = list.map((item, index) => {
      return item.name + '、';
    });
    let _html = "";
    arrItem.forEach((item, index) => {
      _html += item;
    });
    return "荣耀：" + _html;
  }
  render() {
    const {
      data,
      data: {
        photo,
        name,
        orgName,
        mobile,
        email,
        userProject,
        userHonor,
      },
    } = this.props;
    return (
      <div onClick={this.goAddress}>
        <div className={iconWrap}>
          <img src={photo} />
        </div>
        <div className={nameWrap}>
          <p>
            <span dangerouslySetInnerHTML={{__html: name}} />
            <span>-{orgName}</span>
          </p>
          <p style={{ color: "#6E6E77" }}>办公电话 : {mobile}</p>
          <p style={{ color: "#6E6E77" }}>邮箱 : {email}</p>
          {userProject ? <p style={{ color: "#373C42", marginTop: "5px" }}>{this.renderPro(userProject)}</p> : null}
          {userHonor ? <p style={{ color: "#373C42" }}>{this.rendHor(userHonor)}</p> : null}
        </div>
        <div className={`${h_contact} ${mleft50}`} onClick={this.goemailDetail(data)}><Icon title="发邮件" type="e-mail" /></div>
        <div className={h_contact} onClick={this.gochatDetail(data)}><Icon title="发消息" type="chat" /></div>
      </div>
    );
  }
}

export default Addressbook;
