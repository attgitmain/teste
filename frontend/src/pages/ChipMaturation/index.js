import React, { useState, useEffect, useContext } from "react";
import MainContainer from "../../components/MainContainer";
import MainHeader from "../../components/MainHeader";
import Title from "../../components/Title";
import {
  Typography,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Checkbox,
  ListItemText,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { i18n } from "../../translate/i18n";
import {
  startMaturation,
  listMaturations,
  cancelMaturation,
  getMaturationLogs,
} from "../../services/maturacaoApi";
import { WhatsAppsContext } from "../../context/WhatsApp/WhatsAppsContext";
import { AuthContext } from "../../context/Auth/AuthContext";
import Modal from "@material-ui/core/Modal";
import { listConversationLists } from "../../services/conversationListApi";

const ChipMaturation = () => {
  const { whatsApps } = useContext(WhatsAppsContext);
  const { user, socket } = useContext(AuthContext);
  const [origin, setOrigin] = useState("");
  const [targets, setTargets] = useState([]);
  const [days, setDays] = useState(1);
  const [intervalMinutes, setIntervalMinutes] = useState(60);
  const [conversations, setConversations] = useState("");
  const [conversationLists, setConversationLists] = useState([]);
  const [selectedLists, setSelectedLists] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);

  const activeConnections = whatsApps?.filter(w => w.status === "CONNECTED") || [];

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const { data } = await listConversationLists();
        setConversationLists(data);
      } catch (err) {
        // ignore
      }
    };
    fetchLists();
  }, []);

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
    if (socket && user) {
      const onUpdate = (data) => {
        if (data.action === "update") {
          setJobs((prev) => {
            const idx = prev.findIndex(j => j.id === data.record.id);
            if (idx >= 0) {
              const newArr = [...prev];
              newArr[idx] = data.record;
              return newArr;
            }
            return [...prev, data.record];
          });
        }
      };
      socket.on(`company-${user.companyId}-maturation`, onUpdate);
      return () => socket.off(`company-${user.companyId}-maturation`, onUpdate);
    }
  }, [socket]);

  const handleStart = async () => {
    try {
      let msgs = conversations
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);
      selectedLists.forEach((id) => {
        const list = conversationLists.find((l) => l.id === id);
        if (list) msgs = msgs.concat(list.messages);
      });
      await startMaturation({
        originChipId: origin,
        targetChipIds: targets,
        days: Number(days),
        intervalMinutes: Number(intervalMinutes),
        conversations: msgs,
        companyId: user.companyId,
      });
      toast.success(i18n.t("chipMaturation.started"));
      setOrigin("");
      setTargets([]);
      setConversations("");
      setSelectedLists([]);
      setActiveStep(0);
      fetchJobs();
    } catch (err) {
      const msg = err?.response?.data?.error || i18n.t("chipMaturation.error");
      toast.error(msg);
    }
  };

  const handleCancel = async (id) => {
    await cancelMaturation(id);
    fetchJobs();
  };

  const openHistory = async (id) => {
    try {
      const { data } = await getMaturationLogs(id);
      setHistory(data);
      setHistoryOpen(true);
    } catch (err) {
      toast.error(i18n.t("chipMaturation.error"));
      setHistory([]);
      setHistoryOpen(true);
    }
  };

  return (
    <MainContainer>
      <MainHeader>
        <Title>{i18n.t("chipMaturation.title")}</Title>
      </MainHeader>
      <Typography variant="body2" style={{ marginBottom: 16 }}>
        {i18n.t("chipMaturation.description")}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: 16 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step>
                <StepLabel>{i18n.t("chipMaturation.step_origin")}</StepLabel>
                <StepContent>
                  <Select
                    fullWidth
                    displayEmpty
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    renderValue={() => {
                      if (!origin) return i18n.t("chipMaturation.chipLabel");
                      const conn = activeConnections.find(c => String(c.number) === origin);
                      return conn ? `${conn.name} (${conn.number})` : origin;
                    }}
                  >
                    {activeConnections.map((conn) => (
                      <MenuItem key={conn.id} value={String(conn.number)}>
                        {conn.name} ({conn.number})
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ marginTop: 16 }}>
                    <Button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(activeStep - 1)}
                    >
                      {i18n.t("chipMaturation.backButton")}
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setActiveStep(activeStep + 1)}
                      disabled={!origin}
                    >
                      {i18n.t("chipMaturation.nextButton")}
                    </Button>
                  </div>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>{i18n.t("chipMaturation.step_targets")}</StepLabel>
                <StepContent>
                  <Select
                    multiple
                    fullWidth
                    value={targets}
                    onChange={(e) => setTargets(e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {activeConnections.filter(c => String(c.number) !== origin).map((conn) => (
                      <MenuItem key={conn.id} value={String(conn.number)}>
                        <Checkbox checked={targets.indexOf(String(conn.number)) > -1} />
                        <ListItemText primary={`${conn.name} (${conn.number})`} />
                      </MenuItem>
                    ))}
                  </Select>
                  <div style={{ marginTop: 16 }}>
                    <Button onClick={() => setActiveStep(activeStep - 1)}>
                      {i18n.t("chipMaturation.backButton")}
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setActiveStep(activeStep + 1)}
                      disabled={targets.length === 0}
                    >
                      {i18n.t("chipMaturation.nextButton")}
                    </Button>
                  </div>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>{i18n.t("chipMaturation.step_schedule")}</StepLabel>
                <StepContent>
                  <TextField
                    type="number"
                    label={i18n.t("chipMaturation.daysLabel")}
                    fullWidth
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                  />
                  <TextField
                    type="number"
                    style={{ marginTop: 8 }}
                    label={i18n.t("chipMaturation.intervalLabel")}
                    fullWidth
                    value={intervalMinutes}
                    onChange={(e) => setIntervalMinutes(e.target.value)}
                  />
                  <div style={{ marginTop: 16 }}>
                    <Button onClick={() => setActiveStep(activeStep - 1)}>
                      {i18n.t("chipMaturation.backButton")}
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => setActiveStep(activeStep + 1)}
                      disabled={!days || !intervalMinutes}
                    >
                      {i18n.t("chipMaturation.nextButton")}
                    </Button>
                  </div>
                </StepContent>
              </Step>
              <Step>
                <StepLabel>{i18n.t("chipMaturation.step_messages")}</StepLabel>
                <StepContent>
                  <Select
                    multiple
                    fullWidth
                    value={selectedLists}
                    onChange={(e) => setSelectedLists(e.target.value)}
                    renderValue={(selected) =>
                      selected
                        .map((id) => {
                          const l = conversationLists.find((c) => c.id === id);
                          return l ? l.name : id;
                        })
                        .join(", ")
                    }
                  >
                    {conversationLists.map((list) => (
                      <MenuItem key={list.id} value={list.id}>
                        <Checkbox checked={selectedLists.indexOf(list.id) > -1} />
                        <ListItemText primary={list.name} />
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    multiline
                    rows={4}
                    label={i18n.t("chipMaturation.conversationLabel")}
                    fullWidth
                    value={conversations}
                    onChange={(e) => setConversations(e.target.value)}
                  />
                  <div style={{ marginTop: 16 }}>
                    <Button onClick={() => setActiveStep(activeStep - 1)}>
                      {i18n.t("chipMaturation.backButton")}
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={handleStart}
                      disabled={!origin || targets.length === 0 || (conversations.trim() === "" && selectedLists.length === 0)}
                    >
                      {i18n.t("chipMaturation.startButton")}
                    </Button>
                  </div>
                </StepContent>
              </Step>
            </Stepper>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          {jobs.map((job) => (
            <Paper key={job.id} style={{ padding: 16, marginBottom: 16 }}>
              <Typography variant="subtitle1">{job.originChipId}</Typography>
              <Typography variant="body2">
                {i18n.t(`chipMaturation.status_${job.status}`)}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={Math.min(job.progress * 100, 100)}
                style={{ height: 10, marginTop: 8, marginBottom: 8 }}
              />
              <Button size="small" onClick={() => openHistory(job.id)}>{i18n.t("chipMaturation.historyButton")}</Button>
              {job.status === "running" && (
                <Button size="small" variant="outlined" color="secondary" onClick={() => handleCancel(job.id)}>
                  {i18n.t("chipMaturation.cancelButton")}
                </Button>
              )}
            </Paper>
          ))}
        </Grid>
      </Grid>
      <Modal open={historyOpen} onClose={() => setHistoryOpen(false)}>
        <div style={{ background: '#fff', padding: 20, maxHeight: 400, overflow: 'auto' }}>
          {history.map((h, index) => (
            <Typography key={index} variant="body2">
              {h.fromChip} → {h.toChip} : {h.message}
            </Typography>
          ))}
        </div>
      </Modal>
    </MainContainer>
  );
};

export default ChipMaturation;
