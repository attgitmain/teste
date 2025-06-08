import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Divider,
  Grid,
  Button,
  Tooltip,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import copy from 'clipboard-copy';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  fieldLabel: {
    minWidth: 140,
    fontWeight: 500,
  },
  placeholder: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
  },
  content: {
    minWidth: 360,
  },
  headerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
  },
}));

const renderValue = (value, placeholderClass) => {
  if (value === null || value === undefined || value === '') {
    return <span className={placeholderClass}>Não há informação 🚫</span>;
  }
  return value;
};

const LeadDetailModal = ({ open, onClose, lead, loading, error }) => {
  const classes = useStyles();

  const copyAll = () => {
    if (!lead) return;
    const text = JSON.stringify(lead, null, 2);
    copy(text);
  };

  const copyField = (value) => {
    if (value !== null && value !== undefined && value !== '') {
      copy(String(value));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth scroll="paper">
      <DialogTitle disableTypography className={classes.headerActions}>
        <Typography variant="h6">
          Detalhes de {lead?.dados_pessoais?.nome || ''}
        </Typography>
        <div>
          <Tooltip title="Copiar Tudo">
            <IconButton size="small" onClick={copyAll} disabled={!lead}>
              <FileCopyOutlinedIcon />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        {loading && (
          <div>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="text"
                height={28}
                style={{ marginBottom: 8 }}
              />
            ))}
          </div>
        )}
        {!loading && error && (
          <Typography color="error">{error}</Typography>
        )}
        {!loading && !error && lead && (
          <div>
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              👤 Dados Básicos
            </Typography>
            <Grid container direction="column">
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>CPF:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.cpf, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.cpf)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Nome:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.nome, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.nome)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Data de Nascimento:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.nasc, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.nasc)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Nome da Mãe:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.nome_mae, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.nome_mae)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Sexo:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.sexo, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.sexo)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Email:</Typography>
                <Typography>
                  {renderValue(lead.dados_pessoais?.email, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_pessoais?.email)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>CBO:</Typography>
                <Typography>
                  {renderValue(lead.dados_basicos?.cbo, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_basicos?.cbo)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Status Receita:</Typography>
                <Typography>
                  {renderValue(lead.dados_basicos?.status_receita, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_basicos?.status_receita)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>% Cargo Societário:</Typography>
                <Typography>
                  {renderValue(lead.dados_basicos?.pct_cargo_societario, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_basicos?.pct_cargo_societario)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Qt. Veículos:</Typography>
                <Typography>
                  {renderValue(lead.dados_basicos?.qt_veiculos, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_basicos?.qt_veiculos)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Faixa Renda:</Typography>
                <Typography>
                  {renderValue(lead.dados_basicos?.faixa_renda, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.dados_basicos?.faixa_renda)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Óbito:</Typography>
                <Typography>
                  {renderValue(
                    lead.dados_basicos?.obito
                      ? `${lead.dados_basicos.obito.status}${lead.dados_basicos.obito.data ? ` (${lead.dados_basicos.obito.data})` : ''}`
                      : null,
                    classes.placeholder
                  )}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    copyField(
                      lead.dados_basicos?.obito
                        ? `${lead.dados_basicos.obito.status}${lead.dados_basicos.obito.data ? ` (${lead.dados_basicos.obito.data})` : ''}`
                        : ''
                    )
                  }
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              🏠 Endereço
            </Typography>
            <Grid container direction="column">
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Tipo:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.tipo, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.tipo)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Logradouro:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.logradouro, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.logradouro)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Número:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.numero, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.numero)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Complemento:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.complemento, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.complemento)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Bairro:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.bairro, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.bairro)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>Cidade/Estado:</Typography>
                <Typography>
                  {renderValue(
                    lead.endereco?.cidade
                      ? `${lead.endereco.cidade} / ${lead.endereco.estado}`
                      : null,
                    classes.placeholder
                  )}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() =>
                    copyField(
                      lead.endereco?.cidade
                        ? `${lead.endereco.cidade} / ${lead.endereco.estado}`
                        : ''
                    )
                  }
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item className={classes.fieldRow}>
                <Typography className={classes.fieldLabel}>CEP:</Typography>
                <Typography>
                  {renderValue(lead.endereco?.cep, classes.placeholder)}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => copyField(lead.endereco?.cep)}
                >
                  <FileCopyOutlinedIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            <Divider />
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              💼 Empregos
            </Typography>
            {Array.isArray(lead.empregos) && lead.empregos.length > 0 ? (
              lead.empregos.map((job, idx) => (
                <Grid
                  key={idx}
                  container
                  direction="column"
                  style={{ marginBottom: 8 }}
                >
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      Empregador:
                    </Typography>
                    <Typography>
                      {renderValue(job.nome_empregador, classes.placeholder)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyField(job.nome_empregador)}
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Setor:</Typography>
                    <Typography>
                      {renderValue(job.setor, classes.placeholder)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyField(job.setor)}
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Status:</Typography>
                    <Typography>
                      {renderValue(job.status, classes.placeholder)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyField(job.status)}
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      Remuneração:
                    </Typography>
                    <Typography>
                      {renderValue(job.remuneracao, classes.placeholder)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => copyField(job.remuneracao)}
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      Admissão/Término:
                    </Typography>
                    <Typography>
                      {renderValue(
                        job.admissao
                          ? `${job.admissao} / ${job.termino || ''}`
                          : null,
                        classes.placeholder
                      )}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        copyField(
                          job.admissao
                            ? `${job.admissao} / ${job.termino || ''}`
                            : ''
                        )
                      }
                    >
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  {idx < lead.empregos.length - 1 && <Divider />}
                </Grid>
              ))
            ) : (
              <Typography className={classes.placeholder}>
                Não há informação 🚫
              </Typography>
            )}
            <Divider />
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              🚗 Veículos
            </Typography>
            {Array.isArray(lead.veiculos) && lead.veiculos.length > 0 ? (
              lead.veiculos.map((car, idx) => (
                <Grid key={idx} container direction="column" style={{ marginBottom: 8 }}>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Placa:</Typography>
                    <Typography>
                      {renderValue(car.placa, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(car.placa)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Modelo:</Typography>
                    <Typography>
                      {renderValue(car.modelo, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(car.modelo)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Ano:</Typography>
                    <Typography>
                      {renderValue(car.ano, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(car.ano)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  {idx < lead.veiculos.length - 1 && <Divider />}
                </Grid>
              ))
            ) : (
              <Typography className={classes.placeholder}>
                Não há informação 🚫
              </Typography>
            )}
            <Divider />
            <Typography variant="subtitle1" className={classes.sectionTitle}>
              📞 Telefones & Celulares
            </Typography>
            {Array.isArray(lead.telefones) && lead.telefones.length > 0 ? (
              lead.telefones.map((tel, idx) => (
                <Grid key={idx} container className={classes.fieldRow}>
                  <Typography className={classes.fieldLabel}>{tel.tipo}:</Typography>
                  <Typography>{renderValue(tel.numero, classes.placeholder)}</Typography>
                  <IconButton size="small" onClick={() => copyField(tel.numero)}>
                    <FileCopyOutlinedIcon fontSize="small" />
                  </IconButton>
                </Grid>
              ))
            ) : (
              <Typography className={classes.placeholder}>
                Não há informação 🚫
              </Typography>
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadDetailModal;
