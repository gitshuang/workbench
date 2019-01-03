import React, { Component } from 'react';


//import SiderCard from './siderCard.js';
//import { Cascader } from 'tinper-bee';
import Checkbox from 'bee/checkbox';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import manageActions from 'store/root/manage/actions';
const { } = manageActions;
import { add_item, sider_container,toggleBar } from './style.css'
import { TransitionGroup, CSSTransitionGroup } from 'react-transition-group';
@connect(
    mapStateToProps(
        'selectList',
        'isEdit',
        {
            namespace: 'manage',
        }
    ),
    {
    }
)
export default class MySider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siderDisplay: true
        };
    }
    componentDidMount() {

    }
    //领域模块搜索
    onCascaderChange = value => {

    };
    //切换搜索状态
    switchSearch = () => {
        const { showSearch } = this.state;
        this.setState({ showSearch: !showSearch }, () => {
            if (this.state.showSearch) {
                this.refs.searchInput.focus();
                this.setState({ appGroupArr: [], isAllShow: true });
            } else {
                this.onCascaderChange(this.state.domainModuleSelect);
            }
        });
    };


    render() {

        return (

            <div className={sider_container}  >
                {
                    this.state.siderDisplay ?
                        <TransitionGroup>
                            <CSSTransitionGroup
                                transitionName={{
                                    enter: 'animated',
                                    enterActive: 'fadeIn',
                                    leave: 'animated',
                                    leaveActive: 'fadeOut',
                                }}
                                transitionEnterTimeout={1300}
                                transitionLeaveTimeout={1300} >
                                <div style={{ width: 380, display: this.state.siderDisplay ? "block" : "none" }}>
                                    <div className={add_item}>
                                        <span>*拖动下方磁贴至右侧所需位置</span>
                                        <i className={toggleBar}
                                        onClick={() => { this.setState({ siderDisplay: !this.state.siderDisplay }) }}>
                                        {"<"}</i>
                                    </div>
                                </div>
                            </CSSTransitionGroup>
                        </TransitionGroup>
                        : <i className={`${add_item} ${toggleBar}`}
                         onClick={() => { this.setState({ siderDisplay: !this.state.siderDisplay }) }}>
                         {">"}</i>
                }
            </div>

        );
    }
}
