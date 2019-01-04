function decorate72Changes(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = () => {
        method.apply(target);
        console.log("俺变，俺变，俺变变变");
    }
    console.log("学会72变");
    return descriptor;
}


function decorateGoldenCudgel(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = () => {
        method.apply(target);
        console.log("吃我一棒");
    }
    console.log("获得金箍棒");
    return descriptor;
}


function decorateSharpEyes(target, key, descriptor) {
    descriptor.value = () => {
        console.log("妖怪，哪里跑");
    }
    console.log("获得火眼金眼");
    return descriptor;
}


function decorateToString(target, key, descriptor) {
    descriptor.value = () => {
        console.log("我是孙行者");
    }
    return descriptor;
}


class Monkey {
    constructor() {
        console.log("很久很久以前，海边的一块石头，吸日月之精华，集天地之灵气，突然有一天，石头崩裂，从里面窜出一只泼猴！");
    }

    @decorateToString
    tool() {
        debugger
        console.log('我是泼猴');
    }

    @decorateGoldenCudgel
    attack() {
        console.log("猴拳出击");
    }

    @decorate72Changes
    defend() {
        console.log("我跳，我跳，我跳跳跳");
    }

    @decorateSharpEyes
    findMonster() { }
}


const monkeySun = new Monkey();
monkeySun.tool();
monkeySun.defend();
monkeySun.attack();
monkeySun.findMonster();