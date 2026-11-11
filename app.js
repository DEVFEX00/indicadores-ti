/**
 * Dashboard TI - Aplicação Web Editável
 */

// Chaves de armazenamento LocalStorage
const STORAGE_KEY_DATA = "dashboard_ti_data";
const STORAGE_KEY_PASSWORD = "dashboard_ti_pwd";
const STORAGE_KEY_AUTH = "dashboard_ti_auth_session";

// Dados iniciais padrão
const DEFAULT_DATA = {
  badge: "Indicadores Mensais do TI",
  title: "Visão mensal do desempenho do departamento de TI.",
  description:
    "Dashboard executivo com leitura rápida de abertos, resolvidos, percentual individual e desempenho total do setor em relação à meta mensal acima de 80%.",
  goal: 80,
  team: [
    { role: "CTO", name: "Pedro", opened: 5, resolved: 1 },
    { role: "Supervisor", name: "Frank", opened: 2, resolved: 2 },
    { role: "Analista", name: "Clever", opened: 21, resolved: 48 },
    { role: "Estagiário", name: "Kauan", opened: 3, resolved: 5 },
  ],
};

const DEFAULT_PASSWORD = "admin123";

// Estado global
let appData = loadData();
let isAuthenticated = sessionStorage.getItem(STORAGE_KEY_AUTH) === "true";

// Helper de formatação
function formatPercent(value) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function calculateRate(opened, resolved) {
  const total = opened + resolved;
  if (!total) return 0;
  return (resolved / total) * 100;
}

// Carregar dados salvos ou padrão
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DATA);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Falha ao carregar dados do LocalStorage:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  appData = data;
  renderDashboard();
}

function getStoredPassword() {
  return localStorage.getItem(STORAGE_KEY_PASSWORD) || DEFAULT_PASSWORD;
}

function setStoredPassword(newPassword) {
  if (newPassword && newPassword.trim()) {
    localStorage.setItem(STORAGE_KEY_PASSWORD, newPassword.trim());
  }
}

// Renderização Principal do Dashboard
function renderDashboard() {
  // Cabeçalho / Hero
  document.getElementById("hero-badge").textContent = appData.badge;
  document.getElementById("hero-title").textContent = appData.title;
  document.getElementById("hero-description").textContent = appData.description;

  // Totais
  const totals = appData.team.reduce(
    (acc, person) => {
      acc.opened += Number(person.opened) || 0;
      acc.resolved += Number(person.resolved) || 0;
      return acc;
    },
    { opened: 0, resolved: 0 }
  );

  const departmentRate = calculateRate(totals.opened, totals.resolved);
  const goalReached = departmentRate > appData.goal;

  // Lista compacta de pessoas (Hero lateral)
  const peopleList = document.getElementById("people-list");
  peopleList.innerHTML = appData.team
    .map(
      (person) => `
      <article class="person-row">
        <div>
          <span>${escapeHtml(person.role)}</span>
          <strong>${escapeHtml(person.name)}</strong>
        </div>
        <strong class="person-rate">${formatPercent(
          calculateRate(Number(person.opened) || 0, Number(person.resolved) || 0)
        )}</strong>
      </article>
    `
    )
    .join("");

  // Sumário Executivo
  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <section class="summary-card">
      <div class="summary-top">
        <div>
          <span class="summary-label">Resultado do departamento</span>
          <strong class="summary-rate">${formatPercent(departmentRate)}</strong>
          <p class="summary-meta">Meta do departamento: acima de ${appData.goal}%</p>
          <p class="summary-status ${goalReached ? "status-ok" : "status-alert"}">
            ${goalReached ? "Meta atingida" : "Meta não atingida"}
          </p>
        </div>
        <div class="summary-pill">Total limitado visualmente a 100%</div>
      </div>
      <div class="progress-block">
        <div class="progress-label">
          <span>Progresso total</span>
          <strong>${formatPercent(Math.min(departmentRate, 100))}</strong>
        </div>
        <div class="progress-track">
          <div class="progress-bar" style="width: ${Math.min(departmentRate, 100)}%;"></div>
        </div>
      </div>
      <div class="summary-stats">
        <article class="summary-stat">
          <span>Total abertos</span>
          <strong>${totals.opened}</strong>
        </article>
        <article class="summary-stat">
          <span>Total resolvidos</span>
          <strong>${totals.resolved}</strong>
        </article>
        <article class="summary-stat">
          <span>Resultado atual</span>
          <strong>${formatPercent(departmentRate)}</strong>
        </article>
      </div>
    </section>
  `;

  // Grid de Membros
  const teamGrid = document.getElementById("team-grid");
  teamGrid.innerHTML = appData.team
    .map((person) => {
      const opened = Number(person.opened) || 0;
      const resolved = Number(person.resolved) || 0;
      const rate = calculateRate(opened, resolved);
      const safeRate = Math.max(0, Math.min(rate, 100));

      return `
        <article class="member-card">
          <div class="member-head">
            <span class="role">${escapeHtml(person.role)}</span>
            <h2>${escapeHtml(person.name)}</h2>
          </div>
          <div class="member-rate">
            <div>
              <span>Percentual individual</span>
              <strong>${formatPercent(rate)}</strong>
            </div>
            <span>${resolved} resolvidos</span>
          </div>
          <div class="metric-list">
            <div class="metric">
              <span>Abertos</span>
              <strong>${opened}</strong>
            </div>
            <div class="metric">
              <span>Resolvidos</span>
              <strong>${resolved}</strong>
            </div>
            <div class="metric">
              <span>Total tratado</span>
              <strong>${opened + resolved}</strong>
            </div>
          </div>
          <div class="progress-block">
            <div class="progress-label">
              <span>Resolvidos / total</span>
              <strong>${formatPercent(rate)}</strong>
            </div>
            <div class="progress-track">
              <div class="progress-bar" style="width: ${safeRate}%;"></div>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  updateModeUI();
}

