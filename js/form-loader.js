// Загрузка и инициализация формы
class FormLoader {
    constructor() {
        this.init();
    }
    
    async init() {
        try {
            await this.loadForm();
            this.initializeFormHandlers();
        } catch (error) {
            this.showFormError();
        }
    }
    
    async loadForm() {
        const response = await fetch('static/form/form_cta.html');
        if (!response.ok) {
            throw new Error('Форма не найдена');
        }
        const formHTML = await response.text();
        document.getElementById('form-container').innerHTML = formHTML;
    }
    
    initializeFormHandlers() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (contactForm) {
            contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }
    
    async handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('.submit-button');
        const buttonText = form.querySelector('.button-text');
        const buttonLoading = form.querySelector('.button-loading');
        const formMessage = document.getElementById('formMessage');
        
        // Показываем состояние загрузки
        this.setLoadingState(submitButton, buttonText, buttonLoading, true);
        
        try {
            const formData = new FormData(form);
            await this.submitForm(formData);
            this.showSuccessMessage(formMessage, 'Заявка отправлена успешно!');
            form.reset();
        } catch (error) {
            this.showErrorMessage(formMessage, 'Ошибка отправки. Попробуйте еще раз.');
        } finally {
            this.setLoadingState(submitButton, buttonText, buttonLoading, false);
        }
    }
    
    setLoadingState(button, text, loading, isLoading) {
        if (isLoading) {
            text.style.display = 'none';
            loading.style.display = 'inline';
            button.disabled = true;
        } else {
            text.style.display = 'inline';
            loading.style.display = 'none';
            button.disabled = false;
        }
    }
    
    async submitForm(formData) {
        // Здесь будет реальная отправка на сервер
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Для демо - 90% успешных отправок
        if (Math.random() > 0.1) {
            return { success: true };
        } else {
            throw new Error('Server error');
        }
    }
    
    showSuccessMessage(messageElement, text) {
        messageElement.textContent = text;
        messageElement.className = 'form-message success';
        messageElement.style.display = 'block';
        this.hideMessageAfterTimeout(messageElement);
    }
    
    showErrorMessage(messageElement, text) {
        messageElement.textContent = text;
        messageElement.className = 'form-message error';
        messageElement.style.display = 'block';
        this.hideMessageAfterTimeout(messageElement);
    }
    
    hideMessageAfterTimeout(messageElement) {
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }
    
    showFormError() {
        document.getElementById('form-container').innerHTML = `
            <div class="form-error">
                <p>Форма временно недоступна. Пожалуйста, свяжитесь с нами по телефону.</p>
            </div>
        `;
    }
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new FormLoader();
});