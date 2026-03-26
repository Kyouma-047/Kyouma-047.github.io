/* ============================================
   JAVASCRIPT — script.js
   ============================================ */

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================
    // 1. Мобильное меню
    // ============================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Закрыть меню при клике на ссылку
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ============================================
    // 2. Плавный скролл к контактам
    // ============================================
    const contactBtn = document.getElementById('contactBtn');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ============================================
    // 3. Кнопка "Скачать резюме" (заглушка)
    // ============================================
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Функция скачивания резюме будет доступна вскоре!');
        });
    }

    // ============================================
    // 4. Анимация появления при скролле
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Анимация только один раз
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ============================================
    // 5. Валидация формы контактов
    // ============================================
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Сброс предыдущих ошибок
            resetErrors();
            
            let isValid = true;

            // Валидация имени (только буквы, минимум 2 символа)
            const nameValue = nameInput.value.trim();
            const nameRegex = /^[а-яА-Яa-zA-Z\s]{2,}$/;
            
            if (!nameRegex.test(nameValue)) {
                showError('name', 'Имя должно содержать минимум 2 буквы');
                isValid = false;
            }

            // Валидация email
            const emailValue = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(emailValue)) {
                showError('email', 'Введите корректный email адрес');
                isValid = false;
            }

            // Валидация сообщения (минимум 10 символов)
            const messageValue = messageInput.value.trim();
            
            if (messageValue.length < 10) {
                showError('message', 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }

            // Если все валидно
            if (isValid) {
                // Имитация отправки формы
                formStatus.textContent = 'Сообщение успешно отправлено!';
                formStatus.className = 'form-status success';
                
                // Очистка формы
                contactForm.reset();
                
                // Скрыть сообщение через 5 секунд
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.className = 'form-status';
                }, 5000);
            } else {
                formStatus.textContent = 'Пожалуйста, исправьте ошибки в форме';
                formStatus.className = 'form-status error';
            }
        });
    }

    // ============================================
    // Вспомогательные функции
    // ============================================

    // Показать ошибку
    function showError(fieldId, message) {
        const input = document.getElementById(fieldId);
        const errorSpan = document.getElementById(fieldId + 'Error');
        
        if (input) {
            input.classList.add('error');
        }
        
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    // Сбросить все ошибки
    function resetErrors() {
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
        
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        if (formStatus) {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }
    }

    // ============================================
    // 6. Изменение навбара при скролле
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
            } else {
                navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // ============================================
    // 7. Логирование для отладки
    // ============================================
    console.log('Резюме загружено успешно!');
    console.log('Файлы: index.html, style.css, script.js');
});
