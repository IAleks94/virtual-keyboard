let body = document.querySelector('body');
let input = document.createElement('textarea');
input.className = 'input-board';
body.append(input);
let value = localStorage.value || 'keyArrEn';

function createKeyBoard(leng, target = false) {
  if (document.querySelector('.board')) {
    document.querySelector('.board').remove();
  }
  let board = document.createElement('div');
  board.className = 'board';
  body.append(board);
  for (let line of leng[value]) {
    for (let key of line) {
      board.append(createKey(key, target));
    }
  }
}


function createKey(keyValue, target = false) {
  let key = document.createElement('div');
  key.classList.add(`key`) ;
  if (keyValue.length > 4) {
    key.classList.add('long-key');
  } else if (keyValue.length === 1 && (target === 'CapsLock' || target === 'Shift' || target === 'shift')) {
    keyValue = keyValue.toUpperCase();
  }
  if (target === keyValue) {
    key.classList.add('active');
  }
  switch (keyValue) {
    case ' ':
      key.classList.add('Space');
      break;
    case 'right':
    case 'shift':
      key.classList.remove('long-key');
      break;
  }
  key.id = keyValue;
  if (key.id === 'Ctrl') {
    key.id = 'Control';
  } else if (key.id === 'Win') {
    key.id = 'Meta';
  } else if (key.id === 'DEL') {
    key.id = 'Delete';
  }
  key.textContent = `${keyValue}`;
  key.addEventListener('mousedown', (evt) => keyDownHendler({
    key: evt.target.id
  }));
  key.addEventListener('mouseup', (evt) => keyUpHendler({
    key: evt.target.id
  }));
  return key;
}
document.addEventListener('keydown', (evt) => keyDownHendler(evt));
document.addEventListener('keyup', (evt) => keyUpHendler(evt));
//document.addEventListener('mousedown', (evt) => console.log(evt));


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

};



function keyDownHendler(evt) {
  console.log(evt);
  let key = evt.key;
  sortPrevent(evt, key);
  console.log(key);

  switch (key) {
    case 'ArrowUp':
      key = '↑';
      break;
    case 'ArrowLeft':
      key = "←";
      break;
    case 'ArrowDown':
      key = "↓";
      break;
    case 'ArrowRight':
      key = "→";
      break;
    case 'Tab':
      inputKey('    ');
      break;
    case 'Backspace':
      Backspace();
      break;
    case 'Delete':
      Delete();
      break
    case 'Enter':
      inputKey('\n');
      break;
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

  let virtualKey = document.getElementById(key);
  if (virtualKey == null) {
    languageChange();
    createKeyBoard(lang);
    keyDownHendler(evt);
  }
  console.log('virtualKey ' + virtualKey);
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
  if (key === 'Shift' || key === 'shift') {
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
  if ((key === 'En' || key === 'Ру')) {
    languageChange();
    createKeyBoard(lang);
  }
  active(virtualKey);

  if (key.length < 2 && key !== '↑' && key !== "←" && key !== "↓" && key !== "→") {
    inputKey(key);
  }
}

function keyUpHendler(evt) {
  let key = evt.key;
  console.log(key);
  switch (key) {
    case 'ArrowUp':
      key = '↑';
      break;
    case 'ArrowLeft':
      key = "←";
      break;
    case 'ArrowDown':
      key = "↓";
      break;
    case 'ArrowRight':
      key = "→";
      break;
    case 'CapsLock':
      return;
    case 'Shift':
    case 'shift':
    return;
    //   languageMod();
    //   createKeyBoard(lang);
      break;
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
  let virtualKey = document.getElementById(key);

  console.log(virtualKey);
  unActive(virtualKey);

}


function inputKey(key) {
  input.setRangeText(`${key}`, input.selectionStart, input.selectionEnd, "end");
}

function Backspace() {
  input.setRangeText("", input.selectionStart, input.selectionEnd, "end");

  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText("", input.selectionStart - 1, input.selectionEnd, "end")
  }
}

function Delete() {
  if (input.selectionStart === input.selectionEnd) {
    input.setRangeText("", input.selectionStart, input.selectionEnd + 1, "end")
  } else if (input.selectionStart != input.selectionEnd) {
    input.setRangeText("", input.selectionStart, input.selectionEnd, "end");
  }
}


function active(target) {
  console.log(`Нажата кнопка   ${target}`);
  target.classList.add('active');
}

function unActive(target) {
  console.log(`Отжата кнопка   ${target}`);
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
  console.log("язык поменялся " + value);
};
localStorage.value = value;

function selectDelit() {
  let selection = document.getSelection;
  selection.deleteFromDocument();
}
createKeyBoard(lang);