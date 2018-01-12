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
  componentDidMount() {
    setTimeout(() => {
      const firstA = this.refs.list.querySelector('li a');
      if (firstA) {
        let newClass = firstA.getAttribute("class");
        newClass += ` ${activeLink}`;
        firstA.setAttribute("class", newClass);
      }
    },0);
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
                  activeClass={activeLink}
                  to={target}
                  spy={true}
                  smooth={true}
                  offset={i==0?(-90):offset}
                  duration={duration}
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
