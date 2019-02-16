function decorate72Changes(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = () => {
        method.apply(target);
        console.log("");
    }
    console.log("");
    return descriptor;
}


function decorateGoldenCudgel(target, key, descriptor) {
    const method = descriptor.value;
    descriptor.value = () => {
        method.apply(target);
        console.log("");
    }
    console.log("");
    return descriptor;
}


function decorateSharpEyes(target, key, descriptor) {
    descriptor.value = () => {
        console.log("");
    }
    console.log("");
    return descriptor;
}


function decorateToString(target, key, descriptor) {
    descriptor.value = () => {
        console.log("");
    }
    return descriptor;
}


class Monkey {
    constructor() {
        console.log("");
    }

    @decorateToString
    tool() {
        debugger
        console.log('');
    }

    @decorateGoldenCudgel
    attack() {
        console.log("");
    }

    @decorate72Changes
    defend() {
        console.log("");
    }

    @decorateSharpEyes
    findMonster() { }
}


const monkeySun = new Monkey();
monkeySun.tool();
monkeySun.defend();
monkeySun.attack();
monkeySun.findMonster();
