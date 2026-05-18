# Histórias de Usuário - Swag Labs

---

## História de Usuário: Autenticação de Usuário (Login)
**Como** visitante da plataforma Swag Labs
**Quero** inserir minhas credenciais de acesso (usuário e senha)
**Para** autenticar minha sessão e acessar o catálogo de produtos para realizar compras.

### Critérios de Aceitação

#### 1. Estrutura da Interface de Login
* A página inicial (`/` ou `/index.html`) deve exibir o logotipo do Swag Labs.
* O formulário deve conter:
  * Campo de texto para o usuário (Username).
  * Campo de texto oculto/mascarado para a senha (Password).
  * Botão de ação primária para envio do formulário (Login).
* Deve ser possível submeter o formulário pressionando a tecla Enter após o preenchimento dos campos.

#### 2. Validação de Campos e Mensagens de Erro
* O sistema deve validar as entradas apenas no momento da submissão (clique em "Login" ou Enter).
* O layout de erro deve seguir o padrão da aplicação: inputs sublinhados em vermelho com um ícone de "X" interno, além de uma caixa de alerta vermelha contendo a mensagem específica e um botão "X" para fechar o alerta.
* Gatilhos de Validação:
  * Se o campo Username estiver vazio na submissão, exibir a mensagem: "Epic sadface: Username is required".
  * Se o campo Username estiver preenchido, mas o Password estiver vazio, exibir: "Epic sadface: Password is required".
  * Se ambos os campos estiverem preenchidos com dados não cadastrados ou divergentes, exibir: "Epic sadface: Username and password do not match any user in this service".

---

## História de Usuário: Catálogo de Produtos (Vitrine)
**Como** cliente cadastrado no Swag Labs
**Quero** visualizar a lista de produtos disponíveis com seus respectivos nomes, imagens, descrições e preços
**Para que** eu possa selecionar os itens de meu interesse e adicioná-los ao carrinho de compras.

### Critérios de Aceitação

#### 1. Exibição e Layout dos Cards de Produto
* A página deve exibir os produtos em formato de grid (grade).
* Cada card de produto deve conter obrigatoriamente:
  * Imagem em alta resolução do produto.
  * Título/Nome do produto (deve funcionar como um link ancorado para o detalhe do produto).
  * Descrição textual detalhada das características do item.
  * Preço formatado na moeda padrão (ex: $29.99).
  * Botão de ação "Add to cart" com texto centralizado.

#### 2. Funcionalidade do Botão "Add to cart"
* Ao clicar em "Add to cart", o item deve ser adicionado imediatamente à sessão do carrinho.
* O estado do botão deve mudar dinamicamente para "Remove" (estilizado de forma distinta para indicar a ação de reversão).
* O contador numérico no ícone do carrinho de compras (localizado no cabeçalho superior direito) deve ser incrementado em +1.

#### 3. Ordenação de Produtos
* Deve haver um componente de filtro do tipo Dropdown (Lista Suspensa) no canto superior direito, abaixo do cabeçalho.
* As opções válidas de ordenação devem ser:
  * Name (A to Z) - Ordem alfabética ascendente (Padrão)
  * Name (Z to A) - Ordem alfabética descendente
  * Price (low to high) - Menor preço para o maior
  * Price (high to low) - Maior preço para o menor

#### 4. Elementos Globais do Cabeçalho
* Menu Hambúrguer (Esquerda): Ao ser clicado, deve expandir o menu lateral de navegação (Logout, Reset App State, etc.).
* Título Centralizado: Deve exibir o texto fixo "Swag Labs".
* Ícone do Carrinho (Direita): Deve redirecionar o usuário para a página do carrinho (`/cart.html`). Se estiver vazio, não deve exibir número de badge.

### Cenários de Teste (Comportamento - BDD)

**Cenário: Adicionar um produto ao carrinho com sucesso**
* **Dado** que o usuário está autenticado e acessou a página de produtos (`/inventory.html`)
* **Quando** o usuário clica no botão "Add to cart" do produto "Sauce Labs Backpack"
* **Então** o texto do botão deve mudar para "Remove"
* **E** o badge numérico no ícone do carrinho deve exibir o valor "1"

**Cenário: Remover um produto diretamente da vitrine**
* **Dado** que o usuário já possui 1 item ("Sauce Labs Backpack") no carrinho e o botão está como "Remove"
* **Quando** o usuário clica no botão "Remove" deste produto
* **Então** o texto do botão deve retornar para "Add to cart"
* **E** o badge numérico do ícone do carrinho deve sumir ou decrementar para o valor correto

