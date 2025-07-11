import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  TextField,
  FormControl,
  FormHelperText
} from "@material-ui/core";
import { listReportLogs } from "../../services/reportLogsApi";
import useSettings from "../../hooks/useSettings";
import { i18n } from "../../translate/i18n";

const ReportLogs = () => {
  const [logs, setLogs] = useState([]);
  const [dailyReportNumber, setDailyReportNumber] = useState("");
  const [loadingDailyReportNumber, setLoadingDailyReportNumber] = useState(false);
  const [dailyReportTime, setDailyReportTime] = useState("19");
  const [loadingDailyReportTime, setLoadingDailyReportTime] = useState(false);

  const { getAll, update } = useSettings();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await listReportLogs();
        setLogs(data);
      } catch (err) {
        // ignore
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAll();
        const dailyNumber = data.find((s) => s.key === "dailyReportNumber");
        if (dailyNumber) setDailyReportNumber(dailyNumber.value);
        const dailyTime = data.find((s) => s.key === "dailyReportTime");
        if (dailyTime) setDailyReportTime(dailyTime.value);
      } catch (err) {
        // ignore
      }
    };
    fetchSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDailyReportNumber(value) {
    setDailyReportNumber(value);
    setLoadingDailyReportNumber(true);
    await update({ key: "dailyReportNumber", value });
    setLoadingDailyReportNumber(false);
  }

  async function handleDailyReportTime(value) {
    setDailyReportTime(value);
    setLoadingDailyReportTime(true);
    await update({ key: "dailyReportTime", value });
    setLoadingDailyReportTime(false);
  }

  return (
    <Paper style={{ overflowX: "auto" }}>
      <Grid spacing={3} container style={{ padding: 10 }}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth>
            <TextField
              id="dailyReportNumber"
              name="dailyReportNumber"
              margin="dense"
              label={i18n.t("settings.settings.options.dailyReportNumber")}
              variant="outlined"
              value={dailyReportNumber}
              onChange={async (e) => {
                handleDailyReportNumber(e.target.value);
              }}
            />
            <FormHelperText>
              {loadingDailyReportNumber &&
                i18n.t("settings.settings.options.updating")}
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth>
            <TextField
              id="dailyReportTime"
              name="dailyReportTime"
              margin="dense"
              label={i18n.t("settings.settings.options.dailyReportTime")}
              variant="outlined"
              value={dailyReportTime}
              onChange={async (e) => {
                handleDailyReportTime(e.target.value);
              }}
            />
            <FormHelperText>
              {loadingDailyReportTime &&
                i18n.t("settings.settings.options.updating")}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell>Número</TableCell>
            <TableCell>Sucesso</TableCell>
            <TableCell>Erro</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              <TableCell>{log.companyId}</TableCell>
              <TableCell>{log.toNumber}</TableCell>
              <TableCell>{log.success ? "✔" : "✖"}</TableCell>
              <TableCell>{log.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ReportLogs;
