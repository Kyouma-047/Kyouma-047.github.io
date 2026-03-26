document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Анимация появления элементов при скролле ---
    // Используем Intersection Observer API для отслеживания видимости элементов
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Срабатывает, когда 10% элемента видно
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Анимируем только один раз
            }
        });
    }, observerOptions);

    // Находим все элементы с классом .hidden и начинаем за ними следить
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    // --- 2. Плавный скролл к контактам ---
    window.scrollToContact = function(event) {
        // Предотвращаем стандартное поведение ссылки
        if(event) event.preventDefault();
        
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ 
            behavior: 'smooth' 
        });
    };


    // --- 3. Валидация и обработка формы ---
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Останавливаем перезагрузку страницы

        // Получаем данные
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Простая валидация
        if (name === '' || email === '' || message === '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Проверка формата email (простая регулярка)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите корректный email адрес.');
            return;
        }

        // Имитация отправки данных
        const submitBtn = contactForm.querySelector('button');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Отправка...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Спасибо, ${name}! Ваше сообщение успешно отправлено.`);
            contactForm.reset(); // Очистить форму
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
});
