// Aguarda o conteúdo do DOM ser totalmente carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('main section');
    const searchInput = document.querySelector('header input');
    const searchButton = document.querySelector('#botao-busca');
    let allCards = []; // Array para armazenar todas as cartas carregadas do JSON

    // Elementos do Modal
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.getElementById('modal-close');
    const modalDownload = document.getElementById('modal-download');

    // Função para renderizar (exibir) as cartas na tela
    function renderCards(cardsToRender) {
        // Limpa o container de cartas antes de adicionar as novas
        cardContainer.innerHTML = '';

        if (cardsToRender.length === 0) {
            cardContainer.innerHTML = '<p style="text-align: center; color: #9aa0a6;">Nenhuma carta encontrada com os critérios de busca.</p>';
            return;
        }

        // Itera sobre cada carta e a adiciona na página
        cardsToRender.forEach(card => {
            const cardElement = document.createElement('article');
            cardElement.innerHTML = `
                <div class="card-image">
                    <img src="${card.imageUrl}" alt="${card.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">
                </div>
                <div class="card-content">
                    <h2>${card.name}</h2>
                    <p><strong>Edição:</strong> ${card.edicao}</p>
                    <p>
                        <strong>Tipo:</strong> ${card.type} | <strong>ABV:</strong> ${card.abv}% | <strong>IBU:</strong> ${card.ibu} | <strong>EBC:</strong> ${card.ebc} | <strong>DRK:</strong> ${card.drk}
                    </p>
                    <p>${card.description}</p>
                    <p><em>${card.flavorText}</em></p>
                    <p><strong>Regras Detalhadas:</strong> ${card.regasDetalhadas}</p>
                </div>
            `;
            cardContainer.appendChild(cardElement);

            // Adiciona o evento de clique para abrir o modal
            cardElement.addEventListener('click', () => {
                modalImage.src = card.imageUrl;
                modalDownload.href = card.imageUrl;
                // Sugere um nome de arquivo para download, ex: "IPA_Tropical.png"
                modalDownload.download = `${card.name.replace(/ /g, '_')}.png`;
                modal.classList.add('active'); // Mostra o modal adicionando a classe
            });
        });
    }

    // Função para carregar e exibir as cartas
    async function loadCards() {
        try {
            // Faz a requisição para o arquivo JSON
            const response = await fetch('cards.json');
            allCards = await response.json(); // Armazena todas as cartas
            renderCards(allCards); // Renderiza todas as cartas inicialmente

        } catch (error) {
            console.error('Erro ao carregar as cartas:', error);
            cardContainer.innerHTML = '<p style="text-align: center; color: #ff8a80;">Não foi possível carregar as cartas. Tente novamente mais tarde.</p>';
        }
    }
    
    // Função para realizar a busca
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        const filteredCards = allCards.filter(card => {
            const cardName = card.name.toLowerCase();
            const cardType = card.type.toLowerCase();
            return cardName.includes(query) || cardType.includes(query);
        });

        renderCards(filteredCards);
    }

    // Funções para fechar o modal
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active'); // Esconde o modal removendo a classe
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) { // Se o clique for no fundo do modal
            modal.classList.remove('active'); // Esconde o modal removendo a classe
        }
    });

    // Chama a função para carregar as cartas
    loadCards();

    // Adiciona eventos para acionar a busca
    searchInput.addEventListener('keyup', performSearch); // Filtra enquanto o usuário digita
    searchButton.addEventListener('click', performSearch); // Filtra ao clicar no botão
});

// A função iniciarBusca() pode ser desenvolvida aqui no futuro
function iniciarBusca() {
    // A lógica foi movida para performSearch e é acionada por um event listener.
    // Mantemos a função aqui para não quebrar o `onclick` do HTML, mas ela não é mais necessária.
    console.log('A busca agora é feita dinamicamente!');
}
