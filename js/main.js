const field = document.querySelector('.tetris__field');

// Создание сетки внутри игрового поля

// Разбивка поля на секции
for (let i=1; i<241; i++) {
  const section = document.createElement('div');
  section.classList.add('tetris__section');
  field.appendChild(section);
}


// Добавление координат для каждой секции
const sections = Array.from(document.querySelectorAll('.tetris__section'));

let axisX = 1;
let axisY = 1;

sections.map(el => {
  el.setAttribute('data-X', axisX);
  el.setAttribute('data-Y', axisY);
  if (axisX < 10) {
    ++axisX;
  } else {
    axisX = 1;
    ++axisY;
  }
});


const figures = [
  // Квадрат
  [
    [1, 0],
    [1, -1],
    [0, -1]
  ],
  // Буква "т"
  [
    [1, 0],
    [2, 0],
    [1, -1]
  ],
  // Палка
  [
    [0, -1],
    [0, -2],
    [0, -3]
  ],
  // Буква "z"
  [
    [1, 0],
    [0, -1],
    [-1, -1]
  ],
  // Буква "z" зеркальная
  [
    [1, 0],
    [1, -1],
    [2, -1]
  ],
  // Буква "Г"
  [
    [1, -2],
    [0, -2],
    [0, -1]
  ],
  // Буква "Г" зеркальная
  [
    [-1, -2],
    [0, -2],
    [0, -1]
  ]
];

const getRandomFigure = function() {
  return Math.floor(Math.random() * (7 - 0));
}

function createMainBlock(x, y) {
  const activeBlock = sections.find(el => {
    return el.getAttribute('data-x') == x && el.getAttribute('data-y') == y;
  })
  activeBlock.classList.add('tetris__block');

  const figureSections = figures[getRandomFigure()];
  console.log(getRandomFigure());
  console.log(figureSections);
  figureSections.forEach(el => {
    const block = sections.find(elem => {
      return elem.getAttribute('data-x') == (x+el[0]) && elem.getAttribute('data-y') == (y+el[1]);
    });
    block.classList.add('tetris__block');
  });
}

createMainBlock(5 , 10);
