import React, { useEffect, useState } from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { listReportLogs } from "../../services/reportLogsApi";

const ReportLogs = () => {
  const [logs, setLogs] = useState([]);

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

  return (
    <Paper style={{ overflowX: "auto" }}>
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
