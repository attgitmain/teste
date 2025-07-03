import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { motion, AnimatePresence } from "framer-motion";
import TicketCard from "./TicketCard";

interface PendingTicketsProps {
  tickets: any[];
}

const PendingTickets: React.FC<PendingTicketsProps> = ({ tickets }) => {
  return (
    <Paper variant="outlined" sx={{ p: 2 }} component={motion.div} layout>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ mr: 1, width: 56, height: 56 }}>
          <ReportProblemIcon color="warning" />
        </Avatar>
        <Box>
          <Typography variant="h6">Aguardando</Typography>
          <Typography variant="subtitle1">Atendimentos: {tickets.length}</Typography>
        </Box>
      </Box>
      <AnimatePresence>
        {tickets.map((t) => (
          <TicketCard key={t.id} ticket={t} showWaitingTime />
        ))}
      </AnimatePresence>
    </Paper>
  );
};

export default PendingTickets;
