# BookBoxed

BookBoxed é uma aplicação web de biblioteca virtual onde usuários podem visualizar, solicitar e devolver livros. Administradores podem adicionar novos títulos.

Baixe a pasta .ZIP
Descompacte e abra na sua IDE (Recomendado no VSCODE)

1. Inicie o Back-end (npm start na pasta backend)

2. Inicie o Front-end (npm start na pasta frontend)

3. Acesse http://localhost:3000

4. Teste as funções da BIBLIOTECA VIRTUAL BOOKBOXED

Verifique os dados no MongoDB (via Compass ou Atlas)

OBS:## *Caso não funcione com as intruções acima tente o seguinte:* ##

---
## Verifique os Requisitos

- Node.js instalado

---

## Como rodar o projeto

1. **Clone o repositório**

git clone https://github.com/seu-usuario/BookBoxed.git

cd BookBoxed

2. **Instale as dependências**

npm install

3. **Configure o ambiente**

Crie um arquivo .env na raiz do projeto com:

MONGO_URI=mongodb+srv://user123:senha123@bookboxed.rd9hwbm.mongodb.net/bookboxed?retryWrites=true&w=majority&appName=BookBoxed

JWT_SECRET=segredobemforte123

4. **Rode o servidor**

npm run dev
