# Automação de Testes E2E - SauceDemo

Este projeto contém a automação de testes E2E para o e-commerce SauceDemo, desenvolvida utilizando o framework Cypress. O objetivo deste repositório é garantir a qualidade e o funcionamento correto dos principais fluxos da aplicação (Login, Vitrine, Carrinho e Checkout).

O projeto foi estruturado focando em escalabilidade, manutenibilidade e na adoção das melhores práticas de arquitetura de testes automatizados.

## Estratégia de Testes e Justificativa dos Fluxos

Ao analisar o SauceDemo, a priorização da automação foi direcionada para o Core Business Flow (Caminho Crítico) do negócio. Em um e-commerce real, falhas na vitrine ou no checkout impactam diretamente a receita da empresa (Prioridade P1).

A seleção dos fluxos contemplou os seguintes cenários:

* **Jornada de Compra End-to-End (Happy Path):** Autenticação do usuário, adição de itens à vitrine, validação dos itens no carrinho, preenchimento dos dados de entrega, validação do cálculo matemático do subtotal somado aos impostos e confirmação final na tela de sucesso. Este fluxo assegura que a principal funcionalidade geradora de receita está operacional.
* **Validação de Exceções de Autenticação (Edge Cases Críticos):** Testes de tentativas de login com usuário bloqueado, credenciais incorretas e campos obrigatórios vazios, garantindo as regras básicas de segurança de acesso.
* **Validação de Exceções no Checkout:** Tentativas de prosseguir no checkout sem o preenchimento de campos obrigatórios como "First Name" ou "Postal Code". A automação deste cenário mitiga o risco de inserção de dados corrompidos ou incompletos no banco de dados e problemas logísticos subsequentes.

A decisão de desconsiderar testes de interface menores (como links de rodapé ou ícones estéticos) foi intencional, visando concentrar o esforço de automação estritamente nos fluxos de conversão e retenção.

## Pipeline de Integração Contínua (CI/CD)

O projeto possui uma esteira de automação configurada via GitHub Actions através do arquivo localizado em `.github/workflows/cypress.yml`.

### Detalhes Técnicos da Pipeline

* **Gatilhos (Triggers):** A execução é disparada de forma automática a cada evento de push ou pull request direcionado para a branch `main`, garantindo a validação contínua do código antes da integração.
* **Ambiente e Instalação:** A execução ocorre em um contêiner Ubuntu (`ubuntu-latest`), realizando o setup do Node.js v20 e uma instalação limpa das dependências através do comando `npm ci`.
* **Execução do Cypress:** Utilização da action oficial `cypress-io/github-action@v6` configurada para executar os testes especificamente no navegador Chrome.
* **Gerenciamento de Evidências (Artefatos):** Configuração para realizar o upload automático de screenshots (apenas em caso de falhas) e vídeos de todas as execuções. O procedimento visa acelerar o diagnóstico de falhas ou testes intermitentes (flaky tests) sem a necessidade de reprodução local.

## Arquitetura e Estrutura do Projeto

O projeto adota o padrão Page Object Model (POM) aliado ao uso de Custom Commands e Fixtures, garantindo que os testes sejam descritivos, limpos e de fácil manutenção.

A estrutura de pastas principal está organizada da seguinte forma:

```text
História de usuário/         # Documentação ágil (Histórias de Usuário, BDDs e Critérios de Aceite)
testPlan/                    # Plano estratégico de testes e mapeamento da cobertura

cypress/                     # Diretório principal do framework de automação
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

## Boas Práticas Adotadas

### 1. Page Object Model (POM)
A interação com a tela (mapeamento de seletores CSS e ações) foi abstraída para a pasta `cypress/support/pages/`.
* **Vantagem:** Se a interface da aplicação sofrer alterações, a manutenção do localizador será feita em um único ponto na classe da página correspondente, sem necessidade de alterar os arquivos de especificação de teste (`.cy.js`).

### 2. Custom Commands
Foi criado um comando customizado `cy.login(username, password)` no arquivo `commands.js`.
* **Vantagem:** Evita a repetição de código (princípio DRY - Don't Repeat Yourself) nos blocos `beforeEach` de múltiplos arquivos, melhorando a legibilidade dos cenários.

### 3. Fixtures (Testes Baseados em Dados)
Os dados de teste (como credenciais e informações de envio) estão isolados em arquivos `.json` na pasta `fixtures`.
* **Vantagem:** Centraliza a massa de dados e permite a expansão para testes baseados em dados (Data-Driven Testing) de forma simplificada.

### 4. Configuração Centralizada de Ambiente
O `baseUrl` da aplicação foi definido no arquivo `cypress.config.js`.
* **Vantagem:** Elimina a necessidade de declarar a URL raiz nos testes, facilitando a execução do mesmo projeto em diferentes ambientes (QA, Staging ou Produção) por meio de variáveis de ambiente.

## Como Executar o Projeto

### Pré-requisitos
* Node.js instalado localmente.

### Passos para Execução

1. Clonar o repositório e acessar o diretório do projeto.
2. Instalar as dependências do projeto:
   ```bash
   npm install
   ```
3. Executar os testes em modo interativo (interface visual do Cypress):
   ```bash
   npx cypress open
   ```
4. Executar os testes em modo headless (execução em terminal, utilizada na esteira de CI/CD):
   ```bash
   npx cypress run
   ```
