export default function normalizeCpfDetail(detail) {
  if (!detail || typeof detail !== "object") {
    return detail;
  }

  let normalized = detail;

  if (normalized.data && !normalized.dados_pessoais && !normalized.dados_basicos) {
    normalized = normalized.data;
  }

  if (normalized.dados_basicos && !normalized.dados_pessoais) {
    const basics = normalized.dados_basicos;
    normalized.dados_pessoais = {
      cpf: basics.cpf,
      nome: basics.nome,
      nome_mae: basics.nome_mae,
      nome_pai: basics.nome_pai,
      nasc: basics.nascimento,
      sexo: basics.sexo,
      email: basics.email,
      renda: basics.renda || basics.renda_presumida,
      faixa_renda: basics.faixa_renda_id,
      cbo: basics.cbo,
    };
  }

  if (!normalized.dados_pessoais && normalized.cpf) {
    normalized.dados_pessoais = {
      cpf: normalized.cpf,
      nome: normalized.nome,
      nome_mae: normalized.nome_mae,
      nome_pai: normalized.nome_pai,
      nasc: normalized.nasc || normalized.data_nascimento,
      sexo: normalized.sexo,
      email: normalized.email,
      renda: normalized.renda,
      faixa_renda: normalized.faixa_renda_id,
      cbo: normalized.cbo,
    };
  }

  if (
    Array.isArray(normalized.emails) &&
    (!normalized.dados_pessoais || !normalized.dados_pessoais.email)
  ) {
    const item = normalized.emails.find((e) => !!e.email) || {};
    if (!normalized.dados_pessoais) normalized.dados_pessoais = {};
    normalized.dados_pessoais.email = item.email || "";
  }

  if (!Array.isArray(normalized.enderecos)) {
    const addr =
      normalized.endereco ||
      normalized.endereco_residencial ||
      (typeof normalized.enderecos === "object" ? normalized.enderecos : null);
    normalized.enderecos = addr ? [addr] : [];
  }

  let phones = [];
  if (Array.isArray(normalized.telefones)) {
    phones = normalized.telefones.map((tel) => ({
      numero: tel.numero || tel.telefone || "",
      tipo: tel.tipo || tel.operadora || "",
      whatsapp: tel.whatsapp || false,
    }));
  }
  if (Array.isArray(normalized.celulares)) {
    phones = phones.concat(
      normalized.celulares.map((c) => ({ numero: c, tipo: "Celular" }))
    );
  }
  if (!phones.length && normalized.telefone) {
    phones.push({ numero: normalized.telefone, tipo: "Fixo" });
  }
  normalized.telefones = phones;

  if (!Array.isArray(normalized.empregos)) {
    const job = normalized.emprego;
    normalized.empregos = job ? [job] : [];
  }
  if (Array.isArray(normalized.empregos)) {
    normalized.empregos = normalized.empregos.map((job) => ({
      empresa: job.empresa || job.nome_empregador || job.nome_fantasia || job.razao_possivel_ultimo_emprego,
      cargo: job.cargo || job.profissao || job.cbo,
      admissao: job.admissao || job.data_inicio_trabalho || job.data_admissao,
      termino: job.termino || job.data_termino_trabalho || job.data_termino || job.data_demissao,
      remuneracao: job.remuneracao || job.remuneracao_estimada || job.salario_mensal,
      municipio: job.municipio,
      uf: job.uf,
    }));
  }

  if (!normalized.avaliacao_score) {
    if (normalized.avalicao_score) {
      normalized.avaliacao_score = normalized.avalicao_score;
    } else if (normalized.dados_score) {
      normalized.avaliacao_score = {
        csba: normalized.dados_score.score,
        csba_faixa: normalized.dados_score.faixa_risco,
      };
    } else {
      normalized.avaliacao_score = normalized.score || {};
    }
  }

  if (!normalized.interesses) {
    normalized.interesses = normalized.tags || {};
  }

  if (!Array.isArray(normalized.ordens_de_compras)) {
    const orders =
      normalized.ordens_de_compras || normalized.compras || normalized.orders;
    normalized.ordens_de_compras = Array.isArray(orders) ? orders : [];
  }

  if (!normalized.status_receita) {
    normalized.status_receita =
      (normalized.detalhes_irpf && normalized.detalhes_irpf.sit_receita_federal) ||
      (Array.isArray(normalized.irpf) && normalized.irpf[0]?.sit_receita_federal) ||
      "";
  }

  if (!normalized.cargo_societario) {
    normalized.cargo_societario = Array.isArray(normalized.empresas)
      ? normalized.empresas.some((emp) => emp.tipo_relacao === "QSA")
        ? "Sim"
        : "Não"
      : "Não";
  }

  if (!normalized.poder_aquisitivo && normalized.poder_aquisitivo !== undefined) {
    normalized.poder_aquisitivo = {
      cod_poder_aquisitivo: normalized.poder_aquisitivo.cod_poder_aquisitivo,
      poder_aquisitivo: normalized.poder_aquisitivo.poder_aquisitivo,
      renda_poder_aquisitivo: normalized.poder_aquisitivo.renda_poder_aquisitivo,
      fx_poder_aquisitivo: normalized.poder_aquisitivo.fx_poder_aquisitivo,
    };
  }

  if (!normalized.fgts) {
    normalized.fgts = [];
  }

  if (!normalized.detalhes_pis) {
    normalized.detalhes_pis = {};
  }

  if (!normalized.beneficios) {
    normalized.beneficios = [];
  }

  if (!normalized.veiculos) {
    normalized.veiculos = [];
  }

  if (!normalized.escolaridade) {
    normalized.escolaridade = {};
  }

  return normalized;
}
