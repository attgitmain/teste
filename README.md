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
frontend) para definir a versão da Graph API utilizada. Caso a aplicação
utilize redirecionamento explícito, defina `REACT_APP_FACEBOOK_REDIRECT_URI`
no frontend com a mesma URL cadastrada nas configurações do app. Esses valores
precisam ser os mesmos em ambos os projetos para que o login via Facebook e
Instagram funcione corretamente.

Para habilitar as consultas de CEP e CPF pela Work API, defina também no backend
as variáveis `API_TOKEN_CEP` e `API_TOKEN_CPF`. O frontend possui as variáveis
`REACT_APP_API_TOKEN_CEP` e `REACT_APP_API_TOKEN_CPF`, utilizadas apenas para
mensagens de aviso ao usuário.

Caso a extração de leads gere muitas requisições, é possível controlar a
quantidade de dados processados definindo `LEADS_PAGE_SIZE` (número de leads por
página, padrão 25) e `LEADS_CONCURRENCY` (quantas consultas de CPF ocorrem em
paralelo) no `.env` do backend.
Se as consultas demorarem muito, ajuste também `REQUEST_TIMEOUT_MS`, definido em
milissegundos (padrão 90000).

Para evitar erros de CORS, configure `FRONTEND_URL` no backend com a URL
do site que acessará a API, por exemplo `https://loopchat.com.br`. Se
necessário, informe mais de um domínio separando-os por vírgula.

Ao configurar relatórios diários, defina o `dailyReportNumber` com um número de
WhatsApp válido (contato ou grupo). O sistema valida esse contato antes do
envio e registra falhas caso o número esteja incorreto.

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
4wpidv-codex/configurar-uri-de-redirecionamento-no-oauth
O diretório `public/` inclui duas páginas estáticas: `politica.html` (acessível em `/politica-de-privacidade`) e `exclusao.html` (acessível em `/exclusao-de-dados`). Recompile o frontend (`npm run build`) sempre que alterá-las para que fiquem disponíveis em produção.
=======
O diretório `public/` também inclui `politica.html`, uma página de privacidade leve pronta para ser servida em `/politica-de-privacidade`.
Para orientações sobre remoção de contas, disponibilize também `exclusao.html` em `/exclusao-de-dados`.


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
