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
    return "$i18n{index.js0}$i18n-end" + _html + "等" + length + "$i18n{index.js1}$i18n-end";
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
    return "$i18n{index.js2}$i18n-end" + _html;
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
          <p style={{ color: "#6E6E77" }}>$i18n{index.js3}$i18n-end : {mobile}</p>
          <p style={{ color: "#6E6E77" }}>$i18n{index.js4}$i18n-end : {email}</p>
          {userProject ? <p style={{ color: "#373C42", marginTop: "5px" }}>{this.renderPro(userProject)}</p> : null}
          {userHonor ? <p style={{ color: "#373C42" }}>{this.rendHor(userHonor)}</p> : null}
        </div>
        <div className={`${h_contact} ${mleft50}`} onClick={this.goemailDetail(data)}><Icon title="$i18n{index.js5}$i18n-end" type="e-mail" /></div>
        <div className={h_contact} onClick={this.gochatDetail(data)}><Icon title="$i18n{index.js6}$i18n-end" type="chat" /></div>
      </div>
    );
  }
}

export default Addressbook;
