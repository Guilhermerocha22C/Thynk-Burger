document.addEventListener('DOMContentLoaded', initializePage);

function initializePage() {
    const currentPage = document.body.id;
    switch (currentPage) {
        case 'home':
            initializeHome();
            break;
        case 'dados':
            initializeDados();
            break;
        case 'cozinha':
        case 'motoboy':
        case 'entregue':
            displayPedidoInfo(currentPage);
            break;
    }
}

function initializeHome() {
    // Esta função não é mais necessária aqui, pois a lógica está no index.html
}

function initializeDados() {
    const form = document.getElementById('dadosForm');
    const totalSpan = document.getElementById('totalPedido');
    const itensList = document.getElementById('itensPedido');

    const total = localStorage.getItem('pedidoTotal') || '0.00';
    totalSpan.textContent = `R$${parseFloat(total).toFixed(2)}`;

    const itens = JSON.parse(localStorage.getItem('itensPedido')) || [];
    itens.forEach(item => {
        const li = document.createElement('li');
        const preco = item.price ? parseFloat(item.price).toFixed(2) : '0.00';
        li.textContent = `${item.name || 'Item não informado'} - R$${preco}`;
        itensList.appendChild(li);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const endereco = document.getElementById('endereco').value;
        
        if (nome && endereco) {
            const pedido = {
                nomeCliente: nome,
                endereco: endereco,
                itens: itens,
                total: parseFloat(total)
            };

            enviarPedido(pedido);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

function enviarPedido(pedido) {
    const pedidoDTO = {
        nomeCliente: pedido.nomeCliente,
        endereco: pedido.endereco,
        descricao: `Pedido de ${pedido.nomeCliente}`,
        valorTotal: pedido.total,
        itens: pedido.itens.map(item => ({
            nome: item.name,
            preco: item.price
        }))
    };
    console.log('Itens do pedido:', pedidoDTO.itens);
    fetch('http://localhost:8080/api/pedidos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(pedidoDTO)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Erro na resposta do servidor: ${response.status}. Detalhes: ${text}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log('Pedido criado:', data);
        localStorage.setItem('pedidoId', data.id);
        localStorage.setItem('pedidoNome', data.nomeCliente);
        localStorage.setItem('pedidoEndereco', data.endereco);
        localStorage.setItem('pedidoItens', JSON.stringify(data.itens || pedido.itens));
        localStorage.setItem('pedidoTotal', data.valorTotal || pedido.total);
        window.location.href = 'cozinha.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao enviar o pedido. Por favor, tente novamente. Detalhes: ' + error.message);
    });
}

function displayPedidoInfo(page) {
    const pedidoId = localStorage.getItem('pedidoId');
    const nomeCliente = localStorage.getItem('pedidoNome');
    const enderecoCliente = localStorage.getItem('pedidoEndereco');
    const itens = JSON.parse(localStorage.getItem('pedidoItens')) || [];
    const total = localStorage.getItem('pedidoTotal') || '0.00';

    if (pedidoId) {
        document.getElementById('nomeCliente').textContent = nomeCliente || 'Não informado';
        document.getElementById('enderecoCliente').textContent = enderecoCliente || 'Não informado';
        document.getElementById('totalPedido').textContent = `R$${parseFloat(total).toFixed(2)}`;

        const itensList = document.getElementById('itensPedido');
        if (itensList) {
            itensList.innerHTML = '';
            if (itens.length > 0) {
                itens.forEach(item => {
                    const preco = item.preco ? parseFloat(item.preco).toFixed(2) : '0.00';
                    const li = document.createElement('li');
                    li.textContent = `${item.nome || 'Item não informado'} - R$${preco}`;
                    itensList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Itens não disponíveis';
                itensList.appendChild(li);
            }
        }
    } else {
        console.warn('Dados do pedido não encontrados no localStorage');
        // Redirecionar para a página inicial se não houver dados do pedido
        window.location.href = 'index.html';
    }
}