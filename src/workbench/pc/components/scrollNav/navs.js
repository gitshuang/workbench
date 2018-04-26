import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, animateScroll as Events } from 'react-scroll';
import { getStrLenSubstr } from '@u';
import {
  link,
  activeLink,
  cover,
  navs,
  allBtnUl,
} from './style.css';

let notFirstInit = false;

function addClass(elm) {
  elm.setAttribute('class', `${link} ${activeLink}`);
}

function replaceClass(list, i) {
  list = Array.prototype.slice.call(list.querySelectorAll('li a'), 0);
  list.forEach((a) => {
    a.setAttribute('class', link);
  });
  addClass(list[i]);
}

class Navs extends Component {
  static propTypes = {
    allBtn: PropTypes.string,
    items: PropTypes.arrayOf(),
    offset: PropTypes.number,
    duration: PropTypes.string,
    delay: PropTypes.string,
    color: PropTypes.string,
    btnShowFn: PropTypes.func,
  }
  static defaultProps = {
    allBtn: '',
    items: [],
    offset: 0,
    duration: '',
    delay: '',
    color: '',
    btnShowFn: () => { },
  }
  constructor(props) {
    super(props);
    this.navClassNotInit = true;
    this.tabsIndex = 0;
    this.tabsWidth = 1;
    this.state = {
    };
  }

  componentDidMount() {
    const ul = document.getElementById('nav_ul');
    const b = ul.scrollWidth > ul.clientWidth;
    this.props.btnShowFn(b);

    this.setScrollLeft();
    setTimeout(() => {
      if (this.navClassNotInit) {
        const firstA = this.list.querySelector('li a');
        if (firstA) {
          addClass(firstA);
          window.scrollTo(0, 0);
          notFirstInit = true;
        }
      }
    }, 500);
  }

  componentWillUnmount() {
    Events.scrollEvent.remove('end');
  }

  setScrollLeft() {
    this.tabsIndex = 0;
    // Events.scrollEvent.register('end', (to) => {
    //   if (to == null || this.props.allBtn) return;

    //   const { items } = this.props;
    //   const TabIndex = items.findIndex(da => da.target === to);
    //   const Pnum = (TabIndex > this.tabsIndex ? 1 : -1);
    //   if (TabIndex !== 0 && TabIndex !== this.tabsIndex) {
    //     const Num = (TabIndex > this.tabsIndex ? -1 : 1) + TabIndex;
    //     const nextTabsId = items[(Num)].target;
    //     this.tabsWidth = (Pnum * document.getElementById((nextTabsId)).offsetWidth);
    //     if (TabIndex > this.tabsIndex) {
    //       this.startTime(document.getElementById('nav_ul'), this.tabsWidth, 3);
    //     } else {
    //       this.startTimeEnd(document.getElementById('nav_ul'), this.tabsWidth, 3);
    //     }
    //   } else if (TabIndex === 0) {
    //     document.getElementById('nav_ul').scrollLeft = 0;
    //   }
    //   this.tabsIndex = TabIndex;
    // });
  }

  startTimeEnd(div, end, sp) {
    end += div.scrollLeft;
    let Top = div.scrollLeft;
    if (this.interval) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        if (Top <= end) {
          clearInterval(this.interval);
          this.interval = null;
          Top = 0;
        } else {
          const Scro = (div.scrollLeft - sp) <= end ? end : (div.scrollLeft - sp);
          div.scrollLeft = Scro;
          Top -= sp;
        }
      });
    }
  }

  startTime(div, end, sp) {
    end += div.scrollLeft;
    let Top = div.scrollLeft;
    if (this.interval) {
      clearInterval(this.interval);
    } else {
      this.interval = setInterval(() => {
        if (Top >= end) {
          clearInterval(this.interval);
          this.interval = null;
          Top = 0;
        } else {
          const Scro = (div.scrollLeft + sp) >= end ? end : (div.scrollLeft + sp);
          div.scrollLeft = Scro;
          Top += sp;
        }
      });
    }
  }

  handleSetActive(i) {
    if (this.list && notFirstInit) {
      this.navClassNotInit = false;
      replaceClass(this.list, i);
    }
  }

  render() {
    const {
      items,
      offset,
      duration,
      delay,
      color,
      allBtn,
    } = this.props;
    return (
      <div className={cover}>
        <ul
          className={`${navs} ${allBtn ? null : allBtnUl} `}
          ref={(c) => { this.list = c; }}
          id="nav_ul"
        >
          {
            items.map(({ label, target }, i) => {
              const linkOff = i === 0 ? (-90) : offset;
              return (
                <li key={i}>
                  <Link
                    className={link}
                    style={{ color }}
                    to={target}
                    spy
                    smooth
                    offset={linkOff}
                    duration={duration}
                    onSetActive={() => { this.handleSetActive(i); }}
                    isDynamic
                    id={target}
                    title={label}
                    delay={delay}
                  >
                    {getStrLenSubstr(label, 6, 6)}
                  </Link>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default Navs;
