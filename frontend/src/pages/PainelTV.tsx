import React, { useContext, useEffect, useMemo } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { AuthContext } from "../context/Auth/AuthContext";
import api from "../services/api";
import PendingTickets from "../components/PainelTV/PendingTickets";
import ActiveTickets from "../components/PainelTV/ActiveTickets";

interface Ticket {
  id: number;
  user?: any;
}

const fetchTickets = async () => {
  const { data } = await api.get("/usersMoments");
  return data;
};

const PainelTV: React.FC = () => {
  const { user, socket } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: tickets = [] } = useQuery("painel-tickets", fetchTickets, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (!socket || !user?.companyId) return;
    const companyId = user.companyId;
    const handler = () => queryClient.invalidateQueries("painel-tickets");
    socket.on(`company-${companyId}-ticket`, handler);
    socket.on(`company-${companyId}-appMessage`, handler);
    return () => {
      socket.off(`company-${companyId}-ticket`, handler);
      socket.off(`company-${companyId}-appMessage`, handler);
    };
  }, [socket, user, queryClient]);

  const grouped = useMemo(() => {
    const groups: { user: any; tickets: Ticket[] }[] = [];
    tickets.forEach((t: Ticket) => {
      if (t.user) {
        const idx = groups.findIndex((g) => g.user.id === t.user.id);
        if (idx === -1) {
          groups.push({ user: t.user, tickets: [t] });
        } else {
          groups[idx].tickets.push(t);
        }
      }
    });
    return groups;
  }, [tickets]);

  const pending = useMemo(() => tickets.filter((t: Ticket) => !t.user), [tickets]);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom>
        📺 Painel de Atendimentos em Tempo Real
      </Typography>
      <Grid container spacing={2} alignItems="flex-start">
        {pending.length > 0 && (
          <Grid item xs={12} md={4} key="pending">
            <PendingTickets tickets={pending} />
          </Grid>
        )}
        {grouped.length > 0 && (
          <Grid item xs={12} md={8} key="active">
            <ActiveTickets groups={grouped} />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PainelTV;
