# 📊 Dashboard de Indicadores do TI (Web App Editável)

Dashboard executivo moderno com tema dark & neon green para acompanhamento mensal de métricas e chamados do departamento de Tecnologia da Informação.

O projeto foi transformado em um **Web App completo**, pronto para ser hospedado no **Vercel**, **GitHub Pages** ou **Netlify**, com controle de visualização pública e modo de edição restrito.

---

## 🚀 Funcionalidades

- **Visualização Pública Limpa**:
  - Quando publicado em plataformas como a **Vercel**, os visitantes comuns veem apenas o painel interativo com os indicadores atualizados.
  - O modo de edição requer a senha administrativa mestre.
- **Modo Editor Interno Completo**:
  - Edição do título, subtítulo, selo de categoria e meta percentual do departamento (ex: 80%).
  - Adição, edição e remoção de colaboradores (Cargo, Nome, Chamados Abertos, Chamados Resolvidos).
  - Cálculo automático e em tempo real das taxas individuais e taxa geral da equipe.
  - Opção para alterar a senha de acesso administrativo.
- **Persistência de Dados**:
  - Os dados ficam salvos automaticamente no navegador (`localStorage`).
- **Exportação & Importação (Backup JSON)**:
  - Permite exportar a configuração atual em arquivo `.json`.
  - Permite importar arquivos `.json` em outro navegador ou computador com 1 clique.
- **Design Moderno e Responsivo**:
  - Totalmente adaptado para monitores, tablets e smartphones.

---

## 🔐 Acesso ao Modo Editor

- **Senha Padrão Inicial**: `admin123`
- *Dica:* Você pode alterar a senha a qualquer momento abrindo o editor, inserindo uma nova senha no campo correspondente e salvando.

---

## 🛠️ Como Rodar Localmente

Se você deseja testar localmente antes de publicar:

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/dashboard-indicadores-ti.git
   cd dashboard-indicadores-ti
   ```

2. Abra o arquivo `index.html` em qualquer navegador:
   - Dê um duplo clique no arquivo `index.html`, ou use a extensão *Live Server* do VS Code, ou execute:
   ```bash
   npx serve .
   ```

---

## 🌐 Como Publicar na Vercel

1. Crie um novo repositório no seu GitHub (ex: `dashboard-indicadores-ti`).
2. Faça o push dos arquivos para o GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: Dashboard de TI editavel"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/dashboard-indicadores-ti.git
   git push -u origin main
   ```
3. Acesse [vercel.com](https://vercel.com) e faça login.
4. Clique em **"Add New Project"** e selecione o repositório importado.
5. Deixe as opções padrão e clique em **Deploy**.
6. Pronto! A Vercel criará um link público para seu dashboard.

---

## 📁 Estrutura de Arquivos

```text
├── index.html            # Estrutura HTML do Dashboard e do Modal Administrativo
├── style.css             # Estilos CSS, temas e responsividade
├── app.js                # Lógica de cálculo, persistência e autenticação
├── package.json          # Metadados do projeto
├── .gitignore            # Arquivos ignorados pelo Git
└── README.md             # Instruções e documentação
```
