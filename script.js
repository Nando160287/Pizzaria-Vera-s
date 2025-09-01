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

function AdicionarAoCarrinho(nome, preco) {
  const existente = carrinho.find(item => item.nome === nome);
  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

function AdicionarMeiaPizza() {
  const sabor1Select = document.getElementById("sabor1");
  const sabor2Select = document.getElementById("sabor2");

  const sabor1 = sabor1Select.value;
  const sabor2 = sabor2Select.value;

  const preco1 = parseFloat(sabor1Select.options[sabor1Select.selectedIndex].getAttribute("data-preco")) || 0;
  const preco2 = parseFloat(sabor2Select.options[sabor2Select.selectedIndex].getAttribute("data-preco")) || 0;

  const precoFinal = Math.max(preco1, preco2);
  const resultado = document.getElementById("resultado");

  if (!sabor1 || !sabor2) {
    resultado.textContent = "Por favor, selecione dois sabores.";
    return;
  }

  if (sabor1 === sabor2) {
    resultado.textContent = `Você escolheu uma pizza inteira de ${sabor1}. Valor: R$${precoFinal.toFixed(2)}`;
    AdicionarAoCarrinho(`Pizza inteira de ${sabor1}`, precoFinal);
  } else {
    resultado.textContent = `Meia pizza de ${sabor1} + ${sabor2}. Valor: R$${precoFinal.toFixed(2)} 🍕`;
    AdicionarAoCarrinho(`Meia ${sabor1} + Meia ${sabor2}`, precoFinal);
  }
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


function finalizarCompra() {
  const nome = document.getElementById('nomeCliente').value.trim();
  const endereco = document.getElementById('enderecoCliente').value.trim();
  const pagamento = document.getElementById('pagamentoCliente').value;

  if (!nome || !endereco || !pagamento) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  mensagem += `👤 Nome: ${nome}\n🏠 Endereço: ${endereco}\n💳 Pagamento: ${pagamento}\n\n🛒 Itens:\n`;

  let total = 0;
  carrinho.forEach(item => {
    mensagem += `• ${item.nome} x${item.quantidade} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`;
    total += item.preco * item.quantidade;
  });

  mensagem += `\n💰 Total: R$ ${total.toFixed(2)}`;

  const numero = "5511970829089"; 
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, '_blank');
}
