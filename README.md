# Sistema de Receitas

Sistema web para cadastro e gerenciamento de receitas desenvolvido com HTML, CSS e JavaScript.  
Os dados da aplicação são armazenados utilizando o Supabase como banco de dados e backend.

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Supabase

---

## Configuração do projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/palaceIA/sistema-receitas.git
````

```bash
cd sistema-receitas
```

---

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`.

O arquivo `.env.example` contém as variáveis necessárias para conexão com o Supabase.

Exemplo:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_KEY=YOUR_SUPABASE_KEY
```

---

## Instalação das dependências

Execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

---

## Executando o projeto

Para iniciar a aplicação em ambiente de desenvolvimento:

```bash
npm run dev
```

Após iniciar, acesse a URL exibida no terminal e já pode começar a registrar suas receitas.
