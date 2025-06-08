export default function normalizeCpfDetail(detail) {
  if (!detail || typeof detail !== 'object') {
    return detail;
  }

  let normalized = detail;

  // handle nested structures: {status: 200, data: {...}}
  if (normalized.data && !normalized.dados_pessoais && !normalized.dados_basicos) {
    normalized = normalized.data;
  }

  // map dados_basicos -> dados_pessoais
  if (normalized.dados_basicos && !normalized.dados_pessoais) {
    const basics = normalized.dados_basicos;
    normalized.dados_pessoais = {
      cpf: basics.cpf,
      nome: basics.nome,
      nasc: basics.nascimento,
      nome_mae: basics.nome_mae,
      sexo: basics.sexo,
      email: basics.email
    };
  }

  // merge celulares array into telefones if needed
  if (Array.isArray(normalized.celulares)) {
    const cells = normalized.celulares.map((c) => ({ tipo: 'Celular', numero: c }));
    if (Array.isArray(normalized.telefones)) {
      normalized.telefones = normalized.telefones.concat(cells);
    } else {
      normalized.telefones = cells;
    }
  }

  // normalize empregos fields
  if (Array.isArray(normalized.empregos)) {
    normalized.empregos = normalized.empregos.map((job) => ({
      ...job,
      admissao: job.admissao || job.data_inicio_trabalho || job.data_admissao,
      termino: job.termino || job.data_termino_trabalho || job.data_termino,
      remuneracao: job.remuneracao || job.remuneracao_estimada
    }));
  }

  return normalized;
}
