'use strict';

let page = new PhonePage({ el: document.body });


document.body.addEventListener('qweqweqwe', (event) => {
  console.log(event.detail);
});

let myEvent = new CustomEvent('qweqweqwe', {
  detail: 123
});

for (let i = 0; i < 10; i++) {
  document.body.dispatchEvent(myEvent);
}
