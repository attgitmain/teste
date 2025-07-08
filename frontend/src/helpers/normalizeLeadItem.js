export default function normalizeLeadItem(item) {
  if (!item || typeof item !== "object") {
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

  if (!Array.isArray(lead.enderecos)) {
    const addr =
      lead.endereco ||
      lead.endereco_residencial ||
      (typeof lead.enderecos === "object" ? lead.enderecos : null);
    lead.enderecos = addr ? [addr] : [];
  }

  if (!lead.logradouro && Array.isArray(lead.enderecos) && lead.enderecos[0]) {
    const addr = lead.enderecos[0];
    lead.logradouro = addr.logradouro || addr.endereco || "";
    lead.numero = addr.numero;
    lead.bairro = addr.bairro;
    lead.cidade = addr.cidade;
    lead.uf = addr.uf;
  }

  if (!lead.avaliacao_score) {
    if (lead.avalicao_score) {
      lead.avaliacao_score = lead.avalicao_score;
    } else if (lead.dados_score) {
      lead.avaliacao_score = {
        csba: lead.dados_score.score,
        csba_faixa: lead.dados_score.faixa_risco,
      };
    } else {
      lead.avaliacao_score = lead.score || {};
    }
  }

  // Normalize phones to always be an array of objects
  if (Array.isArray(lead.telefones)) {
    lead.telefones = lead.telefones.map(t => ({
      numero: t.numero || t.telefone || t.celular || "",
      tipo: t.tipo || t.operadora || "",
      whatsapp: t.whatsapp || false
    }));
  } else if (lead.telefones && typeof lead.telefones === "object") {
    lead.telefones = Object.values(lead.telefones).map(t => ({
      numero: t.numero || t.telefone || t.celular || "",
      tipo: t.tipo || t.operadora || "",
      whatsapp: t.whatsapp || false
    }));
  } else if (Array.isArray(lead.celulares)) {
    lead.telefones = lead.celulares.map(c => ({ numero: c, tipo: "Celular" }));
  } else if (lead.telefone) {
    lead.telefones = [{ numero: lead.telefone, tipo: "Fixo" }];
  } else if (lead.celular) {
    lead.telefones = [{ numero: lead.celular, tipo: "Celular" }];
  } else {
    lead.telefones = Array.isArray(lead.telefones) ? lead.telefones : [];
  }

  return lead;
}
