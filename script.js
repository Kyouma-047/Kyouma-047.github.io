// Ждем полной загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // Получаем элементы со страницы
    const surnameElement = document.getElementById('surname');
    const inputElement = document.getElementById('surnameInput');
    const changeSurnameBtn = document.getElementById('changeSurnameBtn');
    const changeBgBtn = document.getElementById('changeBgBtn');

    // --- Функция 1: Изменение фамилии ---
    changeSurnameBtn.addEventListener('click', () => {
        const newSurname = inputElement.value.trim(); // Убираем пробелы по краям
        
        if (newSurname !== "") {
            surnameElement.textContent = newSurname;
            inputElement.value = ""; // Очищаем поле ввода
            alert("Фамилия успешно изменена!");
        } else {
            alert("Пожалуйста, введите фамилию.");
        }
    });

    // --- Функция 2: Случайный цвет фона ---
    changeBgBtn.addEventListener('click', () => {
        // Генерируем случайный RGB цвет
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        
        const randomColor = `rgb(${r}, ${g}, ${b})`;
        
        // Применяем цвет к фону страницы
        document.body.style.backgroundColor = randomColor;
    });
});