**Cenário: Alterar a ordenação dos produtos por preço**
* **Dado** que os produtos estão listados na ordem padrão alfabética (A a Z)
* **Quando** o usuário seleciona a opção "Price (low to high)" no dropdown de ordenação
* **Então** a página deve ser reordenada imediatamente, posicionando o item "Sauce Labs Onesie" ($7.99) na primeira posição e o item "Sauce Labs Fleece Jacket" ($49.99) na última posição

---

## História de Usuário: Gestão do Carrinho de Compras
**Como** cliente com produtos selecionados no Swag Labs
**Quero** visualizar a lista de itens no meu carrinho e poder removê-los
**Para que** eu possa revisar meu pedido corretamente antes de seguir para o pagamento.

### Critérios de Aceitação

#### 1. Estrutura e Exibição dos Itens no Carrinho
* A página deve exibir o título "Your Cart" logo abaixo do cabeçalho principal.
* Deve haver um cabeçalho de lista contendo os rótulos "QTY" (Quantidade) e "Description" (Descrição).
* Cada item adicionado ao carrinho deve ser renderizado em um bloco individual (card de lista) contendo:
  * QTY: Campo numérico indicando a quantidade daquele item (atualmente fixo em 1).
  * Nome do Produto: Título em destaque, funcionando como link ancorado para a página de detalhes do produto.
  * Descrição: Texto descritivo do produto.
  * Preço: Valor monetário formatado (ex: $9.99).
  * Botão "Remove": Botão com borda e texto em vermelho, posicionado no canto inferior direito do bloco do item.

#### 2. Funcionalidade de Remoção de Itens
* Ao clicar no botão "Remove" de um produto específico, o bloco inteiro correspondente a esse item deve ser removido instantaneamente da tela.
* A remoção do item deve atualizar dinamicamente o badge numérico no ícone do carrinho no cabeçalho (decrementando em -1).
* Se o último item for removido, a lista deve ficar em branco e o badge numérico do carrinho superior deve desaparecer.

#### 3. Navegação e Botões de Ação
* A página deve apresentar dois botões principais no rodapé da lista de itens:
  * Botão "Continue Shopping": Posicionado à esquerda, com estilo secundário (fundo branco, borda). Ao ser clicado, deve redirecionar o usuário de volta para a vitrine de produtos (`/inventory.html`), mantendo os itens atuais no carrinho.
  * Botão "Checkout": Posicionado à direita, com estilo primário (fundo verde). Ao ser clicado, deve iniciar o fluxo de compra e redirecionar o usuário para a página de informações de envio (`/checkout-step-one.html`).

#### 4. Sincronização do Cabeçalho
* O ícone do carrinho de compras (canto superior direito) deve exibir um badge vermelho com um número que corresponde exatamente à quantidade de itens distintos listados na página do carrinho.

### Cenários de Teste (Comportamento - BDD)

**Cenário: Visualizar produtos adicionados ao carrinho**
* **Dado** que o usuário adicionou 3 produtos distintos através da vitrine
* **Quando** o usuário navega para a página "Your Cart"
* **Então** o sistema deve listar os 3 produtos com suas respectivas informações (Nome, Descrição e Preço)
* **E** o ícone do carrinho no cabeçalho deve exibir o número "3"

**Cenário: Remover um produto do carrinho com sucesso**
* **Dado** que o usuário está na página do carrinho com 3 produtos listados
* **Quando** o usuário clica no botão "Remove" do produto "Test.allTheThings() T-Shirt (Red)"
* **Então** o produto deve desaparecer da lista do carrinho
* **E** o contador no ícone do cabeçalho deve ser atualizado para "2"

**Cenário: Prosseguir para o Checkout**
* **Dado** que o usuário está na página do carrinho e possui ao menos 1 item listado
* **Quando** o usuário clica no botão "Checkout"
* **Então** o sistema deve redirecionar o usuário para a primeira etapa de finalização de compra (Coleta de informações de entrega)

**Cenário: Retornar para a loja para continuar comprando**
* **Dado** que o usuário está revisando os itens na página do carrinho
* **Quando** o usuário clica no botão "Continue Shopping"
* **Então** o sistema deve redirecionar o usuário para a página principal de catálogo de produtos
* **E** o estado do carrinho deve ser preservado (os itens selecionados continuam no carrinho)

