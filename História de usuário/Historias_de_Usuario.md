# 📖 Histórias de Usuário e BDD - SauceDemo

Este documento detalha as Histórias de Usuário, Critérios de Aceite e Cenários BDD que serviram como base para o desenvolvimento da automação E2E descrita no `README.md` principal do projeto. 

Os cenários abaixo refletem o **Core Business Flow (Caminho Crítico)** priorizado na estratégia de testes, garantindo a validação desde a autenticação até a finalização da compra.

---

## 🔐 História 1: Autenticação de Usuário (Login)

> **Como** visitante da plataforma Swag Labs  
> **Quero** inserir minhas credenciais de acesso (usuário e senha)  
> **Para** autenticar minha sessão e acessar o catálogo de produtos para realizar compras.

### 🎯 Critérios de Aceitação

**1. Estrutura da Interface de Login**
* A página inicial (`/` ou `/index.html`) deve exibir o logotipo do Swag Labs.
* O formulário deve conter:
  * Campo de texto para o usuário (Username).
  * Campo de texto oculto/mascarado para a senha (Password).
  * Botão de ação primária para envio do formulário (Login).
* Deve ser possível submeter o formulário pressionando a tecla `Enter` após o preenchimento dos campos.

**2. Validação de Campos e Mensagens de Erro**
* O sistema deve validar as entradas apenas no momento da submissão.
* O layout de erro deve seguir o padrão da aplicação: inputs com borda vermelha e ícone de "X", acompanhados de alerta com a mensagem específica.
* Gatilhos de Validação:
  * **Username vazio:** Exibir "Epic sadface: Username is required".
  * **Password vazio:** Exibir "Epic sadface: Password is required".
  * **Credenciais inválidas:** Exibir "Epic sadface: Username and password do not match any user in this service".

---

## 🛍️ História 2: Catálogo de Produtos (Vitrine)

> **Como** cliente autenticado no Swag Labs  
> **Quero** visualizar a lista de produtos disponíveis com seus respectivos detalhes  
> **Para que** eu possa selecionar os itens de meu interesse e adicioná-los ao carrinho de compras.

### 🎯 Critérios de Aceitação

**1. Funcionalidade do Botão "Add to cart"**
* Ao clicar no botão "Add to cart", o item deve ser adicionado à sessão do carrinho.
* O estado do botão deve mudar dinamicamente para "Remove".
* O contador numérico no ícone do carrinho (cabeçalho) deve ser incrementado em `+1`.

**2. Elementos Globais do Cabeçalho**
* O Menu Hambúrguer deve expandir a navegação lateral.
* O Ícone do Carrinho deve redirecionar o usuário para a página de carrinho (`/cart.html`). Se vazio, não deve exibir a badge numérica vermelha.

### 🧪 Cenários de Teste (Comportamento - BDD)

**Cenário: Adicionar um produto ao carrinho com sucesso**
* **Dado** que o usuário está autenticado e acessou a página de produtos (`/inventory.html`)
* **Quando** o usuário clica no botão "Add to cart" do produto "Sauce Labs Backpack"
* **Então** o texto do botão deve mudar para "Remove"
* **E** o badge numérico no ícone do carrinho deve exibir o valor "1"

**Cenário: Remover um produto diretamente da vitrine**
* **Dado** que o usuário já possui o item "Sauce Labs Backpack" no carrinho e o botão está como "Remove"
* **Quando** o usuário clica no botão "Remove" deste produto
* **Então** o texto do botão deve retornar para "Add to cart"
* **E** o badge numérico do ícone do carrinho deve desaparecer

---

## 🛒 História 3: Gestão do Carrinho de Compras

> **Como** cliente com produtos selecionados  
> **Quero** visualizar a lista de itens no meu carrinho e poder removê-los  
> **Para que** eu possa revisar meu pedido antes de seguir para o pagamento.

### 🎯 Critérios de Aceitação

