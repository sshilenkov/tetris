const field = document.querySelector('.tetris__field');

// Создание сетки внутри игрового поля

// Разбивка поля на секции
for (let i=1; i<241; i++) {
  const section = document.createElement('div');
  section.classList.add('tetris__section');
  field.appendChild(section);
}


// Добавление координат для каждой секции
const sections = document.querySelectorAll('.tetris__section');
const sectionsArr = Array.from(sections);

let axisX = 1;
let axisY = 1;

sectionsArr.map(el => {
  el.setAttribute('data-X', axisX);
  el.setAttribute('data-Y', axisY);
  if (axisX < 10) {
    ++axisX;
  } else {
    axisX = 1;
    ++axisY;
  }
});

// Координаты фигур
const figuresList = [
  // Квадрат
  [
    [1, 0],
    [1, -1],
    [0, -1],
    []
  ],
  // Буква "T"
  [
    [1, 0],
    [2, 0],
    [1, -1],
    [
      // Поворот на 90 гардусов
      [
        [1, -1],
        [1, 0],
        [0, -1],
        [1, -1]
      ],
      // Поворот на 180 градусов
      [
        [0, 0],
        [0, -2],
        [-1, -1],
        [-2, 0]
      ],
      // Поворот на 270 гардусов
      [
        [-1, 1],
        [-1, 1],
        [-1, 1],
        [0, 0]
      ],
      // Поворот на 360 градусов
      [
        [0, 0],
        [0, 1],
        [2, 1],
        [1, 1]
      ]
    ]
  ],
  // Палка
  [
    [0, -1],
    [0, -2],
    [0, -3],
    [
      // Поворот на 90 гардусов
      [
        [-1, -1],
        [0, 0],
        [1, 1],
        [2, 2]
      ],
      // Поворот на 180 градусов
      [
        [1, 1],
        [0, 0],
        [-1, -1],
        [-2, -2]
      ]
    ]
  ],
  // Буква "z"
  [
    [1, 0],
    [0, -1],
    [-1, -1],
    [
      // Поворот на 90 гардусов
      [
        [-1, 1],
        [-1, 0],
        [0, 0],
        [0, 1]
      ],
      // Поворот на 180 градусов
      [
        [1, -1],
        [1, 0],
        [0, 0],
        [0, -1]
      ]
    ]
  ],
  // Буква "z" зеркальная
  [
    [1, 0],
    [2, -1],
    [1, -1],
    [
      // Поворот на 90 гардусов
      [
        [2, 1],
        [1, 0],
        [-1, 1],
        [0, 0]
      ],
      // Поворот на 180 градусов
      [
        [-2, -1],
        [-1, 0],
        [1, -1],
        [0, 0]
      ]
    ]
  ],
  // Буква "L"
  [
    [1, 0],
    [0, -2],
    [0, -1],
    [
      // Поворот на 90 гардусов
      [
        [0, 0],
        [0, 0],
        [2, 2],
        [2, 0]
      ],
      // Поворот на 180 градусов
      [
        [0, -2],
        [0, 0],
        [-1, -1],
        [-1, -1]
      ],
      // Поворот на 270 гардусов
      [
        [0, 2],
        [1, -1],
        [0, 0],
        [-1, 1]
      ],
      // Поворот на 360 градусов
      [
        [0, 0],
        [-1, 1],
        [-1, -1],
        [0, 0]
      ]
    ]
  ],
  // Буква "L" зеркальная
  [
    [1, 0],
    [1, -1],
    [1, -2],
    [
      // Поворот на 90 гардусов
      [
        [1, 0],
        [0, -1],
        [-1, 0],
        [-2, 1]
      ],
      // Поворот на 180 градусов
      [
        [-1, 0],
        [0, -1],
        [0, -1],
        [1, 0]
      ],
      // Поворот на 270 гардусов
      [
        [0, 0],
        [0, 2],
        [2, 2],
        [0, 0]
      ],
      // Поворот на 360 градусов
      [
        [0, 0],
        [0, 0],
        [-1, -1],
        [1, -1]
      ]
    ]
  ]
];

// Выбор случайного числа от 0 до 6
const getRandomFigure = function() {
  return Math.floor(Math.random() * 7);
}

// Переменная, в которой хранятся блоки фигуры на текущий момент
let figure = [];
// Переменная, в которой хранятся блоки для следующего положения фигуры
let newFigure = [];
// Переменная, в которой хранится номер текущей фигуры
let currentFigure;

// Создаем фигуру
function createFigure(x, y) {
  // Создаем главный блок (всегда левый нижний)
  const mainBlock = sectionsArr.find(el => {
    return el.getAttribute('data-x') == x && el.getAttribute('data-y') == y;
  })
  mainBlock.classList.add('tetris__block');
  figure.push(mainBlock);

  // Получаем координаты случайной фигуры из массива и присваиваем классы
  currentFigure = getRandomFigure();
  const figureSections = figuresList[currentFigure];
  figureSections.forEach( (el, i) => {
    if (i == 3) {
      return;
    }
    const block = sectionsArr.find(elem => {
      return elem.getAttribute('data-x') == (x+el[0]) && elem.getAttribute('data-y') == (y+el[1]);
    });
    block.classList.add('tetris__block');
    figure.push(block);
  });
}

