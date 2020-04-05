const body = document.querySelector('body');
const input = document.createElement('textarea');
input.className = 'input-board';
body.append(input);
let board;
let value = localStorage.value || 'keyArrEn';
const activeKey = new Set();

const lang = {
  keyArrEn: [
    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'DEL'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", '\\', 'Enter'],
    ['Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'Ру', '←', '↓', '→'],
  ],
  keyArrEnShift: [
    ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', 'DEL'],
    ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', '|', 'Enter'],
    ['Shift', '|', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '↑', 'shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'Ру', '←', '↓', '→'],
  ],
  keyArrRu: [
    ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '\\', 'Enter'],
    ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'En', '←', '↓', '→'],
  ],
  keyArrRuShift: [
    ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
    ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'DEL'],
    ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '/', 'Enter'],
    ['Shift', '/', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', ',', '↑', 'shift'],
    ['Ctrl', 'Win', 'Alt', ' ', 'alt', 'En', '←', '↓', '→'],
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
  if (actives) {
    if (keyValue.length === 1 && (actives.has('CapsLock') || actives.has('ShiftLeft') || actives.has('ShiftRight'))) {
      keyValue.toUpperCase();
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
  key.textContent = `${keyValue}`;
  return key;
}


function createKeyBoard(leng, target = false) {
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

  for (let i = 0; i < lang[value].length; i += 1) {
    const line = lang[value][i];
    const Idline = lang.arrCode[i];
    for (let j = 0; j < line.length; j += 1) {
      const key = line[j];
      const id = Idline[j];
      board.append(createKey(key, target, id));
    }
  }
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
  if (key === 'CapsLock') {
    if (evt.repeat) {
      return;
    }
    if (virtualKey.classList.contains('active')) {
      createKeyBoard(lang);
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
    return;
  }
  if (key === 'ShiftLeft' || key === 'ShiftRight') {
    if (virtualKey.classList.contains('active')) {
      languageMod();
      createKeyBoard(lang);
      board.addEventListener('mousedown', (event) => keyDownHendler({
        code: event.target.id,
      }));
      return;
    }
    if (!evt.repeat) {
      languageMod();
      activeKey.add(key);
      createKeyBoard(lang, activeKey);
      board.addEventListener('mousedown', (event) => keyDownHendler({
        code: event.target.id,
      }));
      activeKey.clear();
      return;
    }
  }
  if ((key === 'MetaRight')) {
    languageChange();
    createKeyBoard(lang);
    board.addEventListener('mousedown', (event) => keyDownHendler({
      code: event.target.id,
    }));
  }
  active(key);

  if (keyValue.length < 2 && keyValue !== '↑' && keyValue !== '←' && keyValue !== '↓' && keyValue !== '→') {
    inputKey(keyValue);
  }
}

document.addEventListener('keydown', (evt) => keyDownHendler(evt));
document.addEventListener('keyup', (evt) => keyUpHendler(evt));
localStorage.value = value;

createKeyBoard(lang);
board.addEventListener('mousedown', (event) => keyDownHendler({
  code: event.target.id,
}));
