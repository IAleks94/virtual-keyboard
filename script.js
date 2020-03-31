let body = document.querySelector('body');
let input = document.createElement('textarea');
input.className = 'input-board';
body.append(input);
let board;
let value = localStorage.value || 'keyArrEn';

function createKeyBoard(leng, target = false) {
  if (document.querySelector('.board')) {
    document.querySelector('.board').remove();
  }
  board = document.createElement('div');
  board.className = 'board';
  body.append(board);
  board.addEventListener('mousedown', (evt) => keyDownHendler({
    code: evt.target.id
  }));
  board.addEventListener('mouseup', (evt) => keyUpHendler({
    code: evt.target.id
  }));
  for (let i = 0; i < lang[value].length; i++) {
    let line = lang[value][i];
    let Idline = lang.arrCode[i];
    for (let i = 0; i < line.length; i++) {
      let key = line[i];
      let id = Idline[i];
      board.append(createKey(key, target, id));
    }
  }
}


function createKey(keyValue, target = false, id) {

  let key = document.createElement('div');
  key.classList.add(`key`) ;
  if (keyValue.length > 4) {
    key.classList.add('long-key');
  } else if (keyValue.length === 1 && (target === 'CapsLock' || target === 'ShiftLeft' || target === 'ShiftRight')) {
    keyValue = keyValue.toUpperCase();
  }
  if (target === id) {
    key.classList.add('active');
  }
  switch (keyValue) {
    case ' ':
      key.classList.add('Space');
      break;
    case 'shift':
    key.classList.remove('long-key');
      break;
  }
  key.id = id;
  key.textContent = `${keyValue}`;
  return key;
}
document.addEventListener('keydown', (evt) => keyDownHendler(evt));
document.addEventListener('keyup', (evt) => keyUpHendler(evt));

let lang = {
  keyArrEn: [
    ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
    ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'DEL', ],
    ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", `\\`, 'Enter'],
    ["Shift", '\\', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
  ],
  keyArrEnShift: [
    ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace', ],
    ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", 'DEL', ],
    ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', `|`, 'Enter'],
    ["Shift", '|', "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "alt", "Ру", "←", "↓", "→", ],
  ],
  keyArrRu: [
    ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
    ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'DEL', ],
    ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `\\`, 'Enter'],
    ["Shift", '\\', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
  ],
  keyArrRuShift: [
    ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace', ],
    ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'DEL', ],
    ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `/`, 'Enter'],
    ["Shift", '/', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "alt", "En", "←", "↓", "→", ],
  ],
  arrCode: [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Delete"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Backslash", "Enter"],
    ["ShiftLeft", "IntlBackslash", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight" ],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight",  "MetaRight", "ArrowLeft", "ArrowDown", "ArrowRight"],
  ],
};


function keyDownHendler(evt) {
  let key = evt.code;
  sortPrevent(evt, key);
  switch (key) {
    case 'Tab':
      inputKey('    ');
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

  }

  let virtualKey = document.getElementById(key);
  if (virtualKey == null) {
    return;
  }
  let keyValue = virtualKey.textContent;
  if (key === 'CapsLock') {
    if (evt.repeat) {
      return;
    }
    if (virtualKey.classList.contains('active')) {
      createKeyBoard(lang);
      return;
    }
    createKeyBoard(lang, key);
  }
  if (key === 'ShiftLeft' || key === 'ShiftRight') {
    if (virtualKey.classList.contains('active')) {
      languageMod();
      createKeyBoard(lang);
      return;
    }
    if (!evt.repeat) {
      languageMod();
      createKeyBoard(lang, key);
    }
  }
  if ((key === 'MetaRight')) {
    languageChange();
    createKeyBoard(lang);
  }
  active(virtualKey);

  if (keyValue.length < 2 && keyValue !== '↑' && keyValue !== "←" && keyValue !== "↓" && keyValue !== "→") {
    inputKey(keyValue);
  }
}

function keyUpHendler(evt) {
  let key = evt.code;
  // console.log(key);
  switch (key) {
    case 'CapsLock':
    case 'ShiftLeft':
    case 'ShiftRight':
    return;
  }
  let virtualKey = document.getElementById(key);
  if (virtualKey == null) {
    return;
  }
  unActive(virtualKey);

}


function inputKey(key) {
  input.setRangeText(`${key}`, input.selectionStart, input.selectionEnd, "end");
}

function Backspace() {
  input.setRangeText("", input.selectionStart, input.selectionEnd, "end");

  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText("", input.selectionStart - 1, input.selectionEnd, "end");
  }
}

function Delete() {
  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText("", input.selectionStart, input.selectionEnd + 1, "end");
  } else if (input.selectionStart != input.selectionEnd) {
    input.setRangeText("", input.selectionStart, input.selectionEnd, "end");
  }
}


function active(target) {
  target.classList.add('active');
}

function unActive(target) {
  target.classList.remove('active');
}

let sortPrevent = (evt, key) => {
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
  }
  if (evt.isTrusted) {
    evt.preventDefault();
  }
};

let languageMod = () => {
  if (value === 'keyArrEn') {
    value = 'keyArrEnShift';
  } else if (value === 'keyArrRu') {
    value = 'keyArrRuShift';
  } else if (value === 'keyArrRuShift') {
    value = 'keyArrRu';
  } else if (value === 'keyArrEnShift') {
    value = 'keyArrEn';
  }
}

let languageChange = () => {
  if (value === 'keyArrEn' || value === 'keyArrEnShift') {
    value = 'keyArrRu';
  } else if (value === 'keyArrRu'  || value === 'keyArrRuShift') {
    value = 'keyArrEn';
  }
  localStorage.value = value;
  // console.log("язык поменялся " + value);
};
localStorage.value = value;


createKeyBoard(lang);