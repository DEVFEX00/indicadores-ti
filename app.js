/**
 * Dashboard TI - Landing Page Executiva Editável com Indicadores Consolidados
 */

const STORAGE_KEY_DATA = "dashboard_ti_full_data_v2";
const STORAGE_KEY_PASSWORD = "dashboard_ti_pwd";
const STORAGE_KEY_AUTH = "dashboard_ti_auth_session";

// Dados Oficiais Consolidados (Baseados nos dados oficiais de Outubro com histórico e estrutura genérica reutilizável)
const DEFAULT_DATA = {
  general: {
    badge: "Painel Executivo Geral",
    title: "Indicadores Departamento TI",
    subtitle:
      "Acompanhamento consolidado de entregas, engajamento de marketing, resolução de tickets, evolução de comunidades, projetos de sistemas/IA e roadmap estratégico.",
  },

  // 1. SEÇÃO CERTIFICADOS
  certificates: {
    tag: "Portal de Operações",
    title: "Certificados",
    period: "01/10/2026 a 30/10/2026",
    desc: "Métricas operacionais de emissão de certificados, clientes atendidos e controle de pendências.",
    delivered: 158, // Clientes atendidos
    issued: 749, // Certificados emitidos
    waiting: 3, // Pedidos em aguardo
    improved: [
      "Pedidos em aguardo reduziram de 7 para 3 (-57,1%), com menos pendências de informações ou validação do cliente.",
      "Capacidade contínua de atendimento em lotes mesmo com variações sazonais de volume.",
    ],
    attention: [
      "Queda no volume total: emissão caiu de 1.267 para 749 (-40,9%) e clientes atendidos de 185 para 158 (-14,6%).",
      "A média de certificados por cliente caiu de 6,8 para 4,7, indicando menor volume de formandos por contrato.",
    ],
  },

  // 2. SEÇÃO MARKETING
  marketing: {
    tag: "Aquisição & Tráfego",
    title: "Marketing",
    period: "Campanhas Mensais",
    desc: "Desempenho de campanhas de e-mail marketing, WhatsApp, canais orgânicos e tráfego pago.",
    leadsEmail: 97,
    leadsWpp: 14,
    leadsPaid: 143,
    campaigns: [
      { name: "NEWSLETTER - 4msgs", emailLeads: "30 leads", wppLeads: "-", costObs: "Orgânico" },
      { name: "PODZORA - 5msgs", emailLeads: "30 leads", wppLeads: "-", costObs: "Orgânico (+11,1%)" },
      { name: "REVIEW 1° ENCONTRO LÍDERES - 8msgs", emailLeads: "37 leads", wppLeads: "14 leads", costObs: "Orgânico" },
      { name: "CAMPANHAS REDES SOCIAIS (Infoprodutores)", emailLeads: "-", wppLeads: "-", costObs: "143 leads (Tráfego Pago)" },
    ],
    improved: [
      "Tráfego pago (Agência terceirizada): melhorou de 119 para 143 leads (+20,2%), com 24 leads adicionais.",
      "O Podzora manteve tração estável e positiva, subindo de 27 para 30 leads (+11,1%).",
      "Review do 1º Encontro de Líderes gerou 14 levantadas de mão diretas no WhatsApp.",
    ],
    attention: [
      "Ações internas e e-mail (Orgânico): queda expressiva de 615 para 97 leads (-84,2%) devido à ausência de megaevento presencial no período.",
      "Newsletter caiu de 51 para 30 leads (-41,2%), acompanhando a redução do volume de disparos de 8 para 4 mensagens.",
    ],
  },

  // 3. SEÇÃO TICKETS (Dashboard oficial preservado)
  tickets: {
    tag: "Suporte & Chamados",
    title: "Tickets",
    period: "Acompanhamento Mensal",
    desc: "Acompanhamento executivo de chamados abertos, resolvidos e produtividade individual da equipe de TI.",
    badge: "Indicadores Mensais do TI",
    heroTitle: "Visão mensal do desempenho do departamento de TI.",
    heroDescription:
      "Dashboard executivo com leitura rápida de abertos, resolvidos, percentual individual e desempenho total do setor em relação à meta mensal acima de 80%.",
    goal: 80,
    team: [
      { role: "CTO", name: "Pedro", opened: 14, resolved: 5 },
      { role: "Supervisor", name: "Frank", opened: 2, resolved: 1 },
      { role: "Analista", name: "Clever", opened: 7, resolved: 51 },
      { role: "Analista", name: "Kauan", opened: 1, resolved: 7 },
    ],
    cycles: [
      { name: "Clever", c1: "16", c2: "16", c3: "7", c4: "12" },
      { name: "Kauan", c1: "1", c2: "1", c3: "-", c4: "1" },
      { name: "Frank", c1: "-", c2: "-", c3: "-", c4: "-" },
      { name: "Pedro", c1: "-", c2: "1", c3: "-", c4: "-" },
    ],
    improved: [
      "A taxa de conclusão subiu de 64,37% para 72,73% (+8,36 pontos percentuais).",
      "Os tickets resolvidos aumentaram de 56 para 64 (+14,3%), enquanto os abertos caíram de 31 para 24 (-22,6%).",
      "Alta produtividade operacional dos analistas Clever (87,93%) e Kauan (87,50%), superando a meta individual de 80%.",
    ],
    attention: [
      "A meta global acima de 80% ainda não foi atingida (ficou em 72,73%). Faltaram 7 conclusões para bater a meta de 80,68%.",
      "Pedro concentra 14 dos 24 tickets em aberto; demanda alinhamento de prioridades de gestão técnica e mitigação de gargalos.",
    ],
  },

  // 4. SEÇÃO COMUNIDADES
  communities: {
    tag: "Engajamento & Canais",
    title: "Comunidades",
    period: "Crescimento Acumulado",
    desc: "Monitoramento de captação de leads em páginas de conversão e membros ativos nos grupos de WhatsApp.",
    rdLeads: 112,
    wppLeads: 110,
    improved: [
      "Crescimento constante: inscritos na página passaram de 105 para 112 (+6,7%; +7 leads).",
      "Grupo do WhatsApp avançou para 110 membros ativos (+2,8%; +3 membros).",
      "Retenção sólida e engajamento qualificado da Comunidade Líderes FEX.",
    ],
    attention: [
      "Desaceleração no ritmo de novas entradas quando comparado aos meses de pico (julho/agosto).",
      "Gap entre novos leads na página e entrada no grupo do WhatsApp: necessário otimizar página de agradecimento e link direto para o grupo.",
    ],
  },

  // 5. SEÇÃO SISTEMAS E IA
  systems: {
    tag: "Engenharia & Soluções",
    title: "Sistemas e IA",
    period: "Entregas & Projetos",
    desc: "Status de implantação, migrações, integrações e novos produtos em desenvolvimento.",
    projects: [
      {
        name: "FEX Corp",
        status: "done",
        statusText: "Alinhado / Em Finalização",
        planned:
          "Definição de escopo para gestão de clientes, contratos e entregáveis, além de integração com Notion.",
        done: "Alinhamento realizado com foco em gestão de clientes, contratos e dashboards. Melhorias apontadas pelo time + revisão em finalização. Versão 1.0 do encoder de Plano de Ensino estruturado pronta.",
      },
      {
        name: "JACAD (Novo Sistema Acadêmico)",
        status: "progress",
        statusText: "Em Validação / Treinamento",
        planned: "Montar plano de virada de chave de sistemas (TGC e pós-graduações).",
        done: "Pacote de horas extras de treinamento concluído em 08 e 09/10. Simulação de migração de dados do Unimestre avançou bem. Análise de orçamento para fluxo sem financeiro em andamento.",
      },
      {
        name: "UNICO SKILL & FEX Hub Matrículas",
        status: "done",
        statusText: "Validado / Aguardando Cursos",
        planned: "Construir integração direta com JACAD.",
        done: "Sistema FEX Hub Matrículas (web app) criado e validado para gerenciar pedidos recebidos e aprovação. Pendência atual: lista final de cursos para parametrização.",
      },
      {
        name: "Sólides (Ambiente LXP)",
        status: "progress",
        statusText: "Ambiente Criado",
        planned: "Construir ambiente LXP dedicado para a Sólides.",
        done: "Ambiente criado com sucesso. Pendências: definição sobre integração via JACAD/Unimestre e envio de pacote de assets visuais do cliente para tematização.",
      },
      {
        name: "App FEX Comercial + Gerador de Propostas",
        status: "pause",
        statusText: "Pausado Temporariamente",
        planned: "Retomar planejamento e prototipação com apoio da IA Zora.",
        done: "Projeto pausado estrategicamente para focar nos prazos de migração do JACAD e Hub de Matrículas.",
      },
    ],
  },

  // 6. SEÇÃO PLANEJAMENTO
  planning: {
    tag: "Roadmap Estratégico",
    title: "Planejamento",
    period: "Metas Próximo Ciclo",
    desc: "Próximos passos prioritários, campanhas estratégicas e entregas do próximo ciclo.",
    categories: [
      {
        title: "Campanhas & Aquisição",
        items: [
          "B2C Extensão Universitária - Proposta Plano Bronze (Esquenta Black Friday).",
          "B2C Pós-Graduação - Proposta Plano Prata.",
          "B2B - Convite para palestras corporativas e Workshops de T&D.",
          "Novo convite para participação da nova temporada do Podzora.",
          "Funis de Tráfego Pago: Formações FEX, Extensão Universitária A/B e Gênio Oculto.",
        ],
      },
      {
        title: "Sistemas & Infraestrutura",
        items: [
          "Finalização da migração JACAD + Plataforma LXP + Biblioteca Virtual.",
          "Definição oficial da data de virada de chave de sistemas (TGC e Pós).",
          "Disponibilização da versão de produção do FEX Corp para os gestores.",
          "Parametrização do catálogo de cursos na esteira do FEX Hub Matrículas.",
        ],
      },
      {
        title: "Operações & Atendimento",
        items: [
          "Redução das pendências de validação e emissão ágil no Portal de Certificados.",
          "Atingimento da meta de 80% nos tickets através da redistribuição de chamados.",
          "Implementação de teste A/B no fluxo de entrada da Comunidade Líderes FEX.",
        ],
      },
    ],
  },
};

