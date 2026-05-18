# Plano de Testes: Fluxo E2E - Swag Labs

## 1. Objetivo e Escopo
O escopo deste plano abrange a validação funcional e de interface de usuário (UI) do fluxo principal de compras da aplicação Swag Labs. O objetivo é garantir a integridade de todas as etapas críticas: Autenticação, Seleção de Produtos na Vitrine, Gerenciamento do Carrinho e Processo de Checkout completo.

## 2. Estratégia e Abordagem de Testes
A estratégia adotada será de testes funcionais com foco na jornada do usuário (End-to-End).
* **Testes Manuais:** Execução para validação da regra de negócio e mapeamento dos seletores do DOM (locators).
* **Testes Automatizados:** Implementação da suíte de regressão utilizando o framework Cypress. A automação cobrirá as interações na interface (clicks, type) e asserções de mudança de estado (validação de URLs, atualização de contadores e cálculos matemáticos).

## 3. Ambiente e Configuração
* **Aplicação Alvo:** Swag Labs (Web)
* **Navegadores:** Google Chrome e Firefox.
* **Resolução de Tela:** Viewport padrão configurado para ambiente desktop (1280x720).
* **Massa de Dados:** Credenciais padrão do sistema (`standard_user` / `secret_sauce`).

---

## 4. Matriz de Casos de Teste

| ID | Módulo | Descrição do Cenário | Prioridade | Tipo |
| :--- | :--- | :--- | :--- | :--- |
| **LOG-01** | Login | Deve realizar login com sucesso | Alta | Positivo |
| **LOG-02** | Login | Deve exibir erro ao tentar login com credenciais incorretas | Alta | Negativo |
| **LOG-03** | Login | Deve exibir erro ao tentar login com usuário vazio | Média | Negativo |
| **LOG-04** | Login | Deve exibir erro ao tentar login com senha vazia | Média | Negativo |
| **VIT-01** | Vitrine | Deve exibir detalhes do produto corretamente | Média | Positivo |
| **VIT-02** | Vitrine | Deve adicionar um item e atualizar o badge do carrinho | Alta | Positivo |
| **VIT-03** | Vitrine | Deve adicionar múltiplos itens ao carrinho | Alta | Positivo |
| **VIT-04** | Vitrine | Deve remover um item da vitrine e atualizar o badge | Média | Positivo |
| **CAR-01** | Carrinho | Deve validar correspondência de dados do produto no carrinho | Alta | Positivo |
| **CAR-02** | Carrinho | Deve remover um item pelo carrinho | Alta | Positivo |
| **CAR-03** | Carrinho | Deve retornar à vitrine ao clicar em Continue Shopping | Baixa | Positivo |
| **CKI-01** | Check-Info | Deve avançar preenchendo todos os dados corretamente | Alta | Positivo |
| **CKI-02** | Check-Info | Deve exibir erro ao não informar o primeiro nome | Média | Negativo |
| **CKI-03** | Check-Info | Deve exibir erro ao não informar o CEP | Média | Negativo |
| **CKI-04** | Check-Info | Deve cancelar o processo e retornar ao carrinho | Baixa | Positivo |
| **CKO-01** | Check-Over | Deve validar o cálculo do subtotal dos itens | Alta | Positivo |
| **CKO-02** | Check-Over | Deve validar o total da compra (Subtotal + Tax) | Alta | Positivo |
| **CKO-03** | Check-Over | Deve finalizar a compra com sucesso | Alta | Positivo |
| **CKO-04** | Check-Over | Deve cancelar a revisão e retornar à vitrine | Baixa | Positivo |

---

## 5. Detalhamento dos Cenários Críticos (Exemplos E2E)

### LOG-01: Deve realizar login com sucesso
* **Pré-condição:** Estar na página de login.
* **Passos:** 
  1. Inserir `standard_user` no campo Username.
  2. Inserir `secret_sauce` no campo Password.
  3. Clicar em Login.
* **Resultado Esperado:** Redirecionamento para `/inventory.html`.

### CKO-02: Deve validar o total da compra (Subtotal + Tax)
* **Pré-condição:** Estar na tela "Checkout: Overview" com itens no carrinho.
* **Passos:**
  1. Capturar o valor de "Item total".
  2. Capturar o valor de "Tax".
  3. Somar os dois valores.
  4. Comparar a soma com o valor exibido em "Total".
* **Resultado Esperado:** A soma de Item Total e Tax deve ser estritamente igual ao valor Total exibido na interface.

---

## 6. Critérios de Aceite (Definition of Done)
1. 100% dos casos de teste de Prioridade Alta devem passar na execução manual e automatizada.
2. Nenhum erro de cálculo financeiro permitido na etapa de Checkout.
3. Tratamento de exceções e bloqueio de acessos a rotas internas sem token de sessão válido devem estar operantes.