createFigure(5, 5);
let canMove = true;

// Проверяем новую позицию
function newPosition(x, y) {
  figure.forEach( (el, i) => {
    const coordX = +el.getAttribute('data-x');
    const coordY = +el.getAttribute('data-y');
    const newBlock = sectionsArr.find(elem => {
      return +elem.getAttribute('data-x') == (coordX + x) && +elem.getAttribute('data-y') == (coordY + y);
    });

    newFigure.splice(i, 1, newBlock);
  });
  newFigure.forEach(el => {
    if (el == undefined || el.classList.contains('tetris__block--static')) {
      canMove = false;
    }
  });
}

function moveFigure() {
  figure.forEach(el => {
    el.classList.remove('tetris__block');
  });
  figure.length = 0;
  figure = newFigure.slice();
  newFigure.length = 0;
  figure.forEach(el => {
    el.classList.add('tetris__block');
  });
}

// Проверяем линии на заполненность
function isLinesFull() {
  for (let y = 5; y < 25; y++) {  //проверяем поочередно все линии видимого поля
    let fullLine = [];
    for (let x = 1; x < 11; x++) {  //проверяем каждую ячейку текущей линии
      sectionsArr.forEach((element) => {  //проходимся по всему полю
        const coordX = +element.getAttribute('data-x');
        const coordY = +element.getAttribute('data-y');
        if (coordX == x && coordY == y && element.classList.contains('tetris__block--static')) {  //если в текущей линии текущая ячейка содержит указанный класс
          fullLine.push(element);   //добавляем эту ячейку в переменную
        }
      });
    }
    if (fullLine.length == 10) {  //если текущая линия заполнена
      fullLine.forEach(el => {
        el.classList.remove('tetris__block','tetris__block--static'); //стираем заполненную линию на поле
      });
      let sectionsAbove = [];
      for (let above = 5; above <= y; above++) {  //проверяем ячейки над стертой линией
        sectionsArr.forEach((element) => {  //проходимся по всему полю
          let coordY = +element.getAttribute('data-y');
          if (coordY == above && element.classList.contains('tetris__block--static')) {  //если над стертой линией есть заполненные ячейки - добавляем их в отдельный массив
            sectionsAbove.push(element);
          }
        });
      }
      sectionsAbove.forEach(el => {   //проходим по всем ячейкам над стертой линией и смещаем их вниз
        el.classList.remove('tetris__block','tetris__block--static');
        let coordX = +el.getAttribute('data-x');
        let coordY = +el.getAttribute('data-y');
        let sectionUnder = sectionsArr.find(elem => {
          if (elem.getAttribute('data-x') == coordX && elem.getAttribute('data-y') == (coordY + 1)) {
            return elem;
          }
        });
        sectionUnder.classList.add('tetris__block','tetris__block--static');
      });
    }
  }
}

let currentState = 0;
// Вращение фигуры
function rotateFigure() {
  const stateVariants = figuresList[currentFigure][3].length;   //кол-во вариантов вращения текущей фигуры
  const figureNewState = figuresList[currentFigure][3][currentState];   //новое положение фигуры
  if (stateVariants) {  //если фигуру можно повернуть - поворачиваем
    figure.forEach( (el, i) => {
      const coordX = +el.getAttribute('data-x');
      const coordY = +el.getAttribute('data-y');
      const newCoordX = figureNewState[i][0];
      const newCoordY = figureNewState[i][1];
      const newBlock = sectionsArr.find(elem => {
        return +elem.getAttribute('data-x') == (coordX + newCoordX) && +elem.getAttribute('data-y') == (coordY + newCoordY);
      });

      newFigure.splice(i, 1, newBlock);
    });
    newFigure.forEach(el => {
      if (el == undefined || el.classList.contains('tetris__block--static')) {
        canMove = false;
      }
    });
    if (canMove) {
      moveFigure();
      ++currentState;
    }
    canMove = true;
    if (currentState == stateVariants) {
      currentState = 0;
    }
  }
}

// Если препятствий нет - двигаем фигуру вниз
function moveDown() {
  newPosition(0, 1);

  if (canMove) {
    canMove && moveFigure();
  } else {
    figure.forEach(el => {
      el.classList.add('tetris__block--static');
    });
    figure.length = 0;
    isLinesFull();
    createFigure(5, 5);
    canMove = true;
    currentState = 0;
  }
}

setInterval(moveDown, 500);

// Обрабатываем нажатие стрелок
function relocateFigure(e) {
  if (e.code == 'ArrowLeft') {
    newPosition(-1, 0);
    canMove && moveFigure(-1, 0);
    canMove = true;
  }
  if (e.code == 'ArrowDown') {
    newPosition(0, 1);
    canMove && moveFigure(0, 1);
    canMove = true;
  }
  if (e.code == 'ArrowRight') {
    newPosition(1, 0);
    canMove && moveFigure(1, 0);
    canMove = true;
  }
  if (e.code == 'ArrowUp') {
    newPosition(0, 0);
    canMove && rotateFigure();
    canMove = true;
  }
}

addEventListener('keydown', relocateFigure);
