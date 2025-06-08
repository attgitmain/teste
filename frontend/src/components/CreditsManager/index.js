import React, { useEffect, useState } from "react";
import { makeStyles, Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField } from "@material-ui/core";
import ButtonWithSpinner from "../ButtonWithSpinner";
import useCompanies from "../../hooks/useCompanies";
import api from "../../services/api";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    ...theme.scrollbarStyles,
  },
  fullWidth: { width: "100%" },
}));

export default function CreditsManager() {
  const classes = useStyles();
  const { list } = useCompanies();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const companyList = await list();
        setRecords(companyList);
      } catch (err) {
        toast.error("Não foi possível carregar as empresas");
      }
      setLoading(false);
    };
    fetchData();
  }, [list]);

  const handleChangeAmount = (id, value) => {
    setAmounts((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (companyId) => {
    const value = parseFloat(amounts[companyId]);
    if (isNaN(value)) return;
    setLoading(true);
    try {
      const { data } = await api.post("/credits/add", { companyId, amount: value });
      setRecords((prev) =>
        prev.map((c) => (c.id === companyId ? { ...c, credits: data.balance } : c))
      );
      toast.success("Saldo atualizado");
    } catch (err) {
      toast.error("Erro ao atualizar saldo");
    }
    setLoading(false);
  };

  return (
    <Paper className={classes.tableContainer}>
      <Table className={classes.fullWidth} size="small" aria-label="credits table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ID</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell align="center">Créditos</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">{row.credits || 0}</TableCell>
              <TableCell align="center">
                <TextField
                  variant="outlined"
                  size="small"
                  type="number"
                  value={amounts[row.id] || ""}
                  onChange={(e) => handleChangeAmount(row.id, e.target.value)}
                />
              </TableCell>
              <TableCell align="center">
                <ButtonWithSpinner
                  loading={loading}
                  onClick={() => handleSubmit(row.id)}
                  variant="contained"
                  color="primary"
                >
                  Atualizar
                </ButtonWithSpinner>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
