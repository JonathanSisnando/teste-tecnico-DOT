# Automação de Testes E2E - SauceDemo

Este projeto contém a automação de testes E2E para o e-commerce [SauceDemo](https://www.saucedemo.com/), desenvolvida utilizando o framework **Cypress**. 
O objetivo deste repositório é garantir a qualidade e o funcionamento correto dos principais fluxos da aplicação (Login, Vitrine, Carrinho e Checkout).

O projeto foi estruturado focando em escalabilidade, manutenibilidade e na adoção das melhores práticas de arquitetura de testes automatizados.

## 🏗️ Arquitetura e Estrutura do Projeto

O projeto adota o padrão **Page Object Model (POM)** aliado ao uso de **Custom Commands** e **Fixtures**, garantindo que os testes sejam descritivos, limpos e de fácil manutenção.

A estrutura de pastas principal está organizada da seguinte forma:

```text
cypress/
├── e2e/                     # Arquivos de especificações (Testes E2E agrupados por contexto)
│   ├── carrinho.cy.js       # Testes do carrinho de compras
│   ├── checkout_dados.cy.js # Testes do formulário de checkout
│   ├── checkout_revisao.cy.js # Testes da revisão e finalização da compra
│   ├── login.cy.js          # Testes de autenticação
│   └── vitrine.cy.js        # Testes da vitrine de produtos
│
├── fixtures/                # Massa de dados estática (Data-Driven Testing)
│   ├── checkout.json        # Dados para preenchimento de formulários (ex: checkout)
│   └── users.json           # Credenciais de acesso para testes
│
└── support/
    ├── pages/               # Classes do Page Object Model (POM)
    │   ├── CartPage.js
    │   ├── CheckoutPage.js
    │   ├── InventoryPage.js
    │   └── LoginPage.js
    │
    ├── commands.js          # Custom Commands globais (ex: cy.login)
    └── e2e.js               # Arquivo de suporte global do Cypress
```

## 🛠️ Boas Práticas Adotadas

### 1. Page Object Model (POM)
A interação com a tela (mapeamento de seletores CSS e ações) foi abstraída para a pasta `cypress/support/pages/`. 
* **Vantagem:** Se a interface da aplicação sofrer alterações, a manutenção do *locator* será feita em um único lugar na classe da página correspondente, sem necessidade de alterar os arquivos de teste (arquivos `.cy.js`).

### 2. Custom Commands
Foi criado um comando customizado `cy.login(username, password)` no arquivo `commands.js`. 
* **Vantagem:** Como a maioria dos fluxos E2E exige que o usuário esteja autenticado, abstraímos o login em um comando global. Isso evita a repetição de código (*DRY - Don't Repeat Yourself*) nos blocos `beforeEach` e deixa o código do teste muito mais legível.

### 3. Fixtures (Testes Baseados em Dados)
Os dados de teste (como nomes de usuário, senhas e informações de pagamento) não ficam "hardcoded" diretamente nos scripts. Eles estão isolados e centralizados em arquivos `.json` na pasta `fixtures`.
* **Vantagem:** Facilita a manutenção da massa de dados e permite a fácil adição de novos cenários baseados em dados (Data-Driven Testing).

### 4. Configuração Centralizada de Ambiente
O `baseUrl` da aplicação foi configurado de forma centralizada no arquivo `cypress.config.js`.
* **Vantagem:** Evita a repetição da URL raiz pelo código. Facilitará bastante caso o projeto precise ser testado em diferentes ambientes (ex: *QA*, *Staging* ou *Produção*), bastando alterar a URL na inicialização.

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado na máquina.

### Passos para Execução

1. Clone o repositório e acesse a pasta do projeto.
2. Instale as dependências:
```bash
npm install
```

3. Para rodar os testes em modo interativo (abre a interface visual do Cypress):
```bash
npx cypress open
```

4. Para rodar os testes em modo "Headless" (modo silencioso no terminal, ideal para esteiras CI/CD):
```bash
npx cypress run
```
