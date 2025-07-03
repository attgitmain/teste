import React from "react";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { motion, AnimatePresence } from "framer-motion";
import GroupedTickets from "./GroupedTickets";

interface Group {
  user: any;
  tickets: any[];
}

interface ActiveTicketsProps {
  groups: Group[];
}

const ActiveTickets: React.FC<ActiveTicketsProps> = ({ groups }) => {
  const total = groups.reduce((acc, g) => acc + g.tickets.length, 0);
  return (
    <Paper variant="outlined" sx={{ p: 2 }} component={motion.div} layout>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ mr: 1, width: 56, height: 56 }}>
          <CheckCircleIcon color="success" />
        </Avatar>
        <Box>
          <Typography variant="h6">Em Atendimento</Typography>
          <Typography variant="subtitle1">Atendimentos: {total}</Typography>
        </Box>
      </Box>
      <Grid container spacing={1} alignItems="flex-start">
        <AnimatePresence>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.user.id}>
              <GroupedTickets user={group.user} tickets={group.tickets} />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>
    </Paper>
  );
};

export default ActiveTickets;