const DEFAULT_PASSWORD = "admin123";

// Estado da Aplicação
let appData = loadData();
let isAuthenticated = sessionStorage.getItem(STORAGE_KEY_AUTH) === "true";

// Utilitários de cálculo e formatação
function formatPercent(value) {
  return `${value.toFixed(2).replace(".", ",")}%`;
}

function calculateRate(opened, resolved) {
  const total = opened + resolved;
  if (!total) return 0;
  return (resolved / total) * 100;
}

function escapeHtml(text) {
  if (typeof text !== "string") return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTextLines(items) {
  if (!items || !items.length) return "";
  return items
    .map((item) => {
      const trimmed = item.trim();
      if (!trimmed) {
        return '<li class="empty-line">&nbsp;</li>';
      }
      return `<li>${escapeHtml(item)}</li>`;
    })
    .join("");
}

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DATA);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Falha ao ler dados do LocalStorage:", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(data));
  appData = data;
  renderAllSections();
}

function getStoredPassword() {
  return localStorage.getItem(STORAGE_KEY_PASSWORD) || DEFAULT_PASSWORD;
}

function setStoredPassword(newPassword) {
  if (newPassword && newPassword.trim()) {
    localStorage.setItem(STORAGE_KEY_PASSWORD, newPassword.trim());
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

// ==========================================
// RENDERIZAÇÃO DAS 6 SEÇÕES NA LANDING PAGE
// ==========================================
function renderAllSections() {
  // Cabeçalho da Landing Page
  document.getElementById("main-badge").textContent = appData.general.badge;
  document.getElementById("main-title").textContent = appData.general.title;
  document.getElementById("main-subtitle").textContent = appData.general.subtitle;

  // 1. Renderizar Certificados
  renderCertificates();

  // 2. Renderizar Marketing
  renderMarketing();

  // 3. Renderizar Tickets (Mantendo fidelidade total ao visual original)
  renderTickets();

  // 4. Renderizar Comunidades
  renderCommunities();

  // 5. Renderizar Sistemas e IA
  renderSystems();

  // 6. Renderizar Planejamento
  renderPlanning();

  updateModeUI();
}

// 1. Seção Certificados
function renderCertificates() {
  const cert = appData.certificates;
  document.getElementById("cert-tag").textContent = cert.tag;
  document.getElementById("cert-title").textContent = cert.title;
  document.getElementById("cert-period").textContent = cert.period;
  document.getElementById("cert-desc").textContent = cert.desc;

  const avgPerClient = cert.delivered > 0 ? (cert.issued / cert.delivered).toFixed(1) : "0";

  document.getElementById("cert-kpi-grid").innerHTML = `
    <article class="kpi-card">
      <span>Pedidos Entregues (Clientes)</span>
      <strong>${cert.delivered}</strong>
      <small>Clientes atendidos com sucesso</small>
    </article>
    <article class="kpi-card">
      <span>Certificados Emitidos</span>
      <strong>${cert.issued}</strong>
      <small>Média de ${avgPerClient} certificados / cliente</small>
    </article>
    <article class="kpi-card">
      <span>Pedidos em Aguardo</span>
      <strong style="color: ${cert.waiting <= 5 ? "#86efac" : "#fca5a5"};">${cert.waiting}</strong>
      <small>Aguardando validação do cliente</small>
    </article>
  `;

  document.getElementById("cert-perf-box").innerHTML = `
    <h4>📊 Resumo da Performance - Certificados</h4>
    <div class="performance-grid">
      <div class="perf-column positive">
        <h5>✅ O que Melhorou / Destaques</h5>
        <ul>
          ${renderTextLines(cert.improved)}
        </ul>
      </div>
      <div class="perf-column warning">
        <h5>⚠️ Pontos de Atenção</h5>
        <ul>
          ${renderTextLines(cert.attention)}
        </ul>
      </div>
    </div>
  `;
}

// 2. Seção Marketing
function renderMarketing() {
  const mkt = appData.marketing;
  document.getElementById("mkt-tag").textContent = mkt.tag;
  document.getElementById("mkt-title").textContent = mkt.title;
  document.getElementById("mkt-period").textContent = mkt.period;
  document.getElementById("mkt-desc").textContent = mkt.desc;

  const totalLeads = (Number(mkt.leadsEmail) || 0) + (Number(mkt.leadsWpp) || 0) + (Number(mkt.leadsPaid) || 0);

  document.getElementById("mkt-kpi-grid").innerHTML = `
    <article class="kpi-card">
      <span>Leads E-mails (Orgânico)</span>
      <strong>${mkt.leadsEmail}</strong>
      <small>Levantadas de mão por e-mail</small>
    </article>
    <article class="kpi-card">
      <span>Leads WhatsApp</span>
      <strong>${mkt.leadsWpp}</strong>
      <small>Levantadas de mão WhatsApp</small>
    </article>
    <article class="kpi-card">
      <span>Tráfego Pago (Redes)</span>
      <strong>${mkt.leadsPaid}</strong>
      <small>Infoprodutores & Ads</small>
    </article>
    <article class="kpi-card">
      <span>Total de Leads do Mês</span>
      <strong style="color: #38bdf8;">${totalLeads}</strong>
      <small>Soma dos canais integrados</small>
    </article>
  `;

  document.getElementById("mkt-table-body").innerHTML = mkt.campaigns
    .map(
      (camp) => `
      <tr>
        <td><strong>${escapeHtml(camp.name)}</strong></td>
        <td>${escapeHtml(camp.emailLeads)}</td>
        <td>${escapeHtml(camp.wppLeads)}</td>
        <td><span class="badge" style="background:rgba(56,189,248,0.1);color:#bae6fd;border-color:rgba(56,189,248,0.3);">${escapeHtml(
          camp.costObs
        )}</span></td>
      </tr>
    `
    )
    .join("");

  document.getElementById("mkt-perf-box").innerHTML = `
    <h4>📈 Resumo da Performance - Marketing</h4>
    <div class="performance-grid">
      <div class="perf-column positive">
        <h5>✅ Destaques Positivos</h5>
        <ul>
          ${renderTextLines(mkt.improved)}
        </ul>
      </div>
      <div class="perf-column warning">
        <h5>⚠️ Pontos de Atenção</h5>
        <ul>
          ${renderTextLines(mkt.attention)}
        </ul>
      </div>
    </div>
  `;
}

// 3. Seção Tickets
function renderTickets() {
  const t = appData.tickets;
  document.getElementById("tickets-tag").textContent = t.tag;
  document.getElementById("tickets-title").textContent = t.title;
  document.getElementById("tickets-period").textContent = t.period;
  document.getElementById("tickets-desc").textContent = t.desc;

  document.getElementById("hero-badge").textContent = t.badge;
  document.getElementById("hero-title").textContent = t.heroTitle;
  document.getElementById("hero-description").textContent = t.heroDescription;

  const totals = t.team.reduce(
    (acc, person) => {
      acc.opened += Number(person.opened) || 0;
      acc.resolved += Number(person.resolved) || 0;
      return acc;
    },
    { opened: 0, resolved: 0 }
  );

  const departmentRate = calculateRate(totals.opened, totals.resolved);
  const goalReached = departmentRate > t.goal;

  // Lista compacta do Hero lateral
  document.getElementById("people-list").innerHTML = t.team
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

  // Sumário Executivo com barra de progresso
  document.getElementById("summary").innerHTML = `
    <section class="summary-card">
      <div class="summary-top">
        <div>
          <span class="summary-label">Resultado do departamento</span>
          <strong class="summary-rate">${formatPercent(departmentRate)}</strong>
          <p class="summary-meta">Meta do departamento: acima de ${t.goal}%</p>
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

  // Grid dos Colaboradores
  document.getElementById("team-grid").innerHTML = t.team
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

  // Tabela de Ciclos de Tickets
  if (t.cycles && t.cycles.length > 0) {
    document.getElementById("cycles-table-body").innerHTML = t.cycles
      .map(
        (c) => `
        <tr>
          <td><strong>${escapeHtml(c.name)}</strong></td>
          <td>${escapeHtml(c.c1)}</td>
          <td>${escapeHtml(c.c2)}</td>
          <td>${escapeHtml(c.c3)}</td>
          <td>${escapeHtml(c.c4)}</td>
        </tr>
      `
      )
      .join("");
  }

  // Resumo de Performance dos Tickets
  document.getElementById("tickets-perf-box").innerHTML = `
    <h4>🎯 Resumo da Performance - Tickets</h4>
    <div class="performance-grid">
      <div class="perf-column positive">
        <h5>✅ Evolução Positiva</h5>
        <ul>
          ${renderTextLines(t.improved)}
        </ul>
      </div>
      <div class="perf-column warning">
        <h5>⚠️ Pontos de Atenção</h5>
        <ul>
          ${renderTextLines(t.attention)}
        </ul>
      </div>
    </div>
  `;
}

// 4. Seção Comunidades
function renderCommunities() {
  const com = appData.communities;
  document.getElementById("com-tag").textContent = com.tag;
  document.getElementById("com-title").textContent = com.title;
  document.getElementById("com-period").textContent = com.period;
  document.getElementById("com-desc").textContent = com.desc;

  const totalMembers = (Number(com.rdLeads) || 0) + (Number(com.wppLeads) || 0);

  document.getElementById("com-kpi-grid").innerHTML = `
    <article class="kpi-card">
      <span>Inscritos Página (RD Station)</span>
      <strong>${com.rdLeads}</strong>
      <small>Leads captados na landing page</small>
    </article>
    <article class="kpi-card">
      <span>Grupo WhatsApp Ativo</span>
      <strong>${com.wppLeads}</strong>
      <small>Membros participantes ativos</small>
    </article>
    <article class="kpi-card">
      <span>Total Acumulado de Leads</span>
      <strong style="color: #c084fc;">${totalMembers}</strong>
      <small>Alcance consolidado das comunidades</small>
    </article>
  `;

  document.getElementById("com-perf-box").innerHTML = `
    <h4>👥 Resumo da Performance - Comunidades</h4>
    <div class="performance-grid">
      <div class="perf-column positive">
        <h5>✅ Destaques do Mês</h5>
        <ul>
          ${renderTextLines(com.improved)}
        </ul>
      </div>
      <div class="perf-column warning">
        <h5>⚠️ Pontos de Atenção</h5>
        <ul>
          ${renderTextLines(com.attention)}
        </ul>
      </div>
    </div>
  `;
}

// 5. Seção Sistemas e IA
function renderSystems() {
  const sys = appData.systems;
  document.getElementById("sys-tag").textContent = sys.tag;
  document.getElementById("sys-title").textContent = sys.title;
  document.getElementById("sys-period").textContent = sys.period;
  document.getElementById("sys-desc").textContent = sys.desc;

  document.getElementById("sys-projects-grid").innerHTML = sys.projects
    .map(
      (p) => `
      <article class="project-card">
        <div class="project-card-header">
          <h4>${escapeHtml(p.name)}</h4>
          <span class="project-status-badge ${p.status}">${escapeHtml(p.statusText)}</span>
        </div>
        <div class="project-info-block">
          <strong>Planejado</strong>
          <p>${escapeHtml(p.planned)}</p>
        </div>
        <div class="project-info-block">
          <strong>Realizado / Status Atual</strong>
          <p>${escapeHtml(p.done)}</p>
        </div>
      </article>
    `
    )
    .join("");
}

// 6. Seção Planejamento
function renderPlanning() {
  const plan = appData.planning;
  document.getElementById("plan-tag").textContent = plan.tag;
  document.getElementById("plan-title").textContent = plan.title;
  document.getElementById("plan-period").textContent = plan.period;
  document.getElementById("plan-desc").textContent = plan.desc;

  document.getElementById("plan-roadmap-grid").innerHTML = plan.categories
    .map(
      (cat) => `
      <article class="plan-card">
        <div class="plan-card-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h4>${escapeHtml(cat.title)}</h4>
        <ul>
          ${renderTextLines(cat.items)}
        </ul>
      </article>
    `
    )
    .join("");
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

// ==========================================
// CENTRAL DE EDIÇÃO COMPLETA (MODAL + ABAS)
// ==========================================
const modal = document.getElementById("edit-modal");
const btnEditToggle = document.getElementById("btn-edit-toggle");
const btnModalClose = document.getElementById("btn-modal-close");
const btnCancelEdit = document.getElementById("btn-cancel-edit");
const authSection = document.getElementById("auth-section");
const editorSection = document.getElementById("editor-section");
const authForm = document.getElementById("auth-form");
const authError = document.getElementById("auth-error");
const adminPasswordInput = document.getElementById("admin-password");
const masterEditorForm = document.getElementById("master-editor-form");
const btnResetDefault = document.getElementById("btn-reset-default");

// Gerenciamento de Abas
document.querySelectorAll(".tab-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");
    const tabId = btn.dataset.tab;
    const targetContent = document.getElementById(tabId);
    if (targetContent) targetContent.classList.add("active");
  });
});

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
  populateEditorMaster();
}

// Preencher formulário completo com dados atuais
function populateEditorMaster() {
  // Aba Geral
  document.getElementById("input-main-badge").value = appData.general.badge;
  document.getElementById("input-main-title").value = appData.general.title;
  document.getElementById("input-main-subtitle").value = appData.general.subtitle;

  // Aba Certificados
  document.getElementById("input-cert-title").value = appData.certificates.title;
  document.getElementById("input-cert-period").value = appData.certificates.period;
  document.getElementById("input-cert-desc").value = appData.certificates.desc;
  document.getElementById("input-cert-delivered").value = appData.certificates.delivered;
  document.getElementById("input-cert-issued").value = appData.certificates.issued;
  document.getElementById("input-cert-waiting").value = appData.certificates.waiting;
  document.getElementById("input-cert-improved").value = appData.certificates.improved.join("\n");
  document.getElementById("input-cert-attention").value = appData.certificates.attention.join("\n");

  // Aba Marketing
  document.getElementById("input-mkt-title").value = appData.marketing.title;
  document.getElementById("input-mkt-period").value = appData.marketing.period;
  document.getElementById("input-mkt-desc").value = appData.marketing.desc;
  document.getElementById("input-mkt-leads-email").value = appData.marketing.leadsEmail;
  document.getElementById("input-mkt-leads-wpp").value = appData.marketing.leadsWpp;
  document.getElementById("input-mkt-leads-paid").value = appData.marketing.leadsPaid;
  document.getElementById("input-mkt-improved").value = appData.marketing.improved.join("\n");
  document.getElementById("input-mkt-attention").value = appData.marketing.attention.join("\n");
  renderMarketingCampaignsEditor(appData.marketing.campaigns);

  // Aba Tickets
  document.getElementById("input-tickets-title").value = appData.tickets.title;
  document.getElementById("input-tickets-goal").value = appData.tickets.goal;
  document.getElementById("input-tickets-desc").value = appData.tickets.heroDescription;
  document.getElementById("input-tickets-improved").value = appData.tickets.improved.join("\n");
  document.getElementById("input-tickets-attention").value = appData.tickets.attention.join("\n");
  renderTicketsMembersEditor(appData.tickets.team);

  // Aba Comunidades
  document.getElementById("input-com-title").value = appData.communities.title;
  document.getElementById("input-com-period").value = appData.communities.period;
  document.getElementById("input-com-desc").value = appData.communities.desc;
  document.getElementById("input-com-rd").value = appData.communities.rdLeads;
  document.getElementById("input-com-wpp").value = appData.communities.wppLeads;
  document.getElementById("input-com-improved").value = appData.communities.improved.join("\n");
  document.getElementById("input-com-attention").value = appData.communities.attention.join("\n");

  // Aba Sistemas
  document.getElementById("input-sys-title").value = appData.systems.title;
  document.getElementById("input-sys-period").value = appData.systems.period;
  document.getElementById("input-sys-desc").value = appData.systems.desc;
  renderSystemsProjectsEditor(appData.systems.projects);

  // Aba Planejamento
  document.getElementById("input-plan-title").value = appData.planning.title;
  document.getElementById("input-plan-period").value = appData.planning.period;
  document.getElementById("input-plan-desc").value = appData.planning.desc;
  renderPlanningCategoriesEditor(appData.planning.categories);

  // Aba Segurança
  document.getElementById("input-new-password").value = "";
}

// 1. Editor Dinâmico de Campanhas de Marketing
function renderMarketingCampaignsEditor(campaigns) {
  const container = document.getElementById("mkt-campaigns-editor-list");
  container.innerHTML = "";
  campaigns.forEach((camp) => {
    const card = document.createElement("div");
    card.className = "dynamic-item-card mkt-camp-card";
    card.innerHTML = `
      <div class="dynamic-item-header">
        <strong>Campanha</strong>
        <button type="button" class="btn-remove-item">Remover</button>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Nome / Origem da Campanha</label>
          <input type="text" class="form-input camp-name" value="${escapeHtml(camp.name)}" required />
        </div>
        <div class="form-group">
          <label>E-mails Leads</label>
          <input type="text" class="form-input camp-email" value="${escapeHtml(camp.emailLeads)}" required />
        </div>
        <div class="form-group">
          <label>WhatsApp Leads</label>
          <input type="text" class="form-input camp-wpp" value="${escapeHtml(camp.wppLeads)}" required />
        </div>
        <div class="form-group">
          <label>Custo / Observação</label>
          <input type="text" class="form-input camp-obs" value="${escapeHtml(camp.costObs)}" required />
        </div>
      </div>
    `;
    card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
    container.appendChild(card);
  });
}

document.getElementById("btn-add-mkt-camp").addEventListener("click", () => {
  const container = document.getElementById("mkt-campaigns-editor-list");
  const card = document.createElement("div");
  card.className = "dynamic-item-card mkt-camp-card";
  card.innerHTML = `
    <div class="dynamic-item-header">
      <strong>Nova Campanha</strong>
      <button type="button" class="btn-remove-item">Remover</button>
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label>Nome / Origem da Campanha</label>
        <input type="text" class="form-input camp-name" value="NOVA CAMPANHA" required />
      </div>
      <div class="form-group">
        <label>E-mails Leads</label>
        <input type="text" class="form-input camp-email" value="0 leads" required />
      </div>
      <div class="form-group">
        <label>WhatsApp Leads</label>
        <input type="text" class="form-input camp-wpp" value="0 leads" required />
      </div>
      <div class="form-group">
        <label>Custo / Observação</label>
        <input type="text" class="form-input camp-obs" value="Orgânico" required />
      </div>
    </div>
  `;
  card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
  container.appendChild(card);
});

// 2. Editor Dinâmico de Membros de TI (Tickets)
function renderTicketsMembersEditor(team) {
  const container = document.getElementById("tickets-members-editor-list");
  container.innerHTML = "";
  team.forEach((person) => {
    const card = document.createElement("div");
    card.className = "dynamic-item-card ticket-member-card";
    card.innerHTML = `
      <div class="dynamic-item-header">
        <strong>${escapeHtml(person.name)} (${escapeHtml(person.role)})</strong>
        <button type="button" class="btn-remove-item">Remover</button>
      </div>
      <div class="form-grid-2">
        <div class="form-group">
          <label>Cargo</label>
          <input type="text" class="form-input member-role" value="${escapeHtml(person.role)}" required />
        </div>
        <div class="form-group">
          <label>Nome</label>
          <input type="text" class="form-input member-name" value="${escapeHtml(person.name)}" required />
        </div>
        <div class="form-group">
          <label>Chamados Abertos</label>
          <input type="number" min="0" class="form-input member-opened" value="${person.opened}" required />
        </div>
        <div class="form-group">
          <label>Chamados Resolvidos</label>
          <input type="number" min="0" class="form-input member-resolved" value="${person.resolved}" required />
        </div>
      </div>
    `;
    card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
    container.appendChild(card);
  });
}

document.getElementById("btn-add-ticket-member").addEventListener("click", () => {
  const container = document.getElementById("tickets-members-editor-list");
  const card = document.createElement("div");
  card.className = "dynamic-item-card ticket-member-card";
  card.innerHTML = `
    <div class="dynamic-item-header">
      <strong>Novo Membro</strong>
      <button type="button" class="btn-remove-item">Remover</button>
    </div>
    <div class="form-grid-2">
      <div class="form-group">
        <label>Cargo</label>
        <input type="text" class="form-input member-role" value="Analista" required />
      </div>
      <div class="form-group">
        <label>Nome</label>
        <input type="text" class="form-input member-name" value="Novo Nome" required />
      </div>
      <div class="form-group">
        <label>Chamados Abertos</label>
        <input type="number" min="0" class="form-input member-opened" value="0" required />
      </div>
      <div class="form-group">
        <label>Chamados Resolvidos</label>
        <input type="number" min="0" class="form-input member-resolved" value="0" required />
      </div>
    </div>
  `;
  card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
  container.appendChild(card);
});

// 3. Editor Dinâmico de Sistemas e IA
function renderSystemsProjectsEditor(projects) {
  const container = document.getElementById("sys-projects-editor-list");
  container.innerHTML = "";
  projects.forEach((proj) => {
    const card = document.createElement("div");
    card.className = "dynamic-item-card sys-project-card";
    card.innerHTML = `
      <div class="dynamic-item-header">
        <strong>${escapeHtml(proj.name)}</strong>
        <button type="button" class="btn-remove-item">Remover</button>
      </div>
      <div class="form-grid-3">
        <div class="form-group">
          <label>Nome do Projeto / Módulo</label>
          <input type="text" class="form-input proj-name" value="${escapeHtml(proj.name)}" required />
        </div>
        <div class="form-group">
          <label>Status (done / progress / pause)</label>
          <select class="form-input proj-status">
            <option value="done" ${proj.status === "done" ? "selected" : ""}>Concluído / Alinhado (Verde)</option>
            <option value="progress" ${proj.status === "progress" ? "selected" : ""}>Em Andamento (Amarelo)</option>
            <option value="pause" ${proj.status === "pause" ? "selected" : ""}>Pausado (Vermelho)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Texto da Tag de Status</label>
          <input type="text" class="form-input proj-statustext" value="${escapeHtml(proj.statusText)}" required />
        </div>
      </div>
      <div class="form-group">
        <label>Planejado</label>
        <textarea class="form-textarea proj-planned" rows="2" required>${escapeHtml(proj.planned)}</textarea>
      </div>
      <div class="form-group">
        <label>Realizado / Status Atual</label>
        <textarea class="form-textarea proj-done" rows="2" required>${escapeHtml(proj.done)}</textarea>
      </div>
    `;
    card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
    container.appendChild(card);
  });
}

document.getElementById("btn-add-sys-project").addEventListener("click", () => {
  const container = document.getElementById("sys-projects-editor-list");
  const card = document.createElement("div");
  card.className = "dynamic-item-card sys-project-card";
  card.innerHTML = `
    <div class="dynamic-item-header">
      <strong>Novo Projeto</strong>
      <button type="button" class="btn-remove-item">Remover</button>
    </div>
    <div class="form-grid-3">
      <div class="form-group">
        <label>Nome do Projeto / Módulo</label>
        <input type="text" class="form-input proj-name" value="Novo Projeto" required />
      </div>
      <div class="form-group">
        <label>Status</label>
        <select class="form-input proj-status">
          <option value="done">Concluído / Alinhado (Verde)</option>
          <option value="progress" selected>Em Andamento (Amarelo)</option>
          <option value="pause">Pausado (Vermelho)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Texto da Tag de Status</label>
        <input type="text" class="form-input proj-statustext" value="Em Andamento" required />
      </div>
    </div>
    <div class="form-group">
      <label>Planejado</label>
      <textarea class="form-textarea proj-planned" rows="2" required>Objetivos planejados...</textarea>
    </div>
    <div class="form-group">
      <label>Realizado / Status Atual</label>
      <textarea class="form-textarea proj-done" rows="2" required>Ações realizadas e status...</textarea>
    </div>
  `;
  card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
  container.appendChild(card);
});

// 4. Editor Dinâmico de Planejamento / Roadmap
function renderPlanningCategoriesEditor(categories) {
  const container = document.getElementById("plan-categories-editor-list");
  container.innerHTML = "";
  categories.forEach((cat) => {
    const card = document.createElement("div");
    card.className = "dynamic-item-card plan-cat-card";
    card.innerHTML = `
      <div class="dynamic-item-header">
        <strong>${escapeHtml(cat.title)}</strong>
        <button type="button" class="btn-remove-item">Remover</button>
      </div>
      <div class="form-group">
        <label>Título da Categoria</label>
        <input type="text" class="form-input plan-cat-title" value="${escapeHtml(cat.title)}" required />
      </div>
      <div class="form-group">
        <label>Itens e Ações (1 por linha)</label>
        <textarea class="form-textarea plan-cat-items" rows="4" required>${escapeHtml(cat.items.join("\n"))}</textarea>
      </div>
    `;
    card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
    container.appendChild(card);
  });
}

document.getElementById("btn-add-plan-category").addEventListener("click", () => {
  const container = document.getElementById("plan-categories-editor-list");
  const card = document.createElement("div");
  card.className = "dynamic-item-card plan-cat-card";
  card.innerHTML = `
    <div class="dynamic-item-header">
      <strong>Nova Categoria</strong>
      <button type="button" class="btn-remove-item">Remover</button>
    </div>
    <div class="form-group">
      <label>Título da Categoria</label>
      <input type="text" class="form-input plan-cat-title" value="Nova Categoria de Metas" required />
    </div>
    <div class="form-group">
      <label>Itens e Ações (1 por linha)</label>
      <textarea class="form-textarea plan-cat-items" rows="3" required>Meta 1&#10;Meta 2</textarea>
    </div>
  `;
  card.querySelector(".btn-remove-item").addEventListener("click", () => card.remove());
  container.appendChild(card);
});

// ==========================================
// SUBMISSÃO & AUTENTICAÇÃO
// ==========================================
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
    showToast("Acesso administrativo liberado!");
  } else {
    authError.textContent = "Senha incorreta. Tente novamente.";
    authError.style.display = "block";
    adminPasswordInput.select();
  }
});

// Salvar todas as seções
masterEditorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Coleta Campanhas
  const campaigns = [];
  document.querySelectorAll(".mkt-camp-card").forEach((c) => {
    campaigns.push({
      name: c.querySelector(".camp-name").value.trim(),
      emailLeads: c.querySelector(".camp-email").value.trim(),
      wppLeads: c.querySelector(".camp-wpp").value.trim(),
      costObs: c.querySelector(".camp-obs").value.trim(),
    });
  });

  // Coleta Membros Tickets
  const ticketMembers = [];
  document.querySelectorAll(".ticket-member-card").forEach((m) => {
    ticketMembers.push({
      role: m.querySelector(".member-role").value.trim(),
      name: m.querySelector(".member-name").value.trim(),
      opened: parseInt(m.querySelector(".member-opened").value, 10) || 0,
      resolved: parseInt(m.querySelector(".member-resolved").value, 10) || 0,
    });
  });

  // Coleta Projetos
  const projects = [];
  document.querySelectorAll(".sys-project-card").forEach((p) => {
    projects.push({
      name: p.querySelector(".proj-name").value.trim(),
      status: p.querySelector(".proj-status").value,
      statusText: p.querySelector(".proj-statustext").value.trim(),
      planned: p.querySelector(".proj-planned").value.trim(),
      done: p.querySelector(".proj-done").value.trim(),
    });
  });

  // Coleta Categorias de Planejamento
  const planCategories = [];
  document.querySelectorAll(".plan-cat-card").forEach((c) => {
    const rawItems = c.querySelector(".plan-cat-items").value;
    const items = rawItems
      .replace(/\r\n/g, "\n")
      .split("\n");
    planCategories.push({
      title: c.querySelector(".plan-cat-title").value.trim(),
      items: items,
    });
  });

  const parseLines = (text) =>
    text
      .replace(/\r\n/g, "\n")
      .split("\n");

  // Montagem do objeto atualizado
  const updatedData = {
    general: {
      badge: document.getElementById("input-main-badge").value.trim(),
      title: document.getElementById("input-main-title").value.trim(),
      subtitle: document.getElementById("input-main-subtitle").value.trim(),
    },
    certificates: {
      tag: "Portal de Operações",
      title: document.getElementById("input-cert-title").value.trim(),
      period: document.getElementById("input-cert-period").value.trim(),
      desc: document.getElementById("input-cert-desc").value.trim(),
      delivered: parseInt(document.getElementById("input-cert-delivered").value, 10) || 0,
      issued: parseInt(document.getElementById("input-cert-issued").value, 10) || 0,
      waiting: parseInt(document.getElementById("input-cert-waiting").value, 10) || 0,
      improved: parseLines(document.getElementById("input-cert-improved").value),
      attention: parseLines(document.getElementById("input-cert-attention").value),
    },
    marketing: {
      tag: "Aquisição & Tráfego",
      title: document.getElementById("input-mkt-title").value.trim(),
      period: document.getElementById("input-mkt-period").value.trim(),
      desc: document.getElementById("input-mkt-desc").value.trim(),
      leadsEmail: parseInt(document.getElementById("input-mkt-leads-email").value, 10) || 0,
      leadsWpp: parseInt(document.getElementById("input-mkt-leads-wpp").value, 10) || 0,
      leadsPaid: parseInt(document.getElementById("input-mkt-leads-paid").value, 10) || 0,
      campaigns: campaigns,
      improved: parseLines(document.getElementById("input-mkt-improved").value),
      attention: parseLines(document.getElementById("input-mkt-attention").value),
    },
    tickets: {
      ...appData.tickets,
      title: document.getElementById("input-tickets-title").value.trim(),
      goal: parseFloat(document.getElementById("input-tickets-goal").value) || 80,
      heroDescription: document.getElementById("input-tickets-desc").value.trim(),
      team: ticketMembers,
      improved: parseLines(document.getElementById("input-tickets-improved").value),
      attention: parseLines(document.getElementById("input-tickets-attention").value),
    },
    communities: {
      tag: "Engajamento & Canais",
      title: document.getElementById("input-com-title").value.trim(),
      period: document.getElementById("input-com-period").value.trim(),
      desc: document.getElementById("input-com-desc").value.trim(),
      rdLeads: parseInt(document.getElementById("input-com-rd").value, 10) || 0,
      wppLeads: parseInt(document.getElementById("input-com-wpp").value, 10) || 0,
      improved: parseLines(document.getElementById("input-com-improved").value),
      attention: parseLines(document.getElementById("input-com-attention").value),
    },
    systems: {
      tag: "Engenharia & Soluções",
      title: document.getElementById("input-sys-title").value.trim(),
      period: document.getElementById("input-sys-period").value.trim(),
      desc: document.getElementById("input-sys-desc").value.trim(),
      projects: projects,
    },
    planning: {
      tag: "Roadmap Estratégico",
      title: document.getElementById("input-plan-title").value.trim(),
      period: document.getElementById("input-plan-period").value.trim(),
      desc: document.getElementById("input-plan-desc").value.trim(),
      categories: planCategories,
    },
  };

  const newPassword = document.getElementById("input-new-password").value;
  if (newPassword && newPassword.trim()) {
    setStoredPassword(newPassword);
    showToast("Todas as seções e a nova senha foram atualizadas com sucesso!");
  } else {
    showToast("Dashboard atualizado com sucesso!");
  }

  saveData(updatedData);
  closeModal();
});

// Restaurar Padrões
btnResetDefault.addEventListener("click", () => {
  if (confirm("Deseja restaurar as configurações oficiais padrão com os dados de Outubro?")) {
    saveData(JSON.parse(JSON.stringify(DEFAULT_DATA)));
    localStorage.removeItem(STORAGE_KEY_PASSWORD);
    populateEditorMaster();
    showToast("Dados restaurados para o padrão oficial.");
  }
});

// Exportar JSON
document.getElementById("btn-export").addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `indicadores-ti-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Arquivo de backup JSON exportado com sucesso!");
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
      if (imported.general && imported.tickets && imported.marketing) {
        saveData(imported);
        showToast("Backup JSON importado e aplicado!");
      } else {
        alert("O arquivo JSON não possui a estrutura esperada das seções do dashboard.");
      }
    } catch (err) {
      alert("Erro ao ler o arquivo JSON: " + err.message);
    }
    fileImport.value = "";
  };
  reader.readAsText(file);
});

// Eventos Modal
btnEditToggle.addEventListener("click", openModal);
btnModalClose.addEventListener("click", closeModal);
btnCancelEdit.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) {
    closeModal();
  }
});

// Inicialização Geral
renderAllSections();
