import React, { useState } from "react";
import axios from "axios";
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
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ReplayIcon from "@material-ui/icons/Replay";

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
  tableWrapper: {
    overflowX: "auto",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(3),
  },
}));

const Leads = () => {
  const classes = useStyles();
  const [cep, setCep] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { dateToClient } = useDate();

  const handleSearch = async () => {
    if (!cep) return;
    setLoading(true);
    try {
      const token = process.env.REACT_APP_API_TOKEN_CEP;
      const url = `https://api.dbconsultas.com/api/v1/${token}/cep/${cep}`;
      const { data } = await axios.get(url);
      setResults(data.data || []);
    } catch (err) {
      alert("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCep("");
    setResults([]);
  };

  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("leads.title")}</Title>
      </MainHeader>

      <div className={classes.form}>
        <TextField
          label="CEP"
          variant="outlined"
          size="small"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          disabled={loading}
        >
          Buscar
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
      </div>

      <TextField
        label="CPF"
        variant="outlined"
        size="small"
        disabled
        fullWidth
      />
      <Typography variant="caption" color="textSecondary">
        Consulta por CPF em manutenção no momento.
      </Typography>

      {loading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}

      {results.length > 0 && (
        <Paper className={classes.tableWrapper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Logradouro</TableCell>
                <TableCell>Número</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>UF</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Nome da Mãe</TableCell>
                <TableCell>Renda</TableCell>
                <TableCell>Data de Nascimento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.logradouro}</TableCell>
                  <TableCell>{item.numero}</TableCell>
                  <TableCell>{item.bairro}</TableCell>
                  <TableCell>{item.cidade}</TableCell>
                  <TableCell>{item.uf}</TableCell>
                  <TableCell>{item.dados_pessoais.nome}</TableCell>
                  <TableCell>{item.dados_pessoais.cpf}</TableCell>
                  <TableCell>{item.dados_pessoais.nome_mae}</TableCell>
                  <TableCell>{item.dados_pessoais.renda}</TableCell>
                  <TableCell>
                    {dateToClient(item.dados_pessoais.nasc)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </MainContainer>
  );
};

export default Leads;
