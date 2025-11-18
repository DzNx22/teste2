// Define o ano atual no footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Função para abrir o modal
function openModal(planName) {
    const modal = document.getElementById('contactModal');
    const selectedPlanInput = document.getElementById('selectedPlan');
    
    selectedPlanInput.value = planName;
    modal.classList.add('active');
    
    // Previne scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('contactModal');
    const form = document.getElementById('contactForm');
    
    modal.classList.remove('active');
    form.reset();
    
    // Restaura scroll do body
    document.body.style.overflow = 'auto';
}

// Fecha modal ao pressionar ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Handle do formulário
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Coleta os dados do formulário
    const name = document.getElementById('name').value.trim();
    const businessType = document.getElementById('businessType').value;
    const selectedPlan = document.getElementById('selectedPlan').value;
    
    // Validação básica
    if (!name || !businessType || !selectedPlan) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Monta a mensagem do WhatsApp
    const message = `Olá, gostaria de solicitar um orçamento.
Nome: ${name}
Tipo de negócio: ${businessType}
Plano escolhido: ${selectedPlan}`;
    
    // Número do WhatsApp (sem caracteres especiais)
    const whatsappNumber = '5527988009386';
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Monta a URL do WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');
    
    // Fecha o modal e reseta o formulário
    closeModal();
});

// Adiciona animação suave ao scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de entrada dos cards ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa todos os cards de preço
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});
