
document.getElementById('orderForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Настройки бота (ЗАМЕНИТЕ НА СВОИ!)
    const BOT_TOKEN = '7629341681:AAHxLszPnFlKuJn4as3av4qpQO4y9VduPf4'; // Получить у @BotFather
    const CHAT_ID = 768481286; // ID чата/группы
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
        // Показать индикатор загрузки
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        // Собираем данные формы
        const formData = new FormData(form);
        const serviceText = {
            'basic': 'Базовая печать',
            'premium': 'Премиум печать',
            'exclusive': 'Эксклюзивный заказ',
            'consultation': 'Консультация'
        }[formData.get('service')];
        
        // Формируем сообщение для Telegram
        const message = `📌 *Новый заказ 3D-печати*\n\n` +
                       `👤 *Имя:* ${formData.get('name')}\n` +
                       `📧 *Email:* ${formData.get('email')}\n` +
                       `📞 *Телефон:* ${formData.get('phone')}\n` +
                       `🛠 *Услуга:* ${serviceText}\n\n` +
                       `📝 *Описание заказа:*\n${formData.get('message')}\n\n` +
                       `🕒 ${new Date().toLocaleString()}`;
        
        // 1. Отправляем текстовое сообщение
        const textResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        
        // 2. Отправляем файл если он есть
        if(formData.get('file').size > 0) {
            const fileData = new FormData();
            fileData.append('chat_id', CHAT_ID);
            fileData.append('document', formData.get('file'));
            fileData.append('caption', `Файл от ${formData.get('name')}`);
            
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
                method: 'POST',
                body: fileData
            });
        }
        
        // Успешная отправка
        alert('✅ Ваш заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.');
        form.reset();
        
    } catch (error) {
        console.error('Ошибка отправки:', error);
        alert('⚠️ Произошла ошибка при отправке. Пожалуйста, попробуйте позже или позвоните нам.');
    } finally {
        // Восстанавливаем кнопку
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// const phone = formData.get('phone');
// if (!/^[\d\s\-\+\(\)]{10,15}$/.test(phone)) {
//     alert('Пожалуйста, введите корректный номер телефона');
//     return;
// }

// const file = formData.get('file');
// if (file.size > 20 * 1024 * 1024) {
//     alert('Файл слишком большой (макс. 20MB)');
//     return;
// }