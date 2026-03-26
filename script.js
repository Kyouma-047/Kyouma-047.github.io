document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Мобильное меню ---
    const burger = document.getElementById('burgerMenu');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // --- 2. Анимация появления при скролле (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1, // Срабатывает, когда 10% элемента видно
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимировать только один раз
            }
        });
    }, observerOptions);

    // Следим за элементами с классом .hidden
    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 3. Плавный скролл ---
    window.scrollToContact = function(event) {
        event.preventDefault();
        const contactSection = document.getElementById('contact');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    };

    // --- 4. Валидация формы ---
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const btn = form.querySelector('button');

        // Простая проверка
        if (!name || !email || !message) {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Проверка Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email адрес.');
            return;
        }

        // Имитация отправки
        const originalText = btn.innerText;
        btn.innerText = 'Отправка...';
        btn.disabled = true;

        setTimeout(() => {
            alert(`Спасибо, ${name}! Сообщение отправлено.`);
            form.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });
});
