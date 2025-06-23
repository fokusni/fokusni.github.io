document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(orderForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Здесь должна быть отправка данных на сервер
            // В демо-версии просто показываем сообщение
            console.log('Данные формы:', data);
            alert('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.');
            
            // Очистка формы
            orderForm.reset();
        });
        
        // Маска для телефона
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, '');
                let formattedValue = '';
                
                if (value.length > 0) {
                    formattedValue += '+7 (';
                    if (value.length > 1) {
                        formattedValue += value.substring(1, Math.min(4, value.length));
                    }
                    if (value.length >= 4) {
                        formattedValue += ') ' + value.substring(4, Math.min(7, value.length));
                    }
                    if (value.length >= 7) {
                        formattedValue += '-' + value.substring(7, Math.min(9, value.length));
                    }
                    if (value.length >= 9) {
                        formattedValue += '-' + value.substring(9, Math.min(11, value.length));
                    }
                }
                
                this.value = formattedValue;
            });
        }
    }
});