function updateModeUI() {
  const badge = document.getElementById("mode-badge");
  const editBtnText = document.getElementById("btn-edit-text");
  if (isAuthenticated) {
    badge.textContent = "Modo Administrador";
    badge.classList.add("badge-active");
    editBtnText.textContent = "Editar Painel";
  } else {
    badge.textContent = "Visualização";
    badge.classList.remove("badge-active");
    editBtnText.textContent = "Acesso Editor";
  }
}

// Prevenção de XSS
function escapeHtml(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Toast Notificações
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// Modal e Editor
const modal = document.getElementById("edit-modal");
const btnEditToggle = document.getElementById("btn-edit-toggle");
const btnModalClose = document.getElementById("btn-modal-close");
const btnCancelEdit = document.getElementById("btn-cancel-edit");
const authSection = document.getElementById("auth-section");
const editorSection = document.getElementById("editor-section");
const authForm = document.getElementById("auth-form");
const authError = document.getElementById("auth-error");
const adminPasswordInput = document.getElementById("admin-password");
const dashboardForm = document.getElementById("dashboard-form");
const membersEditorList = document.getElementById("members-editor-list");
const btnAddMember = document.getElementById("btn-add-member");
const btnResetDefault = document.getElementById("btn-reset-default");

function openModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  if (isAuthenticated) {
    showEditorView();
  } else {
    showAuthView();
  }
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  authError.style.display = "none";
  adminPasswordInput.value = "";
}

function showAuthView() {
  authSection.style.display = "block";
  editorSection.style.display = "none";
  setTimeout(() => adminPasswordInput.focus(), 100);
}

function showEditorView() {
  authSection.style.display = "none";
  editorSection.style.display = "block";
  populateEditorForm();
}

function populateEditorForm() {
  document.getElementById("input-badge").value = appData.badge;
  document.getElementById("input-goal").value = appData.goal;
  document.getElementById("input-title").value = appData.title;
  document.getElementById("input-description").value = appData.description;
  document.getElementById("input-new-password").value = "";

  renderMembersEditor(appData.team);
}

