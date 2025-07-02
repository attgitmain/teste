export default function normalizeCpfDetail(detail) {
  if (!detail || typeof detail !== "object") {
    return detail;
  }

  let normalized = detail;

  // handle nested structures: {status: 200, data: {...}}
  if (
    normalized.data &&
    !normalized.dados_pessoais &&
    !normalized.dados_basicos
  ) {
    normalized = normalized.data;
  }

  // map dados_basicos -> dados_pessoais
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
    };
  }

  // ensure enderecos is an array
  if (!Array.isArray(normalized.enderecos)) {
    const addr =
      normalized.endereco ||
      normalized.endereco_residencial ||
      (typeof normalized.enderecos === "object" ? normalized.enderecos : null);
    normalized.enderecos = addr ? [addr] : [];
  }

  // merge celulares array into telefones if needed
  let phones = [];
  if (Array.isArray(normalized.telefones)) {
    phones = normalized.telefones;
  }
  if (Array.isArray(normalized.celulares)) {
    phones = phones.concat(
      normalized.celulares.map((c) => ({ numero: c, tipo: "Celular" })),
    );
  }
  if (!phones.length && normalized.telefone) {
    phones.push({ numero: normalized.telefone, tipo: "Fixo" });
  }
  normalized.telefones = phones;

  // normalize empregos fields
  if (!Array.isArray(normalized.empregos)) {
    const job = normalized.emprego;
    normalized.empregos = job ? [job] : [];
  }
  if (Array.isArray(normalized.empregos)) {
    normalized.empregos = normalized.empregos.map((job) => ({
      empresa: job.empresa || job.nome_empregador,
      cargo: job.cargo || job.profissao,
      admissao: job.admissao || job.data_inicio_trabalho || job.data_admissao,
      termino: job.termino || job.data_termino_trabalho || job.data_termino,
      remuneracao: job.remuneracao || job.remuneracao_estimada,
    }));
  }

  if (!normalized.avaliacao_score) {
    normalized.avaliacao_score = normalized.score || {};
  }

  if (!normalized.interesses) {
    normalized.interesses = normalized.tags || {};
  }

  if (!Array.isArray(normalized.ordens_de_compras)) {
    const orders =
      normalized.ordens_de_compras || normalized.compras || normalized.orders;
    normalized.ordens_de_compras = Array.isArray(orders) ? orders : [];
  }

  return normalized;
}
