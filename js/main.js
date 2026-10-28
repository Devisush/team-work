document.addEventListener('DOMContentLoaded', () => {
    // === 1. ОГРАНИЧЕНИЕ ДАТ В КАЛЕНДАРЕ ===
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');

    if (checkInInput && checkOutInput) {
        // Устанавливаем минимальную дату для заезда — сегодня
        const today = new Date().toISOString().split('T')[0];
        checkInInput.min = today;

        // При изменении даты заезда корректируем минимальную дату выезда
        checkInInput.addEventListener('change', (e) => {
            checkOutInput.min = e.target.value;
            if (checkOutInput.value && checkOutInput.value < e.target.value) {
                checkOutInput.value = e.target.value;
            }
        });
    }

    // === 2. ОБРАБОТКА ФОРМЫ БРОНИРОВАНИЯ ===
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Запрещаем стандартную перезагрузку

            // Собираем данные формы
            const bookingData = {
                room: document.getElementById('room-select').value,
                checkIn: checkInInput.value,
                checkOut: checkOutInput.value,
                guests: document.getElementById('guests').value,
                phone: document.getElementById('phone').value
            };

            // Эффект успешной отправки
            bookingForm.innerHTML = `
                <div class="success-message" style="text-align: center; padding: 40px 10px;">
                    <span style="font-size: 50px;">🌲</span>
                    <h3 style="margin-top: 20px; font-size: 22px; color: #1b4332;">Заявка принята!</h3>
                    <p style="color: #40514e; margin-top: 10px;">Мы свяжемся с вами по номеру ${bookingData.phone} в течение 15 минут для подтверждения.</p>
                    <a href="index.html" class="btn btn-secondary" style="margin-top: 30px; display: inline-block; color: #1b4332; border-color: #1b4332;">На главную</a>
                </div>
            `;
        });
    }

    // === 3. ДОПОЛНЕНИЕ ДЛЯ КНОПОК ПЕРЕХОДА ===
    // Добавляет эффект плавного исчезновения (fade-out) при клике на ссылки
    const links = document.querySelectorAll('a:not([target="_blank"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Проверяем, что ссылка ведет на внутреннюю страницу html
            if (href && href.includes('.html')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.4s ease';

                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
});