function renderMembersEditor(teamList) {
  membersEditorList.innerHTML = "";
  teamList.forEach((person, index) => {
    const card = document.createElement("div");
    card.className = "member-edit-card";
    card.dataset.index = index;
    card.innerHTML = `
      <div class="member-edit-grid">
        <div class="form-group" style="margin:0">
          <label>Cargo / Função</label>
          <input type="text" class="form-input member-role" value="${escapeHtml(person.role)}" required placeholder="Ex: Analista" />
        </div>
        <div class="form-group" style="margin:0">
          <label>Nome</label>
          <input type="text" class="form-input member-name" value="${escapeHtml(person.name)}" required placeholder="Ex: João" />
        </div>
        <div class="form-group" style="margin:0">
          <label>Abertos</label>
          <input type="number" min="0" class="form-input member-opened" value="${person.opened}" required />
        </div>
        <div class="form-group" style="margin:0">
          <label>Resolvidos</label>
          <input type="number" min="0" class="form-input member-resolved" value="${person.resolved}" required />
        </div>
        <div>
          <label>&nbsp;</label>
          <button type="button" class="btn-delete" title="Remover membro">Excluir</button>
        </div>
      </div>
    `;

    card.querySelector(".btn-delete").addEventListener("click", () => {
      card.remove();
    });

    membersEditorList.appendChild(card);
  });
}

// Adicionar novo colaborador
btnAddMember.addEventListener("click", () => {
  const currentMembers = getMembersFromForm();
  currentMembers.push({ role: "Novo Cargo", name: "Novo Colaborador", opened: 0, resolved: 0 });
  renderMembersEditor(currentMembers);
});

function getMembersFromForm() {
  const cards = membersEditorList.querySelectorAll(".member-edit-card");
  const members = [];
  cards.forEach((card) => {
    const role = card.querySelector(".member-role").value.trim() || "Sem Cargo";
    const name = card.querySelector(".member-name").value.trim() || "Sem Nome";
    const opened = parseInt(card.querySelector(".member-opened").value, 10) || 0;
    const resolved = parseInt(card.querySelector(".member-resolved").value, 10) || 0;
    members.push({ role, name, opened, resolved });
  });
  return members;
}

// Autenticação
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = adminPasswordInput.value;
  const currentPassword = getStoredPassword();

  if (entered === currentPassword) {
    isAuthenticated = true;
    sessionStorage.setItem(STORAGE_KEY_AUTH, "true");
    authError.style.display = "none";
    showEditorView();
    updateModeUI();
    showToast("Acesso administrativo concedido!");
  } else {
    authError.textContent = "Senha incorreta. Tente novamente.";
    authError.style.display = "block";
    adminPasswordInput.select();
  }
});

// Salvar Formulário do Dashboard
dashboardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const members = getMembersFromForm();
  if (members.length === 0) {
    alert("Adicione pelo menos um membro na equipe!");
    return;
  }

  const updatedData = {
    badge: document.getElementById("input-badge").value.trim(),
    goal: parseFloat(document.getElementById("input-goal").value) || 80,
    title: document.getElementById("input-title").value.trim(),
    description: document.getElementById("input-description").value.trim(),
    team: members,
  };

  const newPassword = document.getElementById("input-new-password").value;
  if (newPassword && newPassword.trim()) {
    setStoredPassword(newPassword);
    showToast("Dados e nova senha salvos com sucesso!");
  } else {
    showToast("Dashboard atualizado com sucesso!");
  }

  saveData(updatedData);
  closeModal();
});

// Restaurar Padrões
btnResetDefault.addEventListener("click", () => {
  if (confirm("Deseja realmente restaurar os dados originais? As alterações atuais serão perdidas.")) {
    saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    localStorage.removeItem(STORAGE_KEY_PASSWORD);
    populateEditorForm();
    showToast("Dados restaurados para o padrão de fábrica.");
  }
});

// Exportar JSON
document.getElementById("btn-export").addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `dashboard-ti-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Arquivo JSON exportado!");
});

// Importar JSON
const fileImport = document.getElementById("file-import");
document.getElementById("btn-import-trigger").addEventListener("click", () => {
  fileImport.click();
});

fileImport.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (imported.team && Array.isArray(imported.team)) {
        saveData(imported);
        showToast("Dados importados com sucesso!");
      } else {
        alert("O arquivo JSON não possui o formato esperado de dados do Dashboard.");
      }
    } catch (err) {
      alert("Erro ao ler o arquivo JSON: " + err.message);
    }
    fileImport.value = "";
  };
  reader.readAsText(file);
});

// Eventos de Abertura / Fechamento do Modal
btnEditToggle.addEventListener("click", openModal);
btnModalClose.addEventListener("click", closeModal);
btnCancelEdit.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Inicialização
renderDashboard();
