window.onload = function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var mazeImg = document.getElementById("maze");
    var faceImg = document.getElementById("face");

    // обработка нажатия кнопок
    window.onkeydown = processKey;

    // начальная позиция
    var x = 0;
    var y = 0;

    // смещение
    var dx = 0;
    var dy = 0;

    var timer;

    // отрисовать фон лабиринта
    drawMaze(268, 5);

    // отрисовка фона
    function drawMaze(startingX, startingY) {
        canvas.width = mazeImg.width;
        canvas.height = mazeImg.height;

        // Рисуем лабиринт
        context.drawImage(mazeImg, 0,0);

        // Рисуем значок
        x = startingX;
        y = startingY;
        context.drawImage(faceImg, x, y);
        context.stroke();

        // Рисуем следующий кадр через 10 миллисекунд
        timer = setTimeout(drawFrame, 10);
    }

    // Обработка нажатия кнопок
    function processKey(e) {
        e.preventDefault();
        // Если значок находится в движении, останавливаем его
        dx = 0;
        dy = 0;

        // Если нажата стрелка вверх, начинаем двигаться вверх
        if (e.keyCode == 38) {
            dy = -1;
        }

        // Если нажата стрелка вниз, начинаем двигаться вниз
        if (e.keyCode == 40) {
            dy = 1;
        }

        // Если нажата стрелка влево, начинаем двигаться влево
        if (e.keyCode == 37) {
            dx = -1;
        }

        // Если нажата стрелка вправо, начинаем двигаться вправо
        if (e.keyCode == 39) {
            dx = 1;
        }
    }

    // Отрисовка кадра
    function drawFrame() {
        // Обновляем кадр только если значок движется
        if (dx != 0 || dy != 0) {
            // Закрашиваем перемещение значка желтым цветом
            context.beginPath();
            context.fillStyle = "rgb(254,244,207)";
            context.rect(x, y, 15, 15);
            context.fill()

            // Обновляем координаты значка, создавая перемещение
            x += dx;
            y += dy;

            // Проверка столкновения со стенками лабиринта
            if (checkForCollision()) {
                x -= dx;
                y -= dy;
                dx = 0;
                dy = 0;
            }

            // Перерисовываем значок
            context.drawImage(faceImg, x, y);

            // Проверяем дошел ли пользователь до финиша
            if (y > (canvas.height - 17)) {
                alert("Код: 1346790. Пиши ответ в личные сообщения группы профкома");
                return;
            }
        }

        // Рисуем следующий кадр через 10 миллисекунд
        timer = setTimeout(drawFrame, 10);
    }

    function checkForCollision() {
        // Перебираем все пикселы и инвертируем их цвет
        var imgData = context.getImageData(x-1, y-1, 15+2, 15+2);
        var pixels = imgData.data;

        // Получаем данные для одного пиксела
        for (var i = 0; n = pixels.length, i < n; i += 4) {
            var red = pixels[i];
            var green = pixels[i+1];
            var blue = pixels[i+2];
            var alpha = pixels[i+3];

            // Смотрим на наличие черного цвета стены, что указывает на столкновение
            if (red == 0 && green == 0 && blue == 0) {
                return true;
            }
            // Смотрим на наличие серого цвета краев, что указывает на столкновение
            if (red == 169 && green == 169 && blue == 169) {
                return true;
            }
        }
        // Столкновения не было
        return false;
    }
}
