import objectAssign from 'object-assign';

if (typeof Object.assign === 'undefined') {
  Object.assign = objectAssign;
}