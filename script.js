 const carrinho = [];

    function adicionarCarrinho(nome, seletorId) {
      const preco = parseFloat(document.getElementById(seletorId).value);
      carrinho.push({ nome, preco });
      atualizarCarrinho();
    }

    function atualizarCarrinho() {
      const lista = document.getElementById('lista-carrinho');
      const totalSpan = document.getElementById('total');
      lista.innerHTML = '';
      let total = 0;

      carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
        lista.appendChild(li);
        total += item.preco;
      });

      totalSpan.textContent = total.toFixed(2);
    }
