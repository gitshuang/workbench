import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import { mapStateToProps, getHost, logout } from '@u';
import { openWin } from 'public/regMessageTypeHandler';

import Icon from 'pub-comp/icon';
import Menu, { Item as MenuItem, SubMenu } from 'bee/menus';
import { info, list, out, menu } from './info.css';
/*   actions   */
import rootActions from 'store/root/actions';
const { setCurrent, getDefaultDesktop, setDefaultDesktop, } = rootActions;


@connect(
    mapStateToProps(
        'content',
        'userInfo',
    ),
    {
        setCurrent,
        getDefaultDesktop,
        setDefaultDesktop,
    }
)
@onClickOutside
class InfoContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: [
                {
                    langCode: "zh_CN",
                    dislpayName: '简体中文'
                },
                {
                    langCode: "en_US",
                    dislpayName: "English"
                },
                {
                    langCode: "zh_TW",
                    dislpayName: '繁体中文'
                },
            ],
            defaultValue: '简体中文',
            desktop: [
                { key: 'workbench', text: '工作台' },
                { key: 'portal', text: '门户' },
            ],
            locale: 'en_US',
        };
    }

    componentWillMount() {
        const { getDefaultDesktop } = this.props;
        getDefaultDesktop();
        this.getAllEnableFunc();
    }
    // 从ftl文件中获取语言列表
    getAllEnableFunc = () => {
        const { locale, multilist } = window.diworkContext();
        const language = JSON.parse(multilist);
        const defaultValue = language.filter(item => {
            return item.langCode === locale;
        })[0].dislpayName;
        this.setState({
            language,
            defaultValue,
            locale
        });
    }

    // outside 装饰器方法
    handleClickOutside() {
        const { closeInfo } = this.props;
        closeInfo();
    }
    // 切换语言
    onChangeLanguage = (e) => {
        const { setCurrent } = this.props;
        const value = e.key;
        if (value === this.state.locale) return;
        setCurrent(value).then(({ error, payload }) => {
            if (error) {
                return;
            }
            window.location.reload();
        });;
    }
    // 切换登录
    onChangeEntry = (e) => {
        const { setDefaultDesktop, content } = this.props;
        console.log(e);
        if (e.key !== content) {
            setDefaultDesktop({ content: e.key });
        }
    }
    // 打开账号管理
    openAccount = () => {
        openWin({
            id: 'Account',
            title: '账号管理',
        });
        this.props.closeInfo();
    }

    render() {
        const { userInfo, content } = this.props;
        const { language, defaultValue, desktop, locale } = this.state;
        const { userAvator, userName } = userInfo;
        return (
            <div className={info}>
                <dl>
                    <dt>
                        <div>
                            {
                                userAvator
                                    ? <img alt="" src={userAvator} />
                                    : <Icon type="staff-solid" />
                            }
                        </div>
                        <span>{userName}</span>
                    </dt>
                    <dd>
                        <ul>
                            <li onClick={this.openAccount}>
                                <div className={list}>
                                    <Icon type="account-management" />
                                    <span>账号管理</span>
                                </div>
                            </li>
                            <li>
                                <Menu className={menu} onClick={this.onChangeLanguage} selectedKeys={[locale]}>
                                    <SubMenu
                                        key="language"
                                        title={
                                            <div className={list}>
                                                <Icon type="language" />
                                                <span>{defaultValue}</span>
                                            </div>
                                        }
                                    >
                                        {
                                            language.map(item => {
                                                return (
                                                    <MenuItem key={item.langCode}>
                                                        {item.dislpayName}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                </Menu>
                            </li>
                            <li>
                                <Menu
                                    className={menu}
                                    onClick={this.onChangeEntry}
                                    selectedKeys={[content]}
                                >
                                    <SubMenu
                                        key="login"
                                        title={
                                            <div className={list}>
                                                <Icon type="computer" />
                                                <span>默认登录</span>
                                            </div>
                                        }
                                    >
                                        {desktop.map(item => {
                                            return (
                                                <MenuItem key={item.key}>
                                                    {item.text}
                                                </MenuItem>
                                            )
                                        })}
                                    </SubMenu>
                                </Menu>
                            </li>
                        </ul>
                    </dd>
                </dl>
                <div className={out}>
                    <div className={list} onClick={() => { logout() }}>
                        <Icon type="cancellation" />
                        <span>注销</span>
                    </div>
                </div>
            </div>
        )

    }
}
export default InfoContent;

