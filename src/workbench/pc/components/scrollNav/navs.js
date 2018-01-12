import React,{Component} from 'react';
import { Link ,animateScroll as scroll,scrollSpy,Events} from 'react-scroll';
import {
  link,
  activeLink,
  item,
  cover,
  navs,
} from './style.css';

class Navs extends Component{

  constructor(props) {
    super(props);

    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
      localStorage.setItem("nav",arguments[0]);
    });

    scrollSpy.update();

  }

  componentDidMount() { 
    setTimeout(() => { 
      let lis = document.getElementById("nav_links").getElementsByTagName("a");
      let default_class = "";
      let b = false; 
      for(var i=0;i<lis.length;i++){
        b = this.isContains(lis[i].getAttribute("class")); 
        if(!b){
          default_class = lis[i].getAttribute("class")
        } 
      }
      lis[0].setAttribute("class",default_class + " active_link");
      scroll.scrollTo(1);
    },0);
  }
 
  isContains(str) {
    let regx1 = (/active_link/);
    return str.match(regx1)?true:false;
  }

  handleSetActive=(e,id)=>{
    let lis = document.getElementById("nav_links").getElementsByTagName("a");
    for(var i=0;i<lis.length;i++){
      let _class = lis[i].getAttribute("class");
      lis[i].setAttribute("class", _class.replace((/active_link/g)," "));
      if(lis[i].id == id){
        lis[i].setAttribute("class", _class+=" active_link");
      }
    }
  }

  render(){
    let {
        items,
        offset,
        duration,
        delay,
        color
      } = this.props;
    return (
      <div className={cover}>
        <ul className={navs} id="nav_links">
          {
            items = items.map(({ label, target }, i) => (
              <li key={i}>
                <Link
                  className={link}
                  style={{color:color}}
                  // activeClass="active_link"
                  to={target}
                  spy={true}
                  smooth={true}
                  offset={i==0?(-90):offset}
                  duration={duration}
                  isDynamic={true}
                  id={target}
                  onSetActive={(e)=>{this.handleSetActive(e,target)}}
                  delay={delay}>
                  {label}
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
