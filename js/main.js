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

let figure = [];
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

createFigure(5, 10);

// Двигаем фигуру вниз
let canMoveByX = true;
let canMoveByY = true;

// Проверяем пространство, куда должна переместиться фигура
function isFreeX(x) {
  figure.forEach(el => {
    const coordX = +el.getAttribute('data-x');
    const coordY = +el.getAttribute('data-y');
    const newSection = sectionsArr.find(elem => {
      return +elem.getAttribute('data-x') == (coordX + x) && +elem.getAttribute('data-y') == coordY;
    });

    if (newSection == undefined || newSection.classList.contains('tetris__block--static')) {
      canMoveByX = false;
      return;
    }
  });
}

function isFreeY() {
  figure.forEach(el => {
    const coordX = +el.getAttribute('data-x');
    const coordY = +el.getAttribute('data-y');
    const newSection = sectionsArr.find(elem => {
      return +elem.getAttribute('data-x') == coordX && +elem.getAttribute('data-y') == (coordY + 1);
    });

    if (+coordY > 23 || newSection.classList.contains('tetris__block--static')) {
      canMoveByY = false;
      return;
    }
  });
}

// Убираем старую фигуру и создаем новую
function newFigure(x, y) {
  figure.forEach( (el, i) => {
    const coordX = +el.getAttribute('data-x');
    const coordY = +el.getAttribute('data-y');
    const newBlock = sectionsArr.find(elem => {
      return +elem.getAttribute('data-x') == (coordX + x) && +elem.getAttribute('data-y') == (coordY + y);
    });

    el.classList.remove('tetris__block');
    figure.splice(i, 1, newBlock);
  });
  figure.forEach(el => {
    el.classList.add('tetris__block');
  });
}

let currentState = 0;
// Вращение фигуры
function rotateFigure() {
  const stateVariants = figuresList[currentFigure][3].length;
  const figureNewState = figuresList[currentFigure][3][currentState];
  if (stateVariants) {
    figure.forEach( (el, i) => {
      const coordX = +el.getAttribute('data-x');
      const coordY = +el.getAttribute('data-y');
      const newCoordX = figureNewState[i][0];
      const newCoordY = figureNewState[i][1];
      const newBlock = sectionsArr.find(elem => {
        return +elem.getAttribute('data-x') == (coordX + newCoordX) && +elem.getAttribute('data-y') == (coordY + newCoordY);
      });

      el.classList.remove('tetris__block');
      figure.splice(i, 1, newBlock);
    });
    figure.forEach(el => {
      el.classList.add('tetris__block');
    });
    ++currentState;
    if (currentState == stateVariants) {
      currentState = 0;
    }
  }
}

function moveDown() {
  // Проверяем на наличие препятствий пространство под фигурой
  isFreeY();

  // Если препятствий нет - двигаем фигуру вниз
  if (canMoveByY) {
    newFigure(0, 1);
  } else {
    figure.forEach(el => {
      el.classList.add('tetris__block--static');
    });
    figure = [];
    createFigure(5, 10);
    canMoveByY = true;
    currentState = 0;
  }
}

setInterval(moveDown, 500);

// Обрабатываем нажатие стрелок
function moveFigure(e) {
  if (e.code == 'ArrowLeft') {
    isFreeX(-1);
    canMoveByX && newFigure(-1, 0);
    canMoveByX = true;
  }
  if (e.code == 'ArrowDown') {
    isFreeY();
    canMoveByY && newFigure(0, 1);
    canMoveByY = true;
  }
  if (e.code == 'ArrowRight') {
    isFreeX(1);
    canMoveByX && newFigure(1, 0);
    canMoveByX = true;
  }
  if (e.code == 'ArrowUp') {
    isFreeX(-1);
    isFreeX(1);
    canMoveByX && rotateFigure();
    canMoveByX = true;
  }
}

addEventListener('keydown', moveFigure);
