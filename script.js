let body = document.querySelector('body');

let input = document.createElement('textarea');
input.className = 'input-board';
body.append(input);
let value = localStorage.value || 'keyArrEn';


function createKeyBoard(leng, capsLock = false, shift = false) {
  if (document.querySelector('.board')){
    document.querySelector('.board').remove();
  }
  let board = document.createElement('div');
  board.className = 'board';
  body.append(board);
  for (let line of leng[value]) {
    for (let key of line) {
      board.append(createKey(key, capsLock, shift));
    }
  }
}


function createKey(keyValue, capsLock, shift) {
  let key = document.createElement('div');
  key.className = `key`;
  if (keyValue.length > 4) {
    key.classList.add('long-key');
  } else if (keyValue.length === 1 && (capsLock || shift)) {
    keyValue = keyValue.toUpperCase();
  }
  if ((capsLock && keyValue === 'CapsLock') || (shift && keyValue === 'Shift')) {
    key.classList.add('active');
  }
  if (keyValue === ' ') {
    key.classList.add('Space');
  }
  if (keyValue === 'right') {
    key.className = `key`;
  }
  if (keyValue === 'shift') {
    key.className = `key`;
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
document.addEventListener('mousedown', (evt) => console.log(evt));

let lang = {
  keyArrEn : [
    ['`', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
    ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", 'DEL', ],
    ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", `\\`, 'Enter'],
    ["Shift", '\\', "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", ],
  ],
  keyArrEnShift : [
    ['~', '!', "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", 'Backspace', ],
    ['Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", 'DEL', ],
    ['CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', `|`, 'Enter'],
    ["Shift", '|', "z", "x", "c", "v", "b", "n", "m", "<", ">", "?", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", ],
  ],
  keyArrRu : [
    ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', ],
    ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'DEL', ],
    ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `\\`, 'Enter'],
    ["Shift", '\\', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", ],
  ],
 keyArrRuShift : [
    ['Ё', '!', '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", 'Backspace', ],
    ['Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", 'DEL', ],
    ['CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", `/`, 'Enter'],
    ["Shift", '/', "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",", '↑', "shift", ],
    ["Ctrl", "Win", "Alt", " ", "Alt", "Ctrl", "←", "↓", "→", ],
  ],
  
};



function keyDownHendler(evt) {
  console.log(evt);
  let key = evt.key;
  if (evt.shift) {
    key = key.toUpperCase();
  }
  console.log(key);
  sortPrevent(evt, key);
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
      inpurEnter('    ');
      break;
  }

  let virtualKey = document.getElementById(key);
  console.log('virtualKey ' + virtualKey);
  if (key === 'CapsLock') {
    if (event.repeat) {
      return;
    }
    if (virtualKey.classList.contains('active')) {
      createKeyBoard(lang, false, false);
      return;
    }

    createKeyBoard(lang, true, false);
  }
  if (key === 'Shift') {
    if (evt.altKey) {
      languageChange();

      createKeyBoard(lang, false, false);
    } else if (!event.repeat) {
      languageModifier();
      createKeyBoard(lang, false, true);
    }

  }
  active(virtualKey);

  if (key.length < 2 && key !== '↑' && key !== "←" && key !== "↓" && key !== "→") {
    inpurEnter(key);
  } else if (key === 'Backspace') {
    inpurBackspace();
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
      languageModifier();
      createKeyBoard(lang, false, false);
      break;
  }
  let virtualKey = document.getElementById(key);
  unActive(virtualKey);
  console.log(virtualKey);
}


function inpurEnter(key) {
  input.value += key;
}

function inpurBackspace() {
  let str = input.value;
  input.value = str.substr(0, input.value.length - 1);
}


function active(target) {
  console.log(target);
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
    case 'Delete':
      return;
  }
  if (evt.isTrusted) {
    evt.preventDefault();
  }

};

let languageModifier = () => {
  if (value === 'keyArrEnShift') {
    value = 'keyArrEn';
  } else if (value === 'keyArrRuShift') {
    value = 'keyArrRu';
  } else if (value === 'keyArrEn') {
    value = 'keyArrEnShift';
  } else if (value === 'keyArrRu') {
    value = 'keyArrRuShift';
  }
};

let languageChange = () => {
  if (value === 'keyArrEn') {
    value = 'keyArrRu';
  } else if (value === 'keyArrRu') {
    value = 'keyArrEn';
  } else if (value === 'keyArrEnShift') {
    value = 'keyArrRuShift';
  } else if (value === 'keyArrRuShift') {
    value = 'keyArrEnShift';
  }
  localStorage.value = value;
};
localStorage.value = value;
createKeyBoard(lang, false, false);