const UUID = "33f83cab-b48e-411f-8bde-5beea1979118";
const BASE_URL = `https://mock-api.driven.com.br/api/v6/uol`;
let destinatarioSelecionado = "Todos";
let visibilidadeSelecionada = "message";
let logado = { nome: "" };
let lista = ["Todos"];

function aparecer() {
  document.querySelector(".esconder").classList.remove("esconder");
}

function esconder() {
  document.querySelector(".sidebar").classList.add("esconder");
}

function usuario() {
  let nome = prompt("Qual o seu nome?");
  if (!nome) return usuario();

  const dados = { name: nome };

  axios
    .post(`${BASE_URL}/participants/${UUID}`, dados)
    .then(() => {
      logado.nome = nome;
      lista.push(nome);
      atualizarListaContatos();
      manterConexao();
      buscarMensagens();
      buscarParticipantes();
    })
    .catch((erro) => {
      if (erro.response?.status === 400) {
        alert("Nome já em uso. Escolha outro.");
        usuario();
      } else {
        alert("Erro inesperado. Tente novamente.");
      }
    });
}

function manterConexao() {
  setInterval(() => {
    axios
      .post(`${BASE_URL}/status/${UUID}`, { name: logado.nome })
      .catch(() => alert("Perdemos a conexão. Atualize a página."));
  }, 5000);
}

function atualizarMensagemVisu() {
  const tipo = visibilidadeSelecionada === "message" ? "público" : "reservadamente";
  const texto = `Enviando para ${destinatarioSelecionado} (${tipo})`;
  const msgVisu = document.getElementById("menssagem-visu");
  if (msgVisu) {
    msgVisu.innerText = texto;
  }
}


function selecionarDestinatario(nome) {
  destinatarioSelecionado = nome;
  document.querySelectorAll("#contatos .check").forEach((span) => span.classList.add("esconder"));
  const opcoes = document.querySelectorAll("#contatos .option");
  opcoes.forEach((li) => {
    if (li.textContent.includes(nome)) {
      li.querySelector(".check").classList.remove("esconder");
      atualizarMensagemVisu();
    }
  });
}


function atualizarListaContatos() {
  const contatos = document.querySelector("#contatos");
  contatos.innerHTML = "";

  lista.forEach((nome) => {
    const li = document.createElement("li");
    li.className = "option";
    li.innerHTML = `<img src="./imagens/person-circle 1.png" alt="Ícone de pessoas" /><i class="fas fa-user icon"></i> ${nome} <span class="check ${nome === destinatarioSelecionado ? '' : 'esconder'}">✔</span>`;
    li.onclick = () => selecionarDestinatario(nome);
    contatos.appendChild(li);
  });
}

function configurarVisibilidade() {
  document.querySelectorAll("#visibilidade .option").forEach((el) => {
    el.onclick = () => {
      visibilidadeSelecionada = el.getAttribute("data-vis");

      document.querySelectorAll("#visibilidade .check").forEach(span => span.classList.add("esconder"));

      el.querySelector(".check").classList.remove("esconder");

    };
  });
}

function buscarMensagens() {
  axios
    .get(`${BASE_URL}/messages/${UUID}`)
    .then((res) => {
      exibirMensagens(res.data);
    })
    .catch(tratarErro);
}

function enviarMensagem() {
  const input = document.getElementById("mensagem");
  const texto = input.value.trim();
  if (!texto) return;

  const mensagem = {
    from: logado.nome,
    to: destinatarioSelecionado,
    text: texto,
    type: visibilidadeSelecionada,
  };

  axios
    .post(`${BASE_URL}/messages/${UUID}`, mensagem)
    .then(() => {
      input.value = "";
      buscarMensagens();
    })
    .catch(tratarErro);
}

function buscarParticipantes() {
  axios
    .get(`${BASE_URL}/participants/${UUID}`)
    .then((res) => {
      const nomes = res.data.map((p) => p.name);
      lista = ["Todos", ...nomes.filter((n) => n !== logado.nome)];
      atualizarListaContatos();
    })
    .catch(tratarErro);
}

function tratarErro(erro) {
  console.error("Erro:", erro.response?.data || erro.message);
  alert("Erro ao comunicar com o servidor.");
}

function exibirMensagens(mensagens) {
  const content = document.getElementById("content");
  content.innerHTML = "";

  mensagens.forEach((msg) => {
    if (
      msg.type === "status" ||
      msg.type === "message" ||
      (msg.type === "private_message" && msg.to === logado.nome)
    ) {
      const div = document.createElement("div");
      div.className = `mensagem ${msg.type}`;
      div.innerHTML = `<strong>(${msg.time})</strong> <strong>${msg.from}</strong> para <strong>${msg.to}</strong>: ${msg.text}`;
      content.appendChild(div);
    }
  });

  content.scrollTop = content.scrollHeight;
}

window.onload = () => {
  usuario();

  setInterval(buscarMensagens, 3000);
  setInterval(buscarParticipantes, 10000);

  configurarVisibilidade();
};
