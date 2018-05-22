import React, { Component } from 'react';
class Href extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    const { hrefs } = this.props;
    const list = hrefs.map((item,index)=>{
      return <a href={item.href} key={index} target="_blank">{item.name}</a>
    });
    return (
      <div>{list}</div>
    )
  }
}

export default Href;