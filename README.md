# 🗨️ Bate-Papo UOL Clone - Driven API

Um clone funcional do clássico **Chat UOL**, desenvolvido para interagir com a API pública da [Driven](https://mock-api.driven.com.br/api/v6/uol), com visual moderno, mensagens públicas e privadas, e lista de participantes em tempo real.

---

## 🚀 Tecnologias Utilizadas

- **HTML5** – Estrutura do projeto
- **CSS3** – Estilização responsiva com foco em clareza e organização
- **JavaScript (ES6+)** – Lógica do chat, DOM e comunicação com API
- **Axios** – Requisições HTTP assíncronas com a API da Driven
- **FontAwesome** – Ícones de usuário, cadeado, envio, etc.
- **Mock API da Driven** – Backend simulado para participantes e mensagens

---

## 🎯 Objetivo do Projeto

O objetivo é simular um **chat funcional em tempo real**, baseado na proposta pedagógica da Driven, reforçando conceitos como:

- Requisições `GET` e `POST`
- Manipulação do DOM
- Controle de estado de usuário
- Atualização periódica de dados
- Integração com APIs REST

---

## ✅ Funcionalidades

- 🔑 Login por nome único (evita duplicidade via status `400`)
- 📡 Manutenção da conexão com `POST /status` a cada 5 segundos
- 💬 Envio de mensagens públicas e privadas
- 📥 Leitura de mensagens com rolagem automática para a última
- 👥 Lista de participantes atualizada a cada 10 segundos
- 🧭 Barra lateral para selecionar destinatário e visibilidade
- ✅ Feedback visual com check (`✔`) nas opções selecionadas
- 🕓 Exibição de hora, remetente, destinatário e tipo da mensagem

---

## 💡 Melhorias Possíveis

- 🔔 **Notificação sonora** ou visual para novas mensagens privadas
- 👀 **Indicação de mensagem privada recebida** no `#content` (ex: "Você recebeu uma mensagem reservada")
- 🧠 **Armazenar nome do usuário no `localStorage`**
- 📱 **Responsividade total para mobile** com menu hambúrguer
- 💬 **Campo dinâmico de status** ao lado do input ("Enviando para João (reservadamente)")
- 🌐 **Internacionalização** com múltiplos idiomas
- 💾 **Persistência de histórico local** para debug offline

---

## 📦 Instalação e Uso Local

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/chat-uol-driven-clone.git
   cd chat-uol-driven-clone
Abra o index.html no navegador:

bash
Copiar
Editar
open index.html
💡 Não é necessário nenhum backend local — tudo funciona via a API pública da Driven
