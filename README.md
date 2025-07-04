# Projeto

Este repositório contém duas aplicações Node.js:

- **backend**: API e serviços escritos em TypeScript.
- **frontend**: aplicação React.

## Requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## Instalação das dependências

```bash
# Backend
cd backend
npm install # ou yarn

# Frontend
cd ../frontend
npm install # ou yarn

# Landing (para compilar o Tailwind)
cd ../landing
npm install
```

## Configurando variáveis de ambiente

Cada projeto possui um arquivo `.env.exemple` com todas as variáveis necessárias.
Copie esse arquivo para `.env` em cada pasta e edite os valores conforme seu ambiente:

```bash
cd backend
cp .env.exemple .env
# edite o arquivo .env

cd ../frontend
cp .env.exemple .env
# edite o arquivo .env
```

As credenciais do aplicativo Meta (Facebook/Instagram) devem ser definidas nas
variáveis `FACEBOOK_APP_ID` e `FACEBOOK_APP_SECRET` no backend. O frontend usa
`REACT_APP_FACEBOOK_APP_ID` para inicializar o SDK. Utilize também a variável
`FACEBOOK_API_VERSION` (no backend) e `REACT_APP_FACEBOOK_API_VERSION` (no
frontend) para definir a versão da Graph API utilizada. Esses valores precisam
ser os mesmos em ambos os projetos para que o login via Facebook e Instagram
funcione corretamente.

Para habilitar as consultas de CEP e CPF pela Work API, defina também no backend
as variáveis `API_TOKEN_CEP` e `API_TOKEN_CPF`. O frontend possui as variáveis
`REACT_APP_API_TOKEN_CEP` e `REACT_APP_API_TOKEN_CPF`, utilizadas apenas para
mensagens de aviso ao usuário.

## Executando o backend

Na pasta `backend` estão disponíveis os seguintes scripts:

- `npm run dev:server` &mdash; inicia o servidor em modo desenvolvimento com **ts-node-dev**.
- `npm run build` &mdash; compila o TypeScript para `dist/`.
- `npm start` &mdash; executa `dist/server.js` usando **nodemon** (após o build).
- `npm run db:migrate` &mdash; executa as migrações do banco de dados.
- `npm run db:seed` &mdash; popula o banco com dados de exemplo.
- `npm test` &mdash; roda a suite de testes com **jest**.
- `npm run lint` &mdash; verifica o padrão de código com **eslint**.

## Executando o frontend

Dentro de `frontend` os scripts principais são:

- `npm start` &mdash; inicia a aplicação React em modo desenvolvimento.
- `npm run build` &mdash; gera o build de produção em `build/`.
- `npm run builddev` &mdash; gera o build mantendo sourcemaps.
- `npm test` &mdash; executa os testes com **react-scripts**.
- `node server.js` &mdash; serve o build de produção em uma instância Express.

## Procedimentos de build

Para gerar uma versão pronta para produção:

1. Compile o backend:
   ```bash
   cd backend
   npm run build
   ```
2. Gere o build do frontend:
   ```bash
   cd ../frontend
   npm run build
   ```
3. Gere o CSS da landing page:
   ```bash
   cd ../landing
   npm run build
   ```
4. Certifique-se de que os arquivos `.env` contêm as configurações corretas no servidor.
5. Inicie ambos os serviços usando `node` ou o gerenciador de processos de sua preferência.

## Executando os testes

Os testes estão configurados no backend e no frontend. Basta rodar:

```bash
cd backend
npm test

cd ../frontend
npm test
```

## Landing Page

A pasta `landing/` contém arquivos HTML estáticos que utilizam Tailwind CSS.
Gere o CSS e sirva-o junto com os HTMLs:

```bash
cd landing
npm install
npm run build  # cria build.css
```

O arquivo `build.css` resultante deve ser disponibilizado pelo servidor web junto com os demais arquivos da pasta.
