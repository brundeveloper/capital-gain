# Calculadora de Ganho de Capital

Uma aplicação Node.js em linha de comando para calcular ganhos de capital de transações financeiras.

## Descrição

Esta aplicação ajuda a calcular ganhos e perdas de capital de transações de investimento, fornecendo informações essenciais para declaração de impostos e gestão de portfólio.

## Funcionalidades

- Calcular ganhos/perdas de capital de transações de compra/venda
- Suporte para múltiplos tipos de ativos
- Interface de linha de comando (CLI) fácil de usar
- Cálculos precisos para declaração de impostos
- Suporte a arquivos JSON e entrada direta
- Processamento em lote de múltiplas operações

## Decisões Arquiteturais

A decisão de separar as classes do projeto em operação e casos de uso segue os princípios da Arquitetura Limpa (Clean Architecture), trazendo vantagens como separação de responsabilidade, manutenibilidade, reutilização e escalabilidade.

### Responsabilidades

- **Operation.js**: Representa o modelo de dados das operações
- **OperationUseCase.js**: Contém a lógica de negócio para cálculo de impostos
- **AppController.js**: Orquestra a execução e coordena os componentes
- **ArgsController.js**: Processa e valida argumentos de entrada

## Tecnologias Utilizadas

### Node.js
Linguagem com maior proficiência, ideal para criação de ferramentas CLI multiplataforma.

### JavaScript ES6+ (ES Modules)
Código mais limpo e organizado, facilitando a divisão em módulos e reutilização.

### Commander.js (CLI)
Biblioteca que facilita a criação de comandos de terminal, abstraindo principais regras e validações necessárias para um CLI.

### Jest (Testes)
Framework de testes com testes, mocks e relatórios de cobertura. Essencial para garantir que o código funciona corretamente.

### Docker (Containerização)
Usado para garantir que a aplicação roda igual em qualquer lugar. Facilita a distribuição da ferramenta.

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (Node Package Manager)
- Docker (opcional, para execução em container)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/brundeveloper/capital-gain.git
cd capital-gain
```

2. Instale as dependências:
```bash
npm install
```

3. Para uso global (opcional):
```bash
npm link
```

## Uso da Aplicação

### 1. Executar com npm:
```bash
npm start '<dados-json>'
```

Exemplo:
```bash
npm start '[{"operation":"buy","unit-cost":10,"quantity":100}]'
```

### 2. Executar como CLI global (após npm link):
```bash
capitalgain '<dados-json>'
capitalgain arquivo.json
```

### 3. Com opções:
```bash
capitalgain '<dados-json>' --verbose
```

### 4. Executar com Docker:
```bash
docker build -t capital-gain .
docker run capital-gain '<dados-json>'
```

Exemplo completo:
```bash
docker build -t capital-gain .
docker run --rm -it capital-gain sh
capitalgain '[{"operation":"buy","unit-cost":10,"quantity":10000},{"operation":"sell","unit-cost":20,"quantity":5000},{"operation":"sell","unit-cost":5,"quantity":5000}]'
```

## Formato dos Dados

Os dados de entrada devem estar no formato JSON:

```json
[
  {
    "operation": "buy",
    "unit-cost": 10.00,
    "quantity": 100
  },
  {
    "operation": "sell",
    "unit-cost": 15.00,
    "quantity": 50
  }
]
```

## Operações Suportadas

- **"buy"** - Operação de compra
- **"sell"** - Operação de venda

## Campos Obrigatórios

- **operation**: Tipo da operação (buy/sell)
- **unit-cost**: Preço unitário
- **quantity**: Quantidade de ações

## Exemplos de Uso

### 1. Operação simples:
```bash
npm start '[{"operation":"buy","unit-cost":10,"quantity":100}]'
```

### 2. Múltiplas operações:
```bash
npm start '[{"operation":"buy","unit-cost":10,"quantity":100},{"operation":"sell","unit-cost":15,"quantity":50}][{"operation":"buy","unit-cost":10,"quantity":100},{"operation":"sell","unit-cost":15,"quantity":50},{"operation":"sell","unit-cost":15,"quantity":50}]'
```

### 3. Usando arquivo:
```bash
npm start ./data/operacoes.json
```

## Estrutura do Projeto

```
capital-gain/
├── src/
│   ├── index.js              # Ponto de entrada da CLI
│   ├── app.js                # Controlador principal
│   ├── operation.js          # Modelo de operação
│   ├── useCases/
│   │   └── operationUseCase.js # Lógica de negócio
│   └── utils/
│       └── args.js           # Processamento de argumentos
├── test/                     # Testes automatizados
├── data/                     # Arquivos de exemplo
├── package.json              # Configuração do projeto
├── dockerfile                # Container Docker
└── README.md                 # Documentação
```

## Scripts Disponíveis

- `npm start` - Executar a aplicação
- `npm test` - Executar testes
- `npm run test:coverage` - Testes com cobertura

## Execução com Docker

### 1. Construir a imagem:
```bash
docker build -t capital-gain .
```

### 2. Executar container:
```bash
docker run capital-gain '<dados-json>'
```

### 3. Executar com arquivo (volume mount):
```bash
docker run -v ${PWD}/data:/data capital-gain /data/input.json
```

### 4. Modo interativo:
```bash
docker run -it capital-gain sh
```

## Testes

O projeto inclui testes automatizados usando Jest:

- Testes unitários
- Testes de integração
- Cobertura de código
- Mocks para sistema de arquivos

Para executar:
```bash
npm test
```

## Desenvolvimento

Para contribuir com este projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua funcionalidade: `git checkout -b nome-da-funcionalidade`
3. Faça suas alterações
4. Commit suas alterações: `git commit -am 'Adicionar alguma funcionalidade'`
5. Push para a branch: `git push origin nome-da-funcionalidade`
6. Submeta um pull request

## Licença

Este projeto está licenciado sob a Licença ISC.

## Contribuindo

Contribuições são bem-vindas! Por favor, sinta-se à vontade para submeter um Pull Request.

## Suporte

Se você tiver alguma dúvida ou precisar de ajuda, por favor abra uma issue no repositório.

## Versão

1.0.0