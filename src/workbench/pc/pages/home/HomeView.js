import React, { Component } from 'react';

class HomeView extends Component {

  scrollToAnchor = (anchorName) => {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
  }

  render() {

    return (
      <div>
        <div style={{paddingBottom:'40px'}}>

          <a onClick={()=>this.scrollToAnchor('screens')}>
            <button>
              <i className="material-icons">expand_more</i>
            </button>
          </a>
        </div>
        <div className="mdl-grid" style={{height: 800}}>
          <a id="screens"></a>
          跳到这里
          <br />
          跳到这里
          <br />
          跳到这里
          <br />
          跳到这里
          <br />
          跳到这里
          <br />
          跳到这里
          <br />
          跳到这里
          <br />
        </div>
      </div>
    );
  }


}

export default HomeView;