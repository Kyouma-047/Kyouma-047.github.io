// Переменные для хранения данных
let currentAge = null;

// Функция изменения фамилии
function changeSurname() {
    let newSurname = document.getElementById('surnameInput').value;
    
    if (newSurname === "") {
        alert("Пожалуйста, введите фамилию!");
        return;
    }
    
    // Обновляем отображение фамилии
    document.getElementById('displaySurname').innerHTML = newSurname;
    
    // Обновляем полное имя в шапке
    let name = document.getElementById('displayName').innerHTML;
    document.getElementById('fullName').innerHTML = `${name} ${newSurname}`;
    
    // Очищаем поле ввода
    document.getElementById('surnameInput').value = "";
}

// Функция изменения имени
function changeName() {
    let newName = document.getElementById('nameInput').value;
    
    if (newName === "") {
        alert("Пожалуйста, введите имя!");
        return;
    }
    
    // Обновляем отображение имени
    document.getElementById('displayName').innerHTML = newName;
    
    // Обновляем полное имя в шапке
    let surname = document.getElementById('displaySurname').innerHTML;
    document.getElementById('fullName').innerHTML = `${newName} ${surname}`;
    
    // Очищаем поле ввода
    document.getElementById('nameInput').value = "";
}

// Функция запроса возраста (из задания 3)
function askAge() {
    let age;
    let isValid = false;
    
    while (!isValid) {
        age = prompt("Введите ваш возраст:", "");
        
        if (age === null) {
            alert("Пожалуйста, введите возраст!");
            continue;
        }
        
        if (age === "") {
            alert("Вы не ввели возраст. Попробуйте снова!");
            continue;
        }
        
        age = Number(age);
        
        if (isNaN(age) || age <= 0 || age > 120) {
            alert("Пожалуйста, введите корректный возраст (от 1 до 120)");
            continue;
        }
        
        let confirmAge = confirm(`Вы ввели возраст: ${age} лет. Всё верно?`);
        
        if (confirmAge) {
            currentAge = age;
            document.getElementById('ageResult').innerHTML = `
                <span style="color: #2ecc71;">✅ Ваш возраст:</span>
                <span class="age-value">${age} лет</span>
            `;
            isValid = true;
        } else {
            alert("Давайте попробуем еще раз!");
        }
    }
}

// Функция изменения цвета фона на случайный
function changeRandomColor() {
    const colors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    document.body.style.background = colors[randomIndex];
    
    // Сохраняем цвет в localStorage
    localStorage.setItem('savedBgColor', colors[randomIndex]);
}

// Функция сброса цвета фона
function resetColor() {
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    localStorage.removeItem('savedBgColor');
}

// Восстанавливаем сохраненный цвет фона при загрузке
function loadSavedColor() {
    const savedColor = localStorage.getItem('savedBgColor');
    if (savedColor) {
        document.body.style.background = savedColor;
    }
}

// Загружаем сохраненные данные при запуске страницы
loadSavedColor();
