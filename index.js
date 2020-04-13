const body = document.querySelector('body');
let input;
let board;
let value = localStorage.value || 'keyArrEn';
const activeKey = new Set();
const num = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const tabP = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const capsLockL = ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const zToM = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const lastEnRow = ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ру', '←', '↓', '→'];
const tabDelRu = ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL'];
const capsLockЭ = ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'];
const яToЮ = ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю'];
const lastRuRow = ['Ctrl', 'Win', 'Alt', ' ', 'Alt', 'En', '←', '↓', '→'];
const lang = {
  keyArrEn: [
    ['`', ...num, '-', '=', 'Backspace'],
    [...tabP, '[', ']', 'DEL'],
    [...capsLockL, ';', "'", '\\', 'Enter'],
    ['Shift', '\\', ...zToM, ',', '.', '/', '↑', 'shift'],
    [...lastEnRow],
  ],
  keyArrEnShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    [...tabP, '{', '}', 'DEL'],
    [...capsLockL, ':', '"', '|', 'Enter'],
    ['Shift', '|', ...zToM, '<', '>', '?', '↑', 'shift'],
    [...lastEnRow],
  ],
  keyArrRu: [
    ['ё', ...num, '-', '=', 'Backspace'],
    [...tabDelRu],
    [...capsLockЭ, '\\', 'Enter'],
    ['Shift', '\\', ...яToЮ, '.', '↑', 'shift'],
    [...lastRuRow],
  ],
  keyArrRuShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    [...tabDelRu],
    [...capsLockЭ, '/', 'Enter'],
    ['Shift', '/', ...яToЮ, ',', '↑', 'shift'],
    [...lastRuRow],
  ],
  arrCode: [
    ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
    ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Delete'],
    ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash', 'Enter'],
    ['ShiftLeft', 'IntlBackslash', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
    ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'],
  ],
};

function inputKey(key) {
  input.setRangeText(`${key}`, input.selectionStart, input.selectionEnd, 'end');
}

function Backspace() {
  input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');

  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText('', input.selectionStart - 1, input.selectionEnd, 'end');
  }
}

function Delete() {
  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText('', input.selectionStart, input.selectionEnd + 1, 'end');
  } else if (input.selectionStart !== input.selectionEnd) {
    input.setRangeText('', input.selectionStart, input.selectionEnd, 'end');
  }
}

function active(key) {
  document.getElementById(key).classList.add('active');
  activeKey.add(key);
}

function unActive(key) {
  if (document.getElementById(key) == null) {
    return;
  }
  document.getElementById(key).classList.remove('active');
  activeKey.delete(key);
}

const sortPrevent = (evt, key) => {
  switch (key) {
    case 'ArrowUp':
    case 'ArrowLeft':
    case 'ArrowDown':
    case 'ArrowRight':
    case 'F1':
    case 'F2':
    case 'F3':
    case 'F4':
    case 'F5':
    case 'F6':
    case 'F7':
    case 'F8':
    case 'F9':
    case 'F10':
    case 'F11':
    case 'F12':
      return;
    default:
      break;
  }
  if (evt.isTrusted) {
    evt.preventDefault();
  }
};

function keyUpHendler(evt) {
  const key = evt.code;
  switch (key) {
    case 'CapsLock':
    case 'ShiftLeft':
    case 'ShiftRight':
      return;
    default:
      break;
  }
  unActive(key);
}

const languageMod = () => {
  if (value === 'keyArrEn') {
    value = 'keyArrEnShift';
  } else if (value === 'keyArrRu') {
    value = 'keyArrRuShift';
  } else if (value === 'keyArrRuShift') {
    value = 'keyArrRu';
  } else if (value === 'keyArrEnShift') {
    value = 'keyArrEn';
  }
};

const languageChange = () => {
  if (value === 'keyArrEn' || value === 'keyArrEnShift') {
    value = 'keyArrRu';
  } else if (value === 'keyArrRu' || value === 'keyArrRuShift') {
    value = 'keyArrEn';
  }
  localStorage.value = value;
};

function createKey(keyValue, actives = false, id) {
  const key = document.createElement('div');
  key.classList.add('key');
  if (keyValue.length > 4) {
    key.classList.add('long-key');
  }
  key.textContent = `${keyValue}`;
  if (actives) {
    if (keyValue.length === 1 && (actives.has('CapsLock') || actives.has('ShiftLeft') || actives.has('ShiftRight'))) {
      key.textContent = `${keyValue.toUpperCase()}`;
    }
    if (actives.has(id)) {
      key.classList.add('active');
    }
  }
  switch (keyValue) {
    case ' ':
      key.classList.add('Space');
      break;
    case 'shift':
      key.classList.remove('long-key');
      break;
    default:
      break;
  }
  key.id = id;
  return key;
}

