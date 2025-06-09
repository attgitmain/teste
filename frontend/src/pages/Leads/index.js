import React, { useState, useEffect, useRef, useContext } from "react";
import api from "../../services/api";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  MenuItem,
  Fade,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ReactInputMask from "react-input-mask";
import { CSVLink } from "react-csv";
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import IconButton from "@material-ui/core/IconButton";
import Skeleton from "@material-ui/lab/Skeleton";
import { toast } from "react-toastify";
import moment from "moment";
import LeadDetailModal from "../../components/LeadDetailModal";
import normalizeCpfDetail from "../../helpers/normalizeCpfDetail";
import usePlans from "../../hooks/usePlans";
import { AuthContext } from "../../context/Auth/AuthContext";

import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import { i18n } from "../../translate/i18n";
import { useDate } from "../../hooks/useDate";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  creditsRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  tableWrapper: {
    overflowX: "auto",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
  history: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    "& span": {
      cursor: "pointer",
      marginRight: theme.spacing(1),
      textDecoration: "underline",
    },
  },
}));

const Leads = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { getPlanCompany } = usePlans();
  const [cep, setCep] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [history, setHistory] = useState([]);
  const [credits, setCredits] = useState(0);
  const [tokenError, setTokenError] = useState(false);
  const [pageApi, setPageApi] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [cpf, setCpf] = useState("");
  const [canConsultCpf, setCanConsultCpf] = useState(false);
  const { dateToClient } = useDate();
  const searchTimeout = useRef(null);

  useEffect(() => {
    async function fetchPermission() {
      if (!user) return;
      try {
        const planConfigs = await getPlanCompany(undefined, user.companyId);
        setCanConsultCpf(planConfigs.plan.useConsultCpf);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadCredits = async () => {
      try {
        const { data } = await api.get("/credits");
        setCredits(data.balance);
      } catch (err) {
        console.error(err);
      }
    };
    loadCredits();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("leadsResults");
    if (stored) {
      setResults(JSON.parse(stored));
    }
    const hist = JSON.parse(localStorage.getItem("leadsHistory") || "[]");
    setHistory(hist);
  }, []);

  useEffect(() => {
    localStorage.setItem("leadsResults", JSON.stringify(results));
    if (results && results.length > 0) {
      const prev = JSON.parse(localStorage.getItem("leadsHistory") || "[]");
      const exists = prev.find((h) => h.cep === cep);
      const entry = { cep, count: results.length };
      const newHist = [entry, ...prev.filter((h) => h.cep !== cep)].slice(0, 5);
      localStorage.setItem("leadsHistory", JSON.stringify(newHist));
      if (!exists || exists.count !== results.length) {
        setHistory(newHist);
      }
    }
  }, [results]);

  const handleSearch = async () => {
    if (!cep || cep.length !== 8) return;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      setLoading(true);
      setTokenError(false);
      try {
        const { data } = await api.get(`/consult/cep/${cep}?page=1`);
        setResults(data.leads || []);
        setPageApi(1);
        setHasMore(data.hasMore);
        if (typeof data.credits === "number") {
          setCredits(data.credits);
        }
        if (!data.leads || data.leads.length === 0) {
          toast.error("CEP não encontrado");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            setTokenError(true);
            toast.error("Token expirado");
          } else if (err.response.status === 404) {
            toast.error("CEP não encontrado");
          } else if (err.response.status === 402) {
            toast.error(i18n.t("leads.noCredits"));
          } else {
            toast.error("Erro ao buscar dados");
          }
        } else {
          toast.error("Erro de rede, verifique sua conexão");
        }
      } finally {
        setLoading(false);
      }
    }, 300);
  };

  const handleClear = () => {
    setCep("");
    setResults([]);
    setPageApi(1);
    setHasMore(false);
  };

  const handleClearCpf = () => {
    setCpf("");
    setDetailData(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("leadsHistory");
    toast.success(i18n.t("leads.historyCleared"));
  };

  const handleLoadMore = async () => {
    const next = pageApi + 1;
    setLoadingMore(true);
    try {
      const { data } = await api.get(`/consult/cep/${cep}?page=${next}`);
      setResults((prev) => [...prev, ...(data.leads || [])]);
      setHasMore(data.hasMore);
      if (typeof data.credits === "number") {
        setCredits(data.credits);
      }
      setPageApi(next);
    } catch (err) {
      if (err.response && err.response.status === 402) {
        toast.error(i18n.t("leads.noCredits"));
      } else {
        toast.error("Erro ao buscar dados");
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const handleCpf = async (cpf) => {
    setDetailLoading(true);
    setDetailError("");
    setDetailOpen(true);
    try {
      const { data } = await api.get(`/consult/cpf/${cpf}`);
      if (typeof data.credits === "number") {
        setCredits(data.credits);
      }
      const rawDetail = data.data !== undefined ? data.data : data;
      const detail = normalizeCpfDetail(rawDetail);
      setDetailData(detail);
    } catch (err) {
      if (err.response && err.response.status === 402) {
        toast.error(i18n.t("leads.noCredits"));
      } else {
        setDetailError("Não foi possível carregar os detalhes deste lead. Tente novamente.");
        toast.error("Erro ao consultar CPF");
      }
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCpfSearch = () => {
    const num = cpf.replace(/\D/g, "");
    if (num.length === 11) {
      handleCpf(num);
    }
  };

  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("leads.title")}</Title>
      </MainHeader>
      <div className={classes.creditsRow}>
        <Typography variant="subtitle1" gutterBottom>
          {i18n.t("leads.creditsAvailable")}: {credits}
        </Typography>
        <Button variant="outlined" color="primary" size="small">
          {i18n.t("leads.addCredits")}
        </Button>
      </div>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {i18n.t("leads.creditInfo")}
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {i18n.t("leads.cpfCreditInfo")}
      </Typography>

      <div className={classes.form}>
        <ReactInputMask
          mask="99999999"
          value={cep}
          onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              placeholder="Digite o CEP (somente números)"
              label="CEP"
              variant="outlined"
              size="small"
            />
          )}
        </ReactInputMask>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={!loading && <SearchIcon />}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Buscar"}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleClear}
          startIcon={<ReplayIcon />}
          disabled={loading}
        >
          Limpar
        </Button>
        <a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank" rel="noopener noreferrer">
          Não sabe o CEP? Consulte aqui
        </a>
      </div>

      {canConsultCpf && (
        <div className={classes.form}>
          <ReactInputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="CPF"
                variant="outlined"
                size="small"
              />
            )}
          </ReactInputMask>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCpfSearch}
            disabled={loading}
          >
            Consultar CPF
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearCpf}
            disabled={loading}
          >
            Limpar
          </Button>
        </div>
      )}


      {loading && (
        <div className={classes.loadingContainer}>
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rect"
              animation="wave"
              height={40}
              style={{ marginBottom: 4, width: "100%" }}
            />
          ))}
        </div>
      )}

      {tokenError && (
        <Typography color="error">
          Token inválido. Verifique a variável REACT_APP_API_TOKEN_CEP no arquivo
          .env
        </Typography>
      )}

      {history.length > 0 && (
        <div className={classes.history}>
          {history.map((h) => (
            <span key={h.cep} onClick={() => setCep(h.cep)}>
              <ReplayIcon fontSize="small" /> {h.cep} - {h.count} resultados
            </span>
          ))}
          <IconButton size="small" onClick={handleClearHistory}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </div>
      )}

      {results.length > 0 && (
        <>
          <Typography variant="subtitle2" gutterBottom>
            {results.length} resultados encontrados para o CEP {cep}
          </Typography>
          <Button
            variant="outlined"
            component={CSVLink}
            data={results}
            filename={`leads-${cep}.csv`}
          >
            Exportar CSV
          </Button>
          <Fade in>
            <Paper className={classes.tableWrapper} variant="outlined">
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>{i18n.t("leads.table.logradouro")}</TableCell>
                    <TableCell>{i18n.t("leads.table.numero")}</TableCell>
                    <TableCell>{i18n.t("leads.table.bairro")}</TableCell>
                    <TableCell>{i18n.t("leads.table.cidade")}</TableCell>
                    <TableCell>{i18n.t("leads.table.uf")}</TableCell>
                    <TableCell>{i18n.t("leads.table.nome")}</TableCell>
                    <TableCell>{i18n.t("leads.table.cpf")}</TableCell>
                    <TableCell>{i18n.t("leads.table.nomeMae")}</TableCell>
                    <TableCell>{i18n.t("leads.table.renda")}</TableCell>
                    <TableCell>{i18n.t("leads.table.dataNascimento")}</TableCell>
                    <TableCell>Tags</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results
                    .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((item, index) => {
                      const tags = [];
                      if (parseFloat(item.dados_pessoais.renda) > 5000) {
                        tags.push("💸 Renda Alta");
                      }
                      const age = moment().diff(
                        moment(item.dados_pessoais.nasc),
                        "years"
                      );
                      if (age > 60) {
                        tags.push("👴 Maior de 60 anos");
                      }
                      return (
                        <TableRow key={index}>
                          <TableCell>{item.logradouro}</TableCell>
                          <TableCell>{item.numero}</TableCell>
                          <TableCell>{item.bairro}</TableCell>
                          <TableCell>{item.cidade}</TableCell>
                          <TableCell>{item.uf}</TableCell>
                          <TableCell>
                            {item.dados_pessoais.nome}
                            <IconButton size="small" onClick={() => handleCpf(item.dados_pessoais.cpf)}>
                              <InfoOutlinedIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                          <TableCell>{item.dados_pessoais.cpf}</TableCell>
                          <TableCell>{item.dados_pessoais.nome_mae}</TableCell>
                          <TableCell>{item.dados_pessoais.renda}</TableCell>
                          <TableCell>
                            {dateToClient(item.dados_pessoais.nasc)}
                          </TableCell>
                          <TableCell>{tags.join(" ")}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Paper>
          </Fade>
          <div className={classes.form}>
            <TextField
              select
              label="Mostrar"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(1);
              }}
              variant="outlined"
              size="small"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </TextField>
            <Pagination
              count={Math.ceil(results.length / rowsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
            {hasMore && (
              <Button
                variant="outlined"
                onClick={handleLoadMore}
                disabled={loadingMore}
              >
                {loadingMore ? <CircularProgress size={20} /> : "+15"}
              </Button>
            )}
          </div>
        </>
      )}
      <LeadDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        lead={detailData}
        loading={detailLoading}
        error={detailError}
      />
    </MainContainer>
  );
};

export default Leads;