---

## História de Usuário: Revisão e Conclusão do Pedido (Checkout - Etapas Finais)
**Como** cliente com os dados de entrega preenchidos
**Quero** revisar os itens do meu carrinho, verificar os valores totais (com taxas) e finalizar a compra
**Para que** eu tenha a garantia de que o pedido está correto e receba a confirmação de sucesso.

### Critérios de Aceitação

#### 1. Exibição da Página de Resumo (Checkout: Overview)
* A página deve carregar com o subtítulo "Checkout: Overview".
* A lista de produtos deve ser exibida em modo "somente leitura" (read-only), mantendo a mesma estrutura visual do carrinho (Quantidade, Nome, Descrição e Preço), porém sem a opção de remover itens ("Remove").
* Deve exibir os blocos de informações logísticas estáticas:
  * Payment Information: (ex: SauceCard #31337)
  * Shipping Information: (ex: Free Pony Express Delivery!)

#### 2. Cálculo do Resumo Financeiro (Price Total)
* O sistema deve calcular e exibir três valores no final da página:
  * Item total: A soma exata dos preços individuais de todos os produtos listados.
  * Tax: O valor do imposto calculado sobre o Item total (regra de negócio de percentual fixo definida pelo backend).
  * Total: A soma exata do Item total + Tax. Os valores devem estar formatados com o símbolo da moeda e duas casas decimais (ex: $82.05).

#### 3. Conclusão do Pedido e Esvaziamento do Carrinho
* Ao clicar no botão primário "Finish" (fundo verde), o usuário deve ser redirecionado para a página de sucesso (`/checkout-complete.html`).
* No exato momento em que a compra é finalizada, a sessão do carrinho deve ser esvaziada. O badge numérico vermelho no ícone do carrinho (cabeçalho) deve desaparecer.
* Ao clicar no botão secundário "Cancel" (fundo branco), o usuário deve ter o fluxo interrompido e ser redirecionado para a vitrine de produtos (`/inventory.html`), mantendo os itens no carrinho.

#### 4. Tela de Confirmação de Sucesso (Checkout: Complete!)
* A página deve exibir o subtítulo "Checkout: Complete!".
* O layout deve centralizar uma mensagem de sucesso contendo:
  * Um ícone visual de "Check" (✓) em verde.
  * O título em destaque: "Thank you for your order!".
  * O texto de apoio informando o despacho do pedido.
* Deve conter um botão centralizado "Back Home" (fundo verde). Ao ser clicado, este botão deve redirecionar o usuário de volta para a tela inicial do catálogo de produtos (`/inventory.html`).

### Cenários de Teste (Comportamento - BDD)

**Cenário: Validar a exatidão dos cálculos no resumo do pedido**
* **Dado** que o usuário está na página "Checkout: Overview" com produtos que somam $75.97
* **Quando** o sistema processa o resumo financeiro com uma taxa aplicada de $6.08
* **Então** o campo "Item total" deve exibir "$75.97"
* **E** o campo "Tax" deve exibir "$6.08"
* **E** o campo "Total" deve exibir exatamente "$82.05"

**Cenário: Finalizar a compra com sucesso (Happy Path Final)**
* **Dado** que o usuário revisou os itens na página "Checkout: Overview"
* **E** o ícone do carrinho exibe o badge numérico (ex: "3")
* **Quando** ele clica no botão "Finish"
* **Então** o sistema deve redirecioná-lo para a tela "Checkout: Complete!"
* **E** exibir a mensagem "Thank you for your order!"
* **E** o badge numérico vermelho do carrinho de compras deve desaparecer (indicando 0 itens)

**Cenário: Cancelar a finalização no momento da revisão**
* **Dado** que o usuário está na página "Checkout: Overview"
* **Quando** ele clica no botão "Cancel"
* **Então** o sistema deve redirecioná-lo de volta para a vitrine principal ("Products")
* **E** os itens e o badge do carrinho devem permanecer intactos

**Cenário: Retornar à vitrine após uma compra bem-sucedida**
* **Dado** que o usuário está na tela de sucesso "Checkout: Complete!"
* **Quando** ele clica no botão "Back Home"
* **Então** o sistema deve redirecioná-lo para a vitrine principal ("Products")
* **E** o carrinho deve permanecer vazio para iniciar uma nova jornada de compras
