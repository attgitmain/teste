export default function normalizeLeadItem(item) {
  if (!item || typeof item !== 'object') {
    return item;
  }

  let lead = item;

  if (lead.data && !lead.dados_pessoais && !lead.dados_basicos) {
    lead = lead.data;
  }

  if (lead.dados_basicos && !lead.dados_pessoais) {
    const basics = lead.dados_basicos;
    lead.dados_pessoais = {
      cpf: basics.cpf,
      nome: basics.nome,
      nome_mae: basics.nome_mae,
      nome_pai: basics.nome_pai,
      nasc: basics.nascimento,
      sexo: basics.sexo,
      renda: basics.renda || basics.renda_presumida,
      faixa_renda: basics.faixa_renda_id,
      cbo: basics.cbo,
    };
  }

  if (!lead.dados_pessoais && lead.cpf) {
    lead.dados_pessoais = {
      cpf: lead.cpf,
      nome: lead.nome,
      nome_mae: lead.nome_mae,
      nome_pai: lead.nome_pai,
      nasc: lead.nasc || lead.data_nascimento,
      sexo: lead.sexo,
      renda: lead.renda,
      faixa_renda: lead.faixa_renda_id,
      cbo: lead.cbo,
    };
  }

  if (!lead.logradouro && Array.isArray(lead.enderecos) && lead.enderecos[0]) {
    const addr = lead.enderecos[0];
    lead.logradouro = addr.logradouro;
    lead.numero = addr.numero;
    lead.bairro = addr.bairro;
    lead.cidade = addr.cidade;
    lead.uf = addr.uf;
  }

  return lead;
}
