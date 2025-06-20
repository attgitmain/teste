diff --git a/README.md b/README.md
index 219b541ddf571a4b08ebffc0a7db4d3004d61ffe..5f5853277c25f98b70fe9ec23c60f31d56f4f211 100644
--- a/README.md
+++ b/README.md
@@ -1,47 +1,51 @@
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
+
+# Landing (para compilar o Tailwind)
+cd ../landing
+npm install
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
 `REACT_APP_FACEBOOK_APP_ID` para inicializar o SDK. Esses valores precisam ser
 os mesmos em ambos os projetos para que o login via Facebook e Instagram
 funcione corretamente.
 
 ## Executando o backend
 
diff --git a/README.md b/README.md
index 219b541ddf571a4b08ebffc0a7db4d3004d61ffe..5f5853277c25f98b70fe9ec23c60f31d56f4f211 100644
--- a/README.md
+++ b/README.md
@@ -57,52 +61,58 @@ Na pasta `backend` estão disponíveis os seguintes scripts:
 
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
-3. Certifique-se de que os arquivos `.env` contêm as configurações corretas no servidor.
-4. Inicie ambos os serviços usando `node` ou o gerenciador de processos de sua preferência.
+3. Gere o CSS da landing page:
+   ```bash
+   cd ../landing
+   npm run build
+   ```
+4. Certifique-se de que os arquivos `.env` contêm as configurações corretas no servidor.
+5. Inicie ambos os serviços usando `node` ou o gerenciador de processos de sua preferência.
 
 ## Executando os testes
 
 Os testes estão configurados no backend e no frontend. Basta rodar:
 
 ```bash
 cd backend
 npm test
 
 cd ../frontend
 npm test
 ```
 
 
 ## Landing Page
 
-Para executar ou gerar o build da landing page criada em `landing/`:
+A pasta `landing/` contém arquivos HTML estáticos que utilizam Tailwind CSS.
+Gere o CSS e sirva-o junto com os HTMLs:
 
 ```bash
 cd landing
 npm install
-npm run build
+npm run build  # cria build.css
 ```
 
-O conteúdo de produção pode ser iniciado com `npm start`, que executa o servidor Next.js a partir da pasta `.next`. Configure o servidor web para que **atendesolucao.com** e **www.atendesolucao.com** apontem para essa aplicação. O subdomínio **app.atendesolucao.com** deve continuar servindo a aplicação React existente em `frontend`.
+O arquivo `build.css` resultante deve ser disponibilizado pelo servidor web junto com os demais arquivos da pasta.
