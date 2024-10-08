const aliceTumbling = [
  { transform: 'rotate(0) scale(1)' },
  { transform: 'rotate(360deg) scale(0)' }
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: 'forwards'
}

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

function doit(elem) {
  return elem.animate(aliceTumbling, aliceTiming);
}

//method 1
function play1() {
  doit(alice1).finished
    .then(() => doit(alice2).finished)
    .then(() => doit(alice3).finished)
    .catch((error) => (console.log(`${error}`)))
}

// play1();

//method 2
async function play2() {
  try {
    await doit(alice1).finished;
    await doit(alice2).finished;
    await doit(alice3).finished;
  } catch (error) {
    console.log(`${error}`);
  }
}

play2();