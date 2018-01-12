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
    this.flag = 0;
  }

  componentDidMount() {
    this.inter = setInterval(()=>{
      let lis = document.getElementById("nav_links").getElementsByTagName("a");
      if(this.flag == lis.length){
        clearInterval(this.inter);
        this.inter = null;
        this.setFirstNavs();
      }
    },0);
  }
  
  setFirstNavs =()=>{
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
      let _id = lis[0].getAttribute("id");
      document.getElementById(_id).click(); 
  }

  isContains(str) {
    let regx1 = (/active_link/);
    return str.match(regx1)?true:false;
  }

  handleSetActive=(e,id)=>{
    let lis = document.getElementById("nav_links").getElementsByTagName("a");
    if(this.flag == lis.length){
      for(var i=0;i<lis.length;i++){
        let _class = lis[i].getAttribute("class");
        lis[i].setAttribute("class", _class.replace((/active_link/g)," "));
        if(lis[i].id == id){
          lis[i].setAttribute("class", _class+=" active_link");
        }
      }
      this.flag = 1;
    }
    this.flag++;
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
                  ignoreCancelEvents={false}
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
