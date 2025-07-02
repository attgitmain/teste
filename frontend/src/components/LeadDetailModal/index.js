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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Box,
  Snackbar,
  Fade,
  CircularProgress,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PersonIcon from '@material-ui/icons/Person';
import CakeIcon from '@material-ui/icons/Cake';
import HomeIcon from '@material-ui/icons/Home';
import BusinessIcon from '@material-ui/icons/Business';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FaceIcon from '@material-ui/icons/Face';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import WcIcon from '@material-ui/icons/Wc';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventNoteIcon from '@material-ui/icons/EventNote';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import Skeleton from '@material-ui/lab/Skeleton';
import copy from 'clipboard-copy';
import { differenceInYears } from 'date-fns';

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  },
  fieldRow: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    wordBreak: 'break-word',
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
  fieldLabel: {
    minWidth: 140,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  placeholder: {
    fontStyle: 'italic',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
  },
  content: {
    padding: theme.spacing(2),
    minWidth: 360,
  },
  headerActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
  },
  tagsBox: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  accordion: {
    marginBottom: theme.spacing(1),
  },
}));

const renderValue = (value, placeholderClass) => {
  if (value === null || value === undefined || value === '') {
    return (
      <span className={placeholderClass}>
        <SentimentDissatisfiedIcon fontSize="small" /> Não há informação 🚫
      </span>
    );
  }
  return value;
};

const renderList = (list, renderItem, placeholderClass) => {
  if (Array.isArray(list) && list.length > 0) {
    return list.map((item, idx) => (
      <Grid key={idx} container direction="column" style={{ marginBottom: 8 }}>
        {renderItem(item)}
        {idx < list.length - 1 && <Divider />}
      </Grid>
    ));
  }
  return (
    <Typography className={placeholderClass}>Não há informação 🚫</Typography>
  );
};

