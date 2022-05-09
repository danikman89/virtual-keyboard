/* eslint-disable import/extensions */
import languages from './languages.js';

const main = document.createElement('main');
main.classList.add('keyboard');
const textArea = document.createElement('textarea');
const h1 = document.createElement('h1');
textArea.classList.add('textarea');
h1.innerText = 'Windows Virtual Keyboard (change the language: Ctrl + Alt)';

main.appendChild(h1);
main.appendChild(textArea);
document.body.insertAdjacentElement('afterbegin', main);

const text = document.querySelector('.textarea');

const createKeys = (lg) => {
  let capsLock = false;
  const fragment = document.createDocumentFragment();
  localStorage.value = lg;
  languages[localStorage.value || 0].forEach((key, i) => {
    const { code, small, shift } = key;
    const keyItem = document.createElement('button');
    const insertLineBreak = ['Backspace', 'Backslash', 'Enter', 'ShiftRight', 'ControlRight'].indexOf(code) !== -1;
    keyItem.setAttribute('type', 'button');
    keyItem.classList.add('keyboard__key');

    const addRemoveClass = () => {
      keyItem.addEventListener('mousedown', () => {
        keyItem.classList.add('active');
      });
      keyItem.addEventListener('mouseup', () => {
        keyItem.classList.remove('active');
        text.focus();
      });
    };
    const createClassAndAttribute = ([className]) => {
      keyItem.classList.add(...[className]);
      keyItem.textContent = small;
      keyItem.setAttribute('data', `${code}`);
      keyItem.setAttribute('data-shift', `${shift}`);
      keyItem.setAttribute('data-small', `${small}`);
    };
    switch (key.code) {
      case 'Backspace':
        createClassAndAttribute(['key__back', ',', 'keyboard__key-func']);
        addRemoveClass();
        keyItem.addEventListener('click', () => {
          if (text.selectionStart !== 0 && text.selectionEnd !== 0) {
            text.focus();
            text.setRangeText('', text.selectionStart - 1, text.selectionEnd);
          }
        });
        break;
      // eslint-disable-next-line no-duplicate-case
      case 'CapsLock':
        createClassAndAttribute(['key__caps', 'keyboard__key-func', `key--${i}`]);
        keyItem.addEventListener('click', () => {
          capsLock = !capsLock;
          // if (capsLock) {
          // }
          keyItem.classList.toggle('key__caps--active');
        });
        break;
      // eslint-disable-next-line no-duplicate-case
      case 'Enter':
        createClassAndAttribute(['key__enter']);
        addRemoveClass();
        keyItem.addEventListener('click', () => {
          text.focus();
          text.value += '\n';
        });
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'Space':
        createClassAndAttribute(['key__space', 'keyboard__key-func']);
        addRemoveClass();
        // keyItem.setAttribute('id', `${code}`);
        keyItem.addEventListener('click', () => {
          text.focus();
          text.value += ' ';
        });
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'ShiftLeft':
        createClassAndAttribute(['key__shift-left']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'ShiftRight':
        createClassAndAttribute(['key__shift-right']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'ControlLeft':
        createClassAndAttribute(['keyboard__key-func', 'key-lang--left']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'ControlRight':
        createClassAndAttribute(['keyboard__key-func', 'key-lang--right']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'AltLeft':
        createClassAndAttribute(['keyboard__key-func', 'key-lang--left']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'AltRight':
        createClassAndAttribute(['keyboard__key-func', 'key-lang--right']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'MetaLeft':
        createClassAndAttribute(['keyboard__key-func']);
        addRemoveClass();
        break;
        // eslint-disable-next-line no-duplicate-case
      case 'Tab':
        createClassAndAttribute(['key__tab']);
        addRemoveClass();
        keyItem.addEventListener('click', () => {
          text.focus();
          text.value += '\t';
        });
        break;
      default:
        keyItem.classList.add('keyboard__key', 'key--char', `key--${i}`);
        keyItem.textContent = small;
        keyItem.setAttribute('data', `${code}`);
        keyItem.setAttribute('id', `${code}`);
        keyItem.setAttribute('data-shift', `${shift}`);
        keyItem.setAttribute('data-small', `${small}`);
        keyItem.addEventListener('mousedown', (e) => {
          keyItem.classList.add('active');
          if (e.shiftKey) {
            text.value += key.shift;
            text.focus();
          } else {
            text.value += key.small;
            text.focus();
          }
        });
        keyItem.addEventListener('mouseup', () => {
          keyItem.classList.remove('active');
          text.focus();
        });
        break;
    }
    fragment.appendChild(keyItem);
    if (insertLineBreak) {
      fragment.appendChild(document.createElement('br'));
    }
  });
  return fragment;
};

const init = (lg = localStorage.value || 0) => {
  const keysContainer = document.createElement('div');
  keysContainer.classList.add('keyboard__keys');
  keysContainer.appendChild(createKeys(lg));
  main.appendChild(keysContainer);
};

let abc;
window.addEventListener('DOMContentLoaded', () => {
  init();
  abc = true;
  document.querySelector('textarea').focus();
});
