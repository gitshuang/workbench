import HTML5BackendGroup from 'react-dnd-html5-backend';
import MouseBackend from './MouseBackend';

// import MouseBackEnd from 'react-dnd-mouse-backend'

const createMouseBackend = manager => new MouseBackend(manager);

const judgeIfSupH5 = () => {
  if (Object.prototype.hasOwnProperty.call(window, 'applicationCache') && Object.prototype.hasOwnProperty.call(window, 'ondrag')) {
    return true;
  }
  return false;
};

const judgedBackend = judgeIfSupH5() ? HTML5BackendGroup : createMouseBackend;

export default judgedBackend;
