document.addEventListener('DOMContentLoaded', function() {
    // Фильтрация работ
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            workCards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Модальное окно
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const photoCounter = document.getElementById('photoCounter');
    const thumbnailsContainer = document.getElementById('photoThumbnails');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentPhotos = [];
    let currentIndex = 0;
    
    // Открытие модального окна
    document.querySelectorAll('.work-image-container').forEach(container => {
        container.addEventListener('click', function() {
            const workCard = this.closest('.work-card');
            const mainPhoto = this.querySelector('img').src;
            const additionalPhotos = Array.from(workCard.querySelectorAll('.additional-photos img')).map(img => img.src);
            
            currentPhotos = [mainPhoto, ...additionalPhotos];
            currentIndex = 0;
            
            showPhoto(currentIndex);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Закрытие модального окна
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Клик по фону
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Навигация
    prevBtn.addEventListener('click', showPrevPhoto);
    nextBtn.addEventListener('click', showNextPhoto);
    
    // Клавиатурная навигация
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                showPrevPhoto();
            } else if (e.key === 'ArrowRight') {
                showNextPhoto();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    function showPhoto(index) {
        if (currentPhotos.length === 0) return;
        
        currentIndex = index;
        modalImg.src = currentPhotos[index];
        photoCounter.textContent = `${index + 1}/${currentPhotos.length}`;
        
        // Обновляем миниатюры
        thumbnailsContainer.innerHTML = '';
        currentPhotos.forEach((photo, i) => {
            const thumb = document.createElement('img');
            thumb.src = photo;
            thumb.alt = `Миниатюра ${i + 1}`;
            if (i === index) {
                thumb.classList.add('active');
            }
            thumb.addEventListener('click', () => showPhoto(i));
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    function showPrevPhoto() {
        currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
        showPhoto(currentIndex);
    }
    
    function showNextPhoto() {
        currentIndex = (currentIndex + 1) % currentPhotos.length;
        showPhoto(currentIndex);
    }
});