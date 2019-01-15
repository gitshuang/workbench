import React from 'react';
import Card from './card';
import classNames from 'classnames'

export default class CardsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow:true
        }
    }
    handleClick=()=>{
        this.setState({
            isShow:!this.state.isShow
        })
    }
    render() {
        const {list,listName,onChangeChecked,checkedCardList} = this.props;
        const {isShow} = this.state;
        const display = isShow?'flex':'none'
        return <div>
            <div className="serviceTitle"><span>{listName}</span><i className={classNames({ down: isShow })} onClick={this.handleClick}/></div>
            <div className="result_app_list_4" style={{display}}>
                {list.map((item, c) => {
                    return <Card {...item} key={item.menuItemId} index={c}
                        onChangeChecked={onChangeChecked}
                        checkedCardList={checkedCardList} />//{item.menuItemName}
                })}
            </div>
            <hr />
        </div>
    }
}