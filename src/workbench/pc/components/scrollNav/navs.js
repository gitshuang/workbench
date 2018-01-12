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
    this.navClassNotInit = true;
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.navClassNotInit) {
        const firstA = this.refs.list.querySelector('li a');
        if (firstA) {
          firstA.setAttribute("class", `${link} ${activeLink}`);
        }
      }
    }, 100);
  }

  handleSetActive(i) {
    this.navClassNotInit = false;
    const list = Array.prototype.slice.call(this.refs.list.querySelectorAll('li a'), 0);
    list.forEach((a) => {
      a.setAttribute("class", link);
    });
    list[i].setAttribute("class", `${link} ${activeLink}`);
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
