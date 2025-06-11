import React, { useState, useEffect } from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import {
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import {
  startMaturation,
  listMaturations,
  cancelMaturation,
} from "../../services/maturacaoApi";

const ChipMaturation = () => {
  const [chip, setChip] = useState("");
  const [days, setDays] = useState(1);
  const [conversations, setConversations] = useState("");
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const { data } = await listMaturations();
      setJobs(data);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleStart = async () => {
    try {
      await startMaturation({
        chipId: chip,
        days: Number(days),
        conversations: conversations.split("\n").filter(Boolean),
      });
      toast.success(i18n.t("chipMaturation.started"));
      setChip("");
      setConversations("");
      fetchJobs();
    } catch (err) {
      toast.error(i18n.t("chipMaturation.error"));
    }
  };

  const handleCancel = async (id) => {
    await cancelMaturation(id);
    fetchJobs();
  };

  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("chipMaturation.title")}</Title>
      </MainHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16 }}>
            <TextField
              label={i18n.t("chipMaturation.chipLabel")}
              fullWidth
              value={chip}
              onChange={(e) => setChip(e.target.value)}
            />
            <TextField
              type="number"
              label={i18n.t("chipMaturation.daysLabel")}
              fullWidth
              style={{ marginTop: 16 }}
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <TextField
              multiline
              rows={4}
              label={i18n.t("chipMaturation.conversationLabel")}
              fullWidth
              style={{ marginTop: 16 }}
              value={conversations}
              onChange={(e) => setConversations(e.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleStart}
              style={{ marginTop: 16 }}
            >
              {i18n.t("chipMaturation.startButton")}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {jobs.map((job) => (
            <Paper key={job.id} style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="subtitle1">{job.chipId}</Typography>
              <Typography variant="body2">
                {i18n.t(`chipMaturation.status_${job.status}`)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(job.progress * 100, 100)}
                style={{ height: 10, marginTop: 8, marginBottom: 8 }}
              />
              {job.status === "running" && (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCancel(job.id)}
                >
                  {i18n.t("chipMaturation.cancelButton")}
                </Button>
              )}
            </Paper>
          ))}
        </Grid>
      </Grid>
    </MainContainer>
  );
};

export default ChipMaturation;