function createKeyBoard(leng, actives = false) {
  if (document.querySelector('.board')) {
    document.querySelector('.board').remove();
  }
  board = document.createElement('div');
  board.className = 'board';
  board.addEventListener('mouseup', (evt) => keyUpHendler({
    code: evt.target.id,
  }));
  board.addEventListener('mouseout', (evt) => keyUpHendler({
    code: evt.target.id,
  }));
  lang[value].forEach((row, i) => {
    row.forEach((key, j) => {
      const id = lang.arrCode[i][j];
      board.append(createKey(key, actives, id));
    });
  });
  body.append(board);
}

function keyDownHendler(evt) {
  const key = evt.code;
  sortPrevent(evt, key);
  switch (key) {
    case 'ArrowUp':
      input.selectionStart = 0;
      input.selectionEnd = 0;
      break;
    case 'ArrowLeft':
      input.selectionStart -= 1;
      input.selectionEnd -= 1;
      break;
    case 'ArrowDown':
      input.selectionStart = input.value.length;
      input.selectionEnd = input.value.length;
      break;
    case 'ArrowRight':
      input.selectionStart += 1;
      input.selectionEnd += 1;
      break;
    case 'Tab':
      inputKey('\t');
      break;
    case 'Backspace':
      Backspace();
      break;
    case 'Delete':
      Delete();
      break;
    case 'Enter':
      inputKey('\n');
      break;
    default:
      break;
  }

  const virtualKey = document.getElementById(key);
  if (virtualKey == null) {
    return;
  }
  const keyValue = virtualKey.textContent;
  if (key === 'CapsLock' || key === 'ShiftLeft' || key === 'ShiftRight') {
    if (evt.repeat) {
      return;
    }
  } if (key === 'CapsLock') {
    if (virtualKey.classList.contains('active')) {
      createKeyBoard(lang);
      activeKey.delete('CapsLock');
      board.addEventListener('mousedown', (event) => keyDownHendler({
        code: event.target.id,
      }));
      return;
    }
    activeKey.add(key);
    createKeyBoard(lang, activeKey);
    board.addEventListener('mousedown', (event) => keyDownHendler({
      code: event.target.id,
    }));
    activeKey.clear();
  }

  console.log("key === 'ShiftLeft': ", key === 'ShiftLeft');
  if (key === 'ShiftLeft' || key === 'ShiftRight') {
    if (virtualKey.classList.contains('active')) {
      languageMod();
      console.log('value ', value);
      createKeyBoard(lang);
      board.addEventListener('mousedown', (event) => keyDownHendler({
        code: event.target.id,
      }));
      return;
    }
    languageMod();
    console.log('value ', value);
    activeKey.add(key);
    createKeyBoard(lang, activeKey);
    board.addEventListener('mousedown', (event) => keyDownHendler({
      code: event.target.id,
    }));
    activeKey.clear();
    return;
  }
  active(key);
  const leftCtrl = document.querySelector('#ControlLeft').classList.contains('active');
  const leftAlt = document.querySelector('#AltLeft').classList.contains('active');
  if ((key === 'MetaRight') || (leftCtrl && leftAlt) || (leftCtrl && leftAlt)) {
    if (leftCtrl || leftAlt) {
      activeKey.add('ControlLeft', 'AltLeft');
    }
    languageChange();
    createKeyBoard(lang, activeKey);
    board.addEventListener('mousedown', (event) => keyDownHendler({
      code: event.target.id,
    }));
  }
  if (keyValue.length < 2 && keyValue !== '↑' && keyValue !== '←' && keyValue !== '↓' && keyValue !== '→') {
    inputKey(keyValue);
  }
}

const inpytCreater = () => {
  input = document.createElement('textarea');
  input.className = 'input-board';
  input.placeholder = `Инструкция:
  - смена языка осуществлеться нажатием кнопки Ру/En или сочетанием Ctrl + Alt.
  - Кнопки Shift и Caps Lock залипают для удобства.`;
  input.addEventListener('blur', () => input.focus());
  body.append(input);
};

document.addEventListener('keydown', (evt) => keyDownHendler(evt));
document.addEventListener('keyup', (evt) => keyUpHendler(evt));

inpytCreater();
createKeyBoard(lang);
board.addEventListener('mousedown', (event) => keyDownHendler({
  code: event.target.id,
}));
input.focus();
