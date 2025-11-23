document.addEventListener('DOMContentLoaded', () => {
    // Pega os elementos do DOM
    const modal = document.getElementById("contactModal");
    const contactLinks = document.querySelectorAll(".contact-link"); // Seleciona todos os links de contato
    const closeBtn = document.querySelector("#contactModal .modal-close-button"); // Botão de fechar específico
    const emailLink = document.getElementById("email-link");
    const copyFeedback = document.getElementById("copy-feedback");

    // Função para abrir o modal
    const openModal = () => {
        if (modal) {
            modal.style.display = "flex"; // Usa flex para centralizar
        }
    };

    // Função para fechar o modal
    const closeModal = () => {
        if (modal) {
            modal.style.display = "none";
            copyFeedback.style.display = "none"; // Esconde a mensagem de feedback
        }
    };

    // Adiciona evento de clique para cada link de "Contato"
    contactLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Previne o comportamento padrão do link
            openModal();
        });
    });

    // Evento para fechar o modal no botão 'x'
    if (closeBtn) {
        closeBtn.addEventListener("click", closeModal);
    }

    // Evento para fechar o modal ao clicar fora dele
    if (modal) {
        modal.addEventListener('click', (event) => {
            // Se o clique foi no container do modal (o fundo), fecha o modal
            if (event.target === modal) closeModal();
        });
    }

    // Evento para copiar o e-mail
    if (emailLink) {
        emailLink.addEventListener("click", (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(emailLink.textContent);
            copyFeedback.style.display = "block"; // Mostra a mensagem "Email copiado!"
        });
    }
});