const LeadDetailModal = ({ open, onClose, lead, loading, error }) => {
  const classes = useStyles();

  const dadosBasicos = React.useMemo(
    () => (lead ? lead.dados_basicos || lead : {}),
    [lead],
  );

  const endereco = React.useMemo(
    () =>
      lead
        ? lead.endereco ||
          (Array.isArray(lead.enderecos) ? lead.enderecos[0] : undefined)
        : undefined,
    [lead],
  );

  const [copySnackOpen, setCopySnackOpen] = React.useState(false);
  const [loadingDelay, setLoadingDelay] = React.useState(true);
  const firstSummaryRef = React.useRef();

  React.useEffect(() => {
    if (open && firstSummaryRef.current) {
      firstSummaryRef.current.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (loading) {
      setLoadingDelay(true);
      const timer = setTimeout(() => setLoadingDelay(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const copyAll = () => {
    if (!lead) return;
    const text = JSON.stringify(lead, null, 2);
    copy(text);
    setCopySnackOpen(true);
  };

  const copyField = (value) => {
    if (value !== null && value !== undefined && value !== '') {
      copy(String(value));
      setCopySnackOpen(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
      TransitionComponent={Fade}
    >
      <DialogTitle disableTypography className={classes.headerActions}>
        <Typography variant="h6">
          Detalhes de {lead?.dados_pessoais?.nome || ''}
        </Typography>
        <div>
          <Tooltip title="Copiar todas as informações">
            <Button
              size="small"
              onClick={copyAll}
              disabled={!lead}
              startIcon={<FileCopyOutlinedIcon />}
            >
              📋 Copiar Todos
            </Button>
          </Tooltip>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        {loading && loadingDelay && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}
        {loading && !loadingDelay && (
          <div>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton
                key={idx}
                variant="text"
                animation="wave"
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
          <>
            <Box className={classes.tagsBox}>
              {dadosBasicos?.faixa_renda && (
                <Chip label={`💸 ${dadosBasicos.faixa_renda}`} />
              )}
              {lead.dados_pessoais?.nasc &&
                differenceInYears(new Date(), new Date(lead.dados_pessoais.nasc)) >= 60 && (
                  <Chip label="👴 Maior de 60" />
                )}
            </Box>

            <Accordion defaultExpanded className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="dados-basicos-content"
                id="dados-basicos-header"
                ref={firstSummaryRef}
              >
                <Typography className={classes.sectionTitle}>👤 Dados Básicos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <FingerprintIcon fontSize="small" /> CPF:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.cpf, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.cpf)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <LabelImportantIcon fontSize="small" /> Safra:
                    </Typography>
                    <Typography>
                      {renderValue(dadosBasicos?.safra, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(dadosBasicos?.safra)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <PersonIcon fontSize="small" /> Nome:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.nome, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.nome)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <CakeIcon fontSize="small" /> Data de Nascimento:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.nasc, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.nasc)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <FaceIcon fontSize="small" /> Nome da Mãe:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.nome_mae, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.nome_mae)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <WcIcon fontSize="small" /> Sexo:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.sexo, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.sexo)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <EmailIcon fontSize="small" /> Email:
                    </Typography>
                    <Typography>
                      {renderValue(lead.dados_pessoais?.email, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.dados_pessoais?.email)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <BusinessIcon fontSize="small" /> CBO:
                    </Typography>
                    <Typography>
                      {renderValue(dadosBasicos?.cbo, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(dadosBasicos?.cbo)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Status Receita:</Typography>
                    {dadosBasicos?.status_receita ? (
                      <Chip
                        label={dadosBasicos.status_receita}
                        style={{ backgroundColor: /regular/i.test(dadosBasicos.status_receita) ? '#4caf50' : '#f44336', color: '#fff' }}
                        size="small"
                      />
                    ) : (
                      renderValue(null, classes.placeholder)
                    )}
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <BusinessIcon fontSize="small" /> % Cargo Societário:
                    </Typography>
                    <Typography>
                      {renderValue(dadosBasicos?.pct_cargo_societario, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(dadosBasicos?.pct_cargo_societario)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <DriveEtaIcon fontSize="small" /> Qt. Veículos:
                    </Typography>
                    <Typography>
                      {renderValue(dadosBasicos?.qt_veiculos, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(dadosBasicos?.qt_veiculos)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <AttachMoneyIcon fontSize="small" /> Faixa Renda:
                    </Typography>
                    <Typography>
                      {renderValue(dadosBasicos?.faixa_renda, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(dadosBasicos?.faixa_renda)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Óbito:</Typography>
                    {dadosBasicos?.obito?.status === 'Vivo' ? (
                      <CheckCircleIcon style={{ color: 'green' }} />
                    ) : dadosBasicos?.obito ? (
                      <>
                        <CancelIcon style={{ color: 'red' }} />
                        <Typography style={{ marginLeft: 4 }}>
                          {dadosBasicos.obito.data || ''}
                        </Typography>
                      </>
                    ) : (
                      renderValue(null, classes.placeholder)
                    )}
                  </Grid>
                </Grid>
            </AccordionDetails>
          </Accordion>

          {Array.isArray(lead.emails) && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="emails-content"
                id="emails-header"
              >
                <Typography className={classes.sectionTitle}>📧 Emails</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderList(
                  lead.emails,
                  (email) => (
                    <>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Email:</Typography>
                        <Typography>
                          {renderValue(email.email, classes.placeholder)}
                        </Typography>
                        <IconButton size="small" onClick={() => copyField(email.email)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Score:</Typography>
                        <Typography>
                          {renderValue(email.email_score, classes.placeholder)}
                        </Typography>
                        <IconButton size="small" onClick={() => copyField(email.email_score)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </>
                  ),
                  classes.placeholder
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {Array.isArray(lead.empresas) && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="empresas-content"
                id="empresas-header"
              >
                <Typography className={classes.sectionTitle}>🏢 Empresas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderList(
                  lead.empresas,
                  (emp) => (
                    <>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>CNPJ:</Typography>
                        <Typography>{renderValue(emp.cnpj, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(emp.cnpj)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Nome:</Typography>
                        <Typography>{renderValue(emp.nome, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(emp.nome)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Relação:</Typography>
                        <Typography>
                          {renderValue(emp.tipo_relacao, classes.placeholder)}
                        </Typography>
                        <IconButton size="small" onClick={() => copyField(emp.tipo_relacao)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </>
                  ),
                  classes.placeholder
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {lead.avaliacao_score && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="score-content"
                id="score-header"
              >
                <Typography className={classes.sectionTitle}>📊 Avaliação Score</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>CSBA:</Typography>
                    <Typography>
                      {renderValue(lead.avaliacao_score.csba, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.avaliacao_score.csba)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Faixa:</Typography>
                    <Typography>
                      {renderValue(lead.avaliacao_score.csba_faixa, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.avaliacao_score.csba_faixa)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {lead.interesses && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="interesses-content"
                id="interesses-header"
              >
                <Typography className={classes.sectionTitle}>⭐ Interesses</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  {Object.entries(lead.interesses).map(([key, val]) => (
                    <Grid key={key} item className={classes.fieldRow}>
                      <Typography className={classes.fieldLabel}>{key}:</Typography>
                      <Typography>{renderValue(val, classes.placeholder)}</Typography>
                      <IconButton size="small" onClick={() => copyField(val)}>
                        <FileCopyOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {Array.isArray(lead.irpf) && lead.irpf.length > 0 && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="irpf-content"
                id="irpf-header"
              >
                <Typography className={classes.sectionTitle}>🧾 IRPF</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderList(
                  lead.irpf,
                  (ir) => (
                    <>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Banco:</Typography>
                        <Typography>
                          {renderValue(ir.instituicao_bancaria, classes.placeholder)}
                        </Typography>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Situação:</Typography>
                        <Typography>
                          {renderValue(ir.sit_receita_federal, classes.placeholder)}
                        </Typography>
                      </Grid>
                    </>
                  ),
                  classes.placeholder
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {lead.detalhes_irpf && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="det-irpf-content"
                id="det-irpf-header"
              >
                <Typography className={classes.sectionTitle}>📄 Detalhes IRPF</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Banco:</Typography>
                    <Typography>
                      {renderValue(lead.detalhes_irpf.instituicao_bancaria, classes.placeholder)}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Situação:</Typography>
                    <Typography>
                      {renderValue(lead.detalhes_irpf.sit_receita_federal, classes.placeholder)}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Ano:</Typography>
                    <Typography>
                      {renderValue(lead.detalhes_irpf.ano_referencia, classes.placeholder)}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {lead.pis && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="pis-content"
                id="pis-header"
              >
                <Typography className={classes.sectionTitle}>🆔 PIS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>PIS:</Typography>
                    <Typography>{renderValue(lead.pis.pis, classes.placeholder)}</Typography>
                    <IconButton size="small" onClick={() => copyField(lead.pis.pis)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {lead.detalhes_pis && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="det-pis-content"
                id="det-pis-header"
              >
                <Typography className={classes.sectionTitle}>📄 Detalhes PIS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>PIS:</Typography>
                    <Typography>
                      {renderValue(lead.detalhes_pis.pis, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.detalhes_pis.pis)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Cadastro ID:</Typography>
                    <Typography>
                      {renderValue(lead.detalhes_pis.cadastro_id, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.detalhes_pis.cadastro_id)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {Array.isArray(lead.fgts) && lead.fgts.length > 0 && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="fgts-content"
                id="fgts-header"
              >
                <Typography className={classes.sectionTitle}>💰 FGTS</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderList(
                  lead.fgts,
                  (f) => (
                    <Grid item className={classes.fieldRow}>
                      <Typography className={classes.fieldLabel}>PIS:</Typography>
                      <Typography>{renderValue(f.pis, classes.placeholder)}</Typography>
                      <IconButton size="small" onClick={() => copyField(f.pis)}>
                        <FileCopyOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  ),
                  classes.placeholder
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {lead.poder_aquisitivo && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="poder-content"
                id="poder-header"
              >
                <Typography className={classes.sectionTitle}>💳 Poder Aquisitivo</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Código:</Typography>
                    <Typography>
                      {renderValue(lead.poder_aquisitivo.cod_poder_aquisitivo, classes.placeholder)}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Descrição:</Typography>
                    <Typography>
                      {renderValue(lead.poder_aquisitivo.poder_aquisitivo, classes.placeholder)}
                    </Typography>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Renda:</Typography>
                    <Typography>
                      {renderValue(lead.poder_aquisitivo.renda_poder_aquisitivo, classes.placeholder)}
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          )}

          {Array.isArray(lead.beneficios) && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="beneficios-content"
                id="beneficios-header"
              >
                <Typography className={classes.sectionTitle}>🎁 Benefícios</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderList(
                  lead.beneficios,
                  (b) => (
                    <Grid item className={classes.fieldRow}>
                      <Typography>{JSON.stringify(b)}</Typography>
                    </Grid>
                  ),
                  classes.placeholder
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {Array.isArray(lead.ordens_de_compras) && (
            <Accordion className={classes.accordion}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="ordens-content"
                id="ordens-header"
              >
                <Typography className={classes.sectionTitle}>🛒 Ordens de Compras</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {lead.ordens_de_compras.length > 0 ? (
                  renderList(
                    lead.ordens_de_compras,
                    (o) => (
                      <Grid item className={classes.fieldRow}>
                        <Typography>{JSON.stringify(o)}</Typography>
                      </Grid>
                    ),
                    classes.placeholder
                  )
                ) : (
                  <Typography className={classes.placeholder}>Não há informação 🚫</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          )}

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="endereco-content" id="endereco-header">
                <Typography className={classes.sectionTitle}>🏠 Endereço</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Tipo:</Typography>
                    <Typography>
                      {renderValue(endereco?.tipo || endereco?.tipo_logradouro, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.tipo || endereco?.tipo_logradouro)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <HomeIcon fontSize="small" /> Logradouro:
                    </Typography>
                    <Typography>
                      {renderValue(endereco?.logradouro, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.logradouro)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Número:</Typography>
                    <Typography>
                      {renderValue(endereco?.numero, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.numero)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Complemento:</Typography>
                    <Typography>
                      {renderValue(endereco?.complemento, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.complemento)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Bairro:</Typography>
                    <Typography>
                      {renderValue(endereco?.bairro, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.bairro)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Cidade/Estado:</Typography>
                    <Typography>
                      {renderValue(
                        endereco?.cidade ? `${endereco.cidade} / ${endereco.estado || endereco.uf}` : null,
                        classes.placeholder
                      )}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.cidade ? `${endereco.cidade} / ${endereco.estado || endereco.uf}` : '')}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>CEP:</Typography>
                    <Typography>
                      {renderValue(endereco?.cep, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.cep)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>UF:</Typography>
                    <Typography>
                      {renderValue(endereco?.uf || endereco?.estado, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(endereco?.uf || endereco?.estado)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="empregos-content" id="empregos-header">
                <Typography className={classes.sectionTitle}>💼 Empregos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(lead.empregos) && lead.empregos.length > 0 ? (
                  lead.empregos.map((job, idx) => (
                    <Grid key={idx} container direction="column" style={{ marginBottom: 8 }}>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>
                          <BusinessCenterIcon fontSize="small" /> Empregador:
                        </Typography>
                        <Typography>{renderValue(job.empresa, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.empresa)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>
                          <WorkOutlineIcon fontSize="small" /> Setor:
                        </Typography>
                        <Typography>{renderValue(job.cargo || job.setor, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.cargo || job.setor)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>
                          <MonetizationOnIcon fontSize="small" /> Remuneração:
                        </Typography>
                        <Typography>{renderValue(job.remuneracao, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.remuneracao)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>
                          <EventNoteIcon fontSize="small" /> Admissão:
                        </Typography>
                        <Typography>{renderValue(job.admissao, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.admissao)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>
                          <EventNoteIcon fontSize="small" /> Término:
                        </Typography>
                        <Typography>{renderValue(job.termino, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.termino)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Status:</Typography>
                        {job.status ? (
                          <Chip
                            label={job.status}
                            style={{ backgroundColor: /ativo/i.test(job.status) ? '#4caf50' : '#f44336', color: '#fff' }}
                            size="small"
                          />
                        ) : (
                          renderValue(null, classes.placeholder)
                        )}
                      </Grid>
                      {idx < lead.empregos.length - 1 && <Divider />}
                    </Grid>
                  ))
                ) : (
                  <Typography className={classes.placeholder}>Não há informação 🚫</Typography>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="veiculos-content" id="veiculos-header">
                <Typography className={classes.sectionTitle}>🚗 Veículos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(lead.veiculos) && lead.veiculos.length > 0 ? (
                  lead.veiculos.map((car, idx) => (
                    <Grid key={idx} container direction="column" style={{ marginBottom: 8 }}>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Placa:</Typography>
                        <Typography>{renderValue(car.placa, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(car.placa)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item className={classes.fieldRow}>
                        <Typography className={classes.fieldLabel}>Modelo:</Typography>
                        <Typography>{renderValue(car.modelo, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(car.modelo)}>
                          <FileCopyOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      {idx < lead.veiculos.length - 1 && <Divider />}
                    </Grid>
                  ))
                ) : (
                  <Typography className={classes.placeholder}>Não há informação 🚫</Typography>
                )}
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="contatos-content" id="contatos-header">
                <Typography className={classes.sectionTitle}>📞 Contatos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {Array.isArray(lead.telefones) && lead.telefones.length > 0 ? (
                  lead.telefones.map((tel, idx) => (
                    <Grid key={idx} container className={classes.fieldRow}>
                      <Typography className={classes.fieldLabel}>
                        <PhoneIcon fontSize="small" /> {tel.tipo}:
                      </Typography>
                      <Typography>{renderValue(tel.numero, classes.placeholder)}</Typography>
                      <IconButton size="small" onClick={() => copyField(tel.numero)}>
                        <FileCopyOutlinedIcon fontSize="small" />
                      </IconButton>
                      {tel.whatsapp ? (
                        <WhatsAppIcon fontSize="small" style={{ color: '#25D366' }} />
                      ) : (
                        <CancelIcon fontSize="small" color="error" />
                      )}
                    </Grid>
                  ))
                ) : (
                  <Typography className={classes.placeholder}>Não há informação 🚫</Typography>
                )}
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Fechar
        </Button>
      </DialogActions>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={copySnackOpen}
        autoHideDuration={2000}
        onClose={() => setCopySnackOpen(false)}
        message="Copiado!"
      />
    </Dialog>
  );
};

export default LeadDetailModal;
