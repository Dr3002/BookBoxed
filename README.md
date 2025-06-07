# BookBoxed

BookBoxed é uma aplicação web de biblioteca virtual onde usuários podem visualizar, solicitar e devolver livros. Administradores podem adicionar novos títulos.

Baixe a pasta .ZIP
Descompacte e abra na sua IDE (Recomendado no VSCODE)

---

## Tecnologias utilizadas

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Empacotamento**: Docker
- **Banco de dados**: MongoDB
- **ORM**: Mongoose
- **Outros**: Axios, React Router DOM

## Verifique os Requisitos

- [##ESSENCIAL##] Node.js instalado
- [##OPCIONAL##] Docker instalado (https://www.docker.com/)
- [##ESSENCIAL##] MongoDB instalado (https://www.mongodb.com/try/download/community)
- [##ESSENCIAL##] MongoDB Compass instalado para acessar Banco LOCALMENTE (https://www.mongodb.com/try/download/compass)
- Possuir conta no MongoDB Atlas para acessar o Banco pela INTERNET/ONLINE (https://www.mongodb.com/products/platform/atlas-database)

---

## Como rodar o projeto (2 OPÇÕES)

=+ 1º OPÇÃO: (Com Docker instalado) =+

1.Com MongoDB e MongoDB Compass Instalado
  - No MongoDB Compass adicione uma nova conexão e
    - No campo NAME: "localhost:27017"
    - No campo  URI copie "mongodb://localhost:27017/bookboxed"

2.abra o terminal na pasta bookboxed e digite "docker compose up --build"

3.Acesse http://localhost:3000

4. Teste as funções da BIBLIOTECA VIRTUAL BOOKBOXED

=+ 2º OPÇÃO: (Sem Docker) +=

1.Crie um novo terminal para backend e outro para frontend e instale as dependências

  - acesse a pasta backend (cd backend) e digite "npm install"
  - acesse a pasta frontend (cd frontend) e digite "npm install"

2.Instale LOCALMENTE ou acesse ONLINE o MongoDB
         (RECOMENDADO)
         
- LOCALMENTE (copie isso no arquivo .env "mongodb://localhost:27017/bookboxed"):
  - No MongoDB Compass adicione uma nova conexão e
    - No campo NAME: "localhost:27017"
    - No campo  URI copie "mongodb://localhost:27017/bookboxed"

- ONLINE: MongoDB Atlas (copie isso no arquivo .env "mongodb+srv://user123:senha123@bookboxed.rd9hwbm.mongodb.net/bookboxed?retryWrites=true&w=majority&appName=BookBoxed")

3. Inicie o Back-end (npm start na pasta backend pelo terminal)

4. Inicie o Front-end (npm start na pasta frontend pelo terminal) e aguarde pelo redirecionamento para a página inicial

5. Acesse http://localhost:3000
   
6. Teste as funções da BIBLIOTECA VIRTUAL BOOKBOXED

Verifique os dados no MongoDB (via Compass ou Atlas)

