// ===== Плавное появление секций при прокрутке (Intersection Observer) =====
document.addEventListener('DOMContentLoaded', () => {
    // Выбираем все секции и элементы, которые хотим анимировать
    const animatedElements = document.querySelectorAll('.section, .timeline-card, .edu-card, .skills-category, .contact-form, .contact-info');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Можно прекратить наблюдение после появления
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });
    
    // Добавляем класс fade-up и начинаем наблюдение
    animatedElements.forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });
    
    // ===== Кнопка "Скачать резюме" (заглушка PDF) =====
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Создаем заглушку: имитация скачивания PDF
            // В реальном проекте здесь могла бы быть ссылка на файл
            alert('Функция скачивания резюме: в реальном проекте здесь будет PDF-файл.\nСейчас доступна только демо-версия.');
            
            // Альтернативный вариант: создать Blob и предложить скачать .txt (как заглушку)
            const fakePDFContent = "Резюме: Алиханов Павел\nИнженер\nОпыт работы: ...\nОбразование: МГТУ СТАНКИН\nНавыки: JS, React, Python, Docker...";
            const blob = new Blob([fakePDFContent], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Alikhanov_Pavel_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        });
    }
    
    // ===== Кнопка "Связаться со мной" - плавный скролл к контактной форме =====
    const contactBtn = document.getElementById('contactScrollBtn');
    const contactSection = document.getElementById('contact');
    
    if (contactBtn && contactSection) {
        contactBtn.addEventListener('click', (e) => {
            e.preventDefault();
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // ===== Валидация формы обратной связи =====
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formStatus = document.getElementById('formStatus');
    
    // Функция валидации email
    function isValidEmail(email) {
        const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Функция очистки ошибок
    function clearErrors() {
        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
    }
    
    // Функция показа ошибки
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();
            
            let isValid = true;
            
            // Валидация имени
            const nameValue = nameInput.value.trim();
            if (nameValue === '') {
                showError(nameError, 'Пожалуйста, введите ваше имя');
                isValid = false;
            } else if (nameValue.length < 2) {
                showError(nameError, 'Имя должно содержать минимум 2 символа');
                isValid = false;
            }
            
            // Валидация email
            const emailValue = emailInput.value.trim();
            if (emailValue === '') {
                showError(emailError, 'Пожалуйста, введите email');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                showError(emailError, 'Введите корректный email (например, name@domain.com)');
                isValid = false;
            }
            
            // Валидация сообщения
            const messageValue = messageInput.value.trim();
            if (messageValue === '') {
                showError(messageError, 'Пожалуйста, введите сообщение');
                isValid = false;
            } else if (messageValue.length < 10) {
                showError(messageError, 'Сообщение должно содержать минимум 10 символов');
                isValid = false;
            }
            
            // Если форма валидна — имитация отправки
            if (isValid) {
                formStatus.textContent = '✓ Сообщение успешно отправлено! (демо-режим)';
                formStatus.className = 'form-status success';
                formStatus.style.display = 'block';
                
                // Опционально: очистить форму
                form.reset();
                
                // Скрыть сообщение через 4 секунды
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 4000);
            } else {
                formStatus.textContent = 'Пожалуйста, исправьте ошибки в форме';
                formStatus.className = 'form-status error';
                formStatus.style.display = 'block';
                
                setTimeout(() => {
                    if (formStatus.className === 'form-status error') {
                        formStatus.style.display = 'none';
                    }
                }, 4000);
            }
        });
    }
    
    // Добавляем дополнительную анимацию для интерактивности (эффект при наведении на карточки)
    const cards = document.querySelectorAll('.timeline-card, .edu-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.25s ease';
        });
    });
    
    // ===== Небольшое улучшение: плавный скролл для якорей (если потребуется) =====
    // Уже реализовано для кнопки "Связаться"
    
    console.log('Страница полностью загружена, все анимации и валидации активны');
});
