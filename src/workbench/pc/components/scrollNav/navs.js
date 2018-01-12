import React,{Component} from 'react';
import { Link ,animateScroll as scroll,scrollSpy,Events} from 'react-scroll';
import {
  link,
  activeLink,
  item,
  cover,
  navs,
} from './style.css';

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
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.navClassNotInit) {
        console.log('not init')
        const firstA = this.refs.list.querySelector('li a');
        if (firstA) {
          addClass(firstA);
        }
      }
    }, 500);
  }

  handleSetActive(i) {
    this.navClassNotInit = false;
    if (this.refs.list) {
      console.log('has list');
      replaceClass(this.refs.list, i);
    } else {
      console.log('has no list');
      setTimeout(() => {
        replaceClass(this.refs.list, i);
      }, 0);
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
        <ul className={navs} ref='list'>
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
