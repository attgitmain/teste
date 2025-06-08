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
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import WcIcon from '@material-ui/icons/Wc';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
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

const LeadDetailModal = ({ open, onClose, lead, loading, error }) => {
  const classes = useStyles();

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
              {lead.dados_basicos?.faixa_renda && (
                <Chip label={`💸 ${lead.dados_basicos.faixa_renda}`} />
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
                    <Typography className={classes.fieldLabel}>Status Receita:</Typography>
                    {lead.dados_basicos?.status_receita ? (
                      <Chip
                        label={lead.dados_basicos.status_receita}
                        style={{ backgroundColor: /regular/i.test(lead.dados_basicos.status_receita) ? '#4caf50' : '#f44336', color: '#fff' }}
                        size="small"
                      />
                    ) : (
                      renderValue(null, classes.placeholder)
                    )}
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Óbito:</Typography>
                    {lead.dados_basicos?.obito?.status === 'Vivo' ? (
                      <CheckCircleIcon style={{ color: 'green' }} />
                    ) : lead.dados_basicos?.obito ? (
                      <>
                        <CancelIcon style={{ color: 'red' }} />
                        <Typography style={{ marginLeft: 4 }}>
                          {lead.dados_basicos.obito.data || ''}
                        </Typography>
                      </>
                    ) : (
                      renderValue(null, classes.placeholder)
                    )}
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="endereco-content" id="endereco-header">
                <Typography className={classes.sectionTitle}>🏠 Endereço</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container direction="column">
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>
                      <HomeIcon fontSize="small" /> Logradouro:
                    </Typography>
                    <Typography>
                      {renderValue(lead.endereco?.logradouro, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.endereco?.logradouro)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Número:</Typography>
                    <Typography>
                      {renderValue(lead.endereco?.numero, classes.placeholder)}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.endereco?.numero)}>
                      <FileCopyOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                  <Grid item className={classes.fieldRow}>
                    <Typography className={classes.fieldLabel}>Cidade/Estado:</Typography>
                    <Typography>
                      {renderValue(
                        lead.endereco?.cidade ? `${lead.endereco.cidade} / ${lead.endereco.estado}` : null,
                        classes.placeholder
                      )}
                    </Typography>
                    <IconButton size="small" onClick={() => copyField(lead.endereco?.cidade ? `${lead.endereco.cidade} / ${lead.endereco.estado}` : '')}>
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
                        <Typography className={classes.fieldLabel}>Empregador:</Typography>
                        <Typography>{renderValue(job.nome_empregador, classes.placeholder)}</Typography>
                        <IconButton size="small" onClick={() => copyField(job.nome_empregador)}>
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