**1. Estrutura e Navegação**
* Cada item deve exibir: Quantidade (QTY), Título, Descrição, Preço e Botão "Remove".
* Botão "Continue Shopping": Redireciona de volta para a vitrine (`/inventory.html`).
* Botão "Checkout": Inicia o fluxo de compra redirecionando para `/checkout-step-one.html`.

**2. Funcionalidade de Remoção**
* Ao clicar em "Remove", o bloco do item deve ser excluído da tela instantaneamente.
* O badge numérico do carrinho superior deve decrementar. Se o carrinho esvaziar, a badge deve sumir.

### 🧪 Cenários de Teste (Comportamento - BDD)

**Cenário: Visualizar produtos adicionados ao carrinho**
* **Dado** que o usuário adicionou produtos através da vitrine
* **Quando** o usuário navega para a página "Your Cart"
* **Então** o sistema deve listar os produtos com Nome, Descrição e Preço correspondentes

**Cenário: Remover um produto do carrinho com sucesso**
* **Dado** que o usuário está na página do carrinho com 3 produtos listados
* **Quando** o usuário clica no botão "Remove" de um produto específico
* **Então** o produto deve desaparecer da lista
* **E** o contador no ícone do cabeçalho deve ser atualizado para "2"

**Cenário: Prosseguir para o Checkout**
* **Dado** que o usuário está na página do carrinho com itens listados
* **Quando** o usuário clica no botão "Checkout"
* **Então** o sistema deve redirecionar o usuário para a etapa de informações de entrega

---

## 💳 História 4: Revisão e Conclusão do Pedido (Checkout)

> **Como** cliente com os dados de entrega preenchidos  
> **Quero** revisar os itens do meu carrinho, verificar os valores totais (com taxas) e finalizar a compra  
> **Para que** eu tenha a garantia de que o pedido está correto e receba a confirmação.

### 🎯 Critérios de Aceitação

**1. Cálculo do Resumo Financeiro (Price Total)**
* O sistema deve exibir:
  * **Item total:** A soma exata dos preços de todos os produtos listados.
  * **Tax:** Imposto calculado (regra de negócio definida pelo backend).
  * **Total:** A soma exata do *Item total* + *Tax*. Formato monetário esperado: `$00.00`.

**2. Conclusão do Pedido**
* Ao clicar no botão "Finish", redirecionar para a página de sucesso (`/checkout-complete.html`).
* O carrinho de compras deve ser esvaziado automaticamente após a conclusão.

**3. Tela de Confirmação de Sucesso**
* O layout deve exibir o título em destaque: "Thank you for your order!".
* O botão "Back Home" deve retornar o usuário para a vitrine inicial.

### 🧪 Cenários de Teste (Comportamento - BDD)

**Cenário: Validar a exatidão dos cálculos no resumo do pedido**
* **Dado** que o usuário está na página "Checkout: Overview" com produtos que somam $75.97
* **Quando** o sistema processa o resumo financeiro com uma taxa aplicada de $6.08
* **Então** o campo "Item total" deve exibir "$75.97"
* **E** o campo "Tax" deve exibir "$6.08"
* **E** o campo "Total" deve exibir exatamente "$82.05"

**Cenário: Finalizar a compra com sucesso (Happy Path Final)**
* **Dado** que o usuário revisou os itens na página "Checkout: Overview"
* **Quando** ele clica no botão "Finish"
* **Então** o sistema deve redirecioná-lo para a tela de conclusão
* **E** exibir a mensagem "Thank you for your order!"
* **E** o carrinho de compras deve ser zerado

**Cenário: Cancelar a finalização no momento da revisão**
* **Dado** que o usuário está na página "Checkout: Overview"
* **Quando** ele clica no botão "Cancel"
* **Então** o sistema deve redirecioná-lo de volta para a vitrine principal
* **E** os itens no carrinho devem permanecer intactos
