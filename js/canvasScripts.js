var htmlCanvas001 = document.getElementById("canvas001");
var canvas001 = htmlCanvas001.getContext("2d");
htmlCanvas001.style.backgroundColor = "black";
htmlCanvas001.width = window.innerWidth - 4;
htmlCanvas001.height = window.innerHeight - 4;

var maxMouseTrigDist = 150;
var circleValue = 200;
var radius = Math.random() * 25 + 5;
var maxRadius = 50;

// Уравнивание размера холста в соответсвии с размерами окна браузера.
window.addEventListener("resize", function () {
  htmlCanvas001.width = window.innerWidth;
  htmlCanvas001.height = window.innerHeight;
  init();
});

var mouse = {
  x: undefined,
  y: undefined,
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  console.log(mouse);
});

/* color =  `rgba(`+ Math.random() * 255 + ',' + Math.random() * 255 + `,` + Math.random() * 255 + ',' + Math.random() +`)`; */
/*
   (PI * 2) radians = 360 degrees.
   PI radians = 180 degress.
   (PI / 2) radians = 90 degrees.
   (PI / 3) raians = 60 degrees.
   (PI / 4) radians = 45 degrees. */
/* 30 degree * (PI / 180) = ~0.52 = 0.6; ---> 30 * 6 = 180 degree.
   PI / 3 = (3.14 / 3) * (180 / 3.14) = ~59,6 = 60 degree.
   15 degree * (PI / 180) = ~0.26 = 0.3 
   1 degree * (PI / 180) = ~0,017 = 0.02  */

// Объект, описывающий свойства и поведение элемента.
function Circle() {
  // Случаный цвет заливки объекта.
  this.hsl = Math.random() * 360;
  // Свойта объекта.
  this.radius = radius;
  this.minRadius = Math.random() * radius + 1;
  this.x =
    Math.random() * (htmlCanvas001.width - this.radius * 2) + this.radius;
  this.y =
    Math.random() * (htmlCanvas001.height - this.radius * 2) + this.radius;
  // Вектор смещения окружности за 1 кадр.
  // Направление вектра может быть как отрицательное, так и положительное.
  this.dx = (Math.random() - 0.5) * 3;
  this.dy = (Math.random() - 0.5) * 3;
  // Поведение объекта.
  // Создание анонимной функции для отрисовки окружности.
  this.draw = function () {
    canvas001.beginPath();
    canvas001.strokeStyle = "white";
    canvas001.lineWidth = 2;
    canvas001.fillStyle = "hsl(" + this.hsl + ", 50%, 50%)";
    canvas001.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    canvas001.fill();
    canvas001.stroke();
    canvas001.closePath();
  };
  // Создание анонимной функции для изменения координат окружности.
  this.update = function () {
    this.draw();
    if (
      this.x + this.radius > htmlCanvas001.width ||
      this.x - this.radius < 0
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y + this.radius > htmlCanvas001.height ||
      this.y - this.radius < 0
    ) {
      this.dy = -this.dy;
    }
    if (
      mouse.x - this.x < maxMouseTrigDist && // Справа от объекта.
      mouse.x - this.x > -maxMouseTrigDist && // Слева от объекта.
      mouse.y - this.y < maxMouseTrigDist && // Снизу от объекта.
      mouse.y - this.y > -maxMouseTrigDist && // Сверху от объекта.
      this.radius < maxRadius
    ) {
      this.radius += 1;
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    //Смещение по координате x.
    this.x += this.dx;
    // Смещение по по координате y.
    this.y += this.dy;
  };
}
// Заполнение массива объектами типа Circle.
var circleArray = [];
for (let i = 0; i < circleValue; i++) {
  circleArray.push(new Circle());
}
// Функция отрисовки объектов типа Circle.
function animateDrawFillArc() {
  canvas001.clearRect(0, 0, htmlCanvas001.width, htmlCanvas001.height);
  // Отрисовка всех элементов в массиве.
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  // Рекурсионный вызов функции.
  requestAnimationFrame(animateDrawFillArc);
}
function init() {
  circleArray = [];
  for (let i = 0; i < circleValue; i++) {
    circleArray.push(new Circle());
  } 
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
// Отрисовка объектов типа окружности.
animateDrawFillArc();
