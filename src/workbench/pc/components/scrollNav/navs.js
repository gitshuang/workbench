import React,{Component} from 'react';
import { Link ,animateScroll as scroll,scrollSpy,Events} from 'react-scroll';
import { getStrLenSubstr} from '@u';
import {
  link,
  activeLink,
  item,
  cover,
  navs,
  all_btn_ul
} from './style.css';

let notFirstInit = false;

function addClass(elm) {
  elm.setAttribute("class", `${link} ${activeLink}`);
}

function replaceClass(list, i) {
  list = Array.prototype.slice.call(list.querySelectorAll('li a'), 0);
  list.forEach((a) => {
    a.setAttribute("class", link);
  });
  addClass(list[i]);
}

class Navs extends Component{

  constructor(props) {
    super(props);
    this.navClassNotInit = true;
    this.tabsIndex = 0;
    this.tabsWidth = 1;


    this.state = {
      btnShow:false
    }
  }
 
  componentWillUnmount() {
    Events.scrollEvent.remove('end');
  }

  setScrollLeft(){
    this.tabsIndex = 0;
    Events.scrollEvent.register('end', (to, element)=> {
      if(to == null || this.props.allBtn)return;

      let {items} = this.props;
      let _tabIndex = items.findIndex((da)=>da.target == to);
      let _pnum = (_tabIndex>this.tabsIndex?1:-1);
      if(_tabIndex != 0 && _tabIndex != this.tabsIndex){
        let _num = (_tabIndex>this.tabsIndex?-1:1)+_tabIndex;
        let nextTabsId = items[(_num)].target;
        this.tabsWidth = (_pnum*document.getElementById((nextTabsId)).offsetWidth);
        // document.getElementById("nav_ul").scrollLeft += this.tabsWidth;
        if(_tabIndex>this.tabsIndex){
          this.startTime(document.getElementById("nav_ul"),this.tabsWidth,3);
        }else{
          this.startTimeEnd(document.getElementById("nav_ul"),this.tabsWidth,3);
        }
      }else if(_tabIndex == 0){
        document.getElementById("nav_ul").scrollLeft = 0;
      }else{}
      this.tabsIndex = _tabIndex;
    });
  }

  startTimeEnd(div,end,sp){
    end += div.scrollLeft;
    let _top = div.scrollLeft;
    if(this.interval){
      clearInterval(this.interval);
    }else{
      this.interval = setInterval(()=>{
         let start = div.scrollLeft;
          if(_top<=end){
            clearInterval(this.interval);
            this.interval = null;
            _top = 0;
          }else{
            let _scro = (div.scrollLeft- sp)<=end?end:(div.scrollLeft - sp);
            div.scrollLeft = _scro;
            _top -=  sp;
          }
      })
    }
  }

  startTime(div,end,sp){
    end += div.scrollLeft;
    let _top = div.scrollLeft;
    if(this.interval){
      clearInterval(this.interval);
    }else{
      this.interval = setInterval(()=>{
         let start = div.scrollLeft;
          if(_top>=end){
            clearInterval(this.interval);
            this.interval = null;
            _top = 0;
          }else{
            let _scro = (div.scrollLeft+ sp)>=end?end:(div.scrollLeft+ sp);
            div.scrollLeft = _scro;
            _top +=  sp;
          }
      })
    }
  }

  componentDidMount() {
    let ul = document.getElementById("nav_ul"); 
    let b = ul.scrollWidth > ul.clientWidth?true:false;
    console.log("nav_ul",b);
    this.props.btnShowFn(b);

    this.setScrollLeft();
    setTimeout(() => {
      if (this.navClassNotInit) {
        const firstA = this.refs.list.querySelector('li a');
        if (firstA) {
          addClass(firstA);
          window.scrollTo(0,0);
          notFirstInit = true;
        }
      }
    }, 500);
  }

  handleSetActive(i) {
    if (this.refs.list && notFirstInit) {
      this.navClassNotInit = false;
      replaceClass(this.refs.list, i);
    } else {
    }
  } 

  render(){
    let {
        items,
        offset,
        duration,
        delay,
        color,
        allBtn
      } = this.props;
    return (
      <div className={cover}>
        <ul className={`${navs} ${allBtn?null:all_btn_ul} `} ref='list' id="nav_ul">
          {
            items = items.map(({ label, target }, i) => (
              <li key={i}>
                <Link
                  className={link}
                  style={{color:color}}
                  to={target}
                  spy={true}
                  smooth={true}
                  offset={i==0?(-90):offset}
                  duration={duration}
                  onSetActive={(e)=>{ this.handleSetActive(i) }}
                  isDynamic={true}
                  id={target}
                  title={label}
                  delay={delay}>
                  {/* {label} */}
                  {getStrLenSubstr(label,5,5)}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Navs;
