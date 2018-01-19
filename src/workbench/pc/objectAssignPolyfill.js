import objectAssign from 'object-assign';
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (typeof Object.assign === 'undefined') {
  Object.assign = objectAssign;
}