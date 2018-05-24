function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt((Math.random() * minNum) + 1, 10);
    case 2:
      return parseInt((Math.random() * ((maxNum - minNum) + 1)) + minNum, 10);
    default:
      return 0;
  }
}

function gitBackgroundIcon() {
  const Colos = ['RGBA(228, 97, 92, 1)', 'RGBA(117, 127, 140, 1)', 'RGBA(255, 196, 0, 1)', 'RGBA(87, 217, 163, 1)', 'RGBA(153, 141, 217, 1)', 'RGBA(0, 199, 230, 1)', 'RGBA(158, 161, 167, 1)'];
  const index = randomNum(1, 7);
  return Colos[index];
}

export {
  gitBackgroundIcon
};