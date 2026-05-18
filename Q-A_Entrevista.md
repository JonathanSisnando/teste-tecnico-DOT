# Preparação para Entrevista Técnica - Cypress

Este documento contém 10 perguntas técnicas comuns que avaliadores fazem em testes técnicos ou entrevistas sobre automação de testes com Cypress. Use este material para estudar e explicar a arquitetura do seu código com clareza.

---

### 1. Por que você decidiu utilizar o Page Object Model (POM) no seu framework?
**Resposta Sugerida:**
"Eu adotei o POM para separar a lógica de interação com a interface gráfica (seletores CSS e ações) das regras de negócio do teste. Caso algum botão ou campo do sistema sofra mudança (ex: o ID do botão de login mudar), eu só preciso alterar em um único lugar: a classe da página (`LoginPage.js`). Isso torna o código mais limpo, escalável e reduz drasticamente o custo de manutenção."

---

### 2. Qual a vantagem de usar getters (ex: `get loginButton()`) nas classes do POM?
**Resposta Sugerida:**
"Ao usar `get`, garantimos que o seletor será avaliado apenas no momento em que ele for chamado dentro do teste, aproveitando as retentativas nativas (retry-ability) do Cypress. Se eu atribuísse o seletor a uma variável estática no construtor da classe, o Cypress poderia capturar uma referência de um elemento que ainda não está pronto no DOM."

---

### 3. Para que serve a pasta `support` e por que você criou um custom command (`cy.login`)?
**Resposta Sugerida:**
"A pasta `support` serve para comportamentos e comandos globais. Como o login é um pré-requisito para quase todas as ações da aplicação, criar o `cy.login()` evitou que eu repetisse os comandos de preencher usuário, senha e clicar em entrar em todos os blocos `beforeEach`. Isso segue o princípio **DRY** (Don't Repeat Yourself)."

---

### 4. Como você lida com a massa de dados nos seus testes? Qual a vantagem de usar Fixtures?
**Resposta Sugerida:**
"Eu utilizo **Fixtures** (como os arquivos `users.json` e `checkout.json`). A grande vantagem é que eu removo dados sensíveis e dinâmicos de dentro do código dos scripts (`.cy.js`). Se precisarmos testar um novo usuário, basta adicionar ao `.json`. Além disso, as fixtures facilitam abordagens como o Data-Driven Testing (DDT)."

---

### 5. Eu notei que você definiu a `baseUrl` no `cypress.config.js`. Por que isso é importante?
**Resposta Sugerida:**
"Definir a `baseUrl` faz com que o Cypress inicie a sessão da aplicação mais rápido e evite o recarregamento total da página entre os testes. Além disso, evita que eu deixe URLs hardcoded pelo projeto (ex: usando apenas `cy.visit('/')`), o que torna extremamente fácil alterar o ambiente de execução (QA, Staging) mudando apenas a configuração global."

---

### 6. Como você faria para rodar essa automação em diferentes ambientes (ex: Dev e Homologação)?
**Resposta Sugerida:**
"Como eu estruturei o projeto para usar a `baseUrl`, eu poderia sobrescrever essa configuração na hora da execução via linha de comando. Bastaria executar algo como:
`npx cypress run --config baseUrl=https://minha-url-de-homologacao.com`. Também poderíamos criar arquivos de configuração separados (ex: `cypress.qa.js`) ou usar variáveis de ambiente (`cypress.env.json`)."

---

### 7. Por que você agrupou testes em poucos arquivos (ex: todos do carrinho em `carrinho.cy.js`) em vez de ter um arquivo para cada teste?
**Resposta Sugerida:**
"O Cypress abre uma nova janela do navegador e reseta completamente o contexto entre arquivos de especificações (`.cy.js`). Ter dezenas de arquivos com um único cenário causaria um *overhead* gigante de performance. Agrupando cenários lógicos no mesmo bloco `describe` dentro do mesmo arquivo, garantimos testes E2E muito mais rápidos na esteira (CI/CD)."

---

### 8. Qual a importância de rodar o Cypress no modo "Headless"?
**Resposta Sugerida:**
"O modo *Headless* (`npx cypress run`) roda os testes no terminal sem exibir a interface gráfica do navegador. Ele consome muito menos memória e CPU, sendo o padrão obrigatório para executar os testes em pipelines de Integração Contínua (CI/CD), como GitHub Actions ou Jenkins, de forma rápida e estável."

---

### 9. Na sua arquitetura, se o seletor do botão de checkout mudar de `[data-test="checkout"]` para `.btn-checkout`, quantos arquivos você precisa alterar?
**Resposta Sugerida:**
"Exatamente um arquivo: o `CartPage.js`. Lá dentro eu atualizaria o *getter* responsável pelo botão de checkout. Todos os dezenas de testes que usam esse botão continuariam funcionando automaticamente, evidenciando o real valor do padrão Page Object Model."

---

### 10. No Cypress, comandos são assíncronos. Como você capturou textos da tela para compará-los futuramente sem quebrar as promises?
**Resposta Sugerida:**
"Como o Cypress enfileira os comandos assíncronamente, eu não posso atribuir o resultado de um `.get()` diretamente a uma variável comum (ex: `let nome = cy.get(...)`). Na minha automação (ex: teste do carrinho), utilizei a estrutura `.invoke('text').then((text) => { ... })` para garantir que o texto seja extraído do elemento no momento certo de execução e salvo para comparação posterior."
