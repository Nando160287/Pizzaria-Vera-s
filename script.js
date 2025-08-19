 let carrinho = [];

    function AdicionarAoCarrinho(nome, preco) {
      const existente = carrinho.find(item => item.nome === nome);
      if (existente) {
        existente.quantidade += 1;
      } else {
        carrinho.push({ nome, preco, quantidade: 1 });
      }
      atualizarCarrinho();
    }

    function removerItem(index) {
      carrinho.splice(index, 1);
      atualizarCarrinho();
    }
   

    function atualizarCarrinho() {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalElement = document.getElementById('total');
  listaCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}
      <button class="remove-btn" onclick="removerItem(${index})">Remover</button>`;
    listaCarrinho.appendChild(li);
    total += item.preco * item.quantidade;
  });

  totalElement.textContent = `Total: R$ ${total.toFixed(2)}`;
}


      
    

    function finalizarPedido() {
      const nome = document.getElementById('nomeCliente').value.trim();
      const endereco = document.getElementById('enderecoCliente').value.trim();
      const pagamento = document.getElementById('pagamentoCliente').value;

      if (!nome || !endereco) {
        alert("Por favor, preencha todos os dados do cliente.");
        return;
      }

      if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
      }

      let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
      let total = 0;

      carrinho.forEach(item => {
        mensagem += `• ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
        total += item.preco * item.quantidade;
      });
      
      const numero = "5511999999999"; 
      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, '_blank');
    }
