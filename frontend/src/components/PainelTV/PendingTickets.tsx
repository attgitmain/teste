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
    <Paper variant="outlined" sx={{ p: 1 }} component={motion.div} layout>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ mr: 1 }}>
          <ReportProblemIcon color="warning" />
        </Avatar>
        <Box>
          <Typography variant="subtitle1">Pendentes</Typography>
          <Typography variant="caption">Atendimentos: {tickets.length}</Typography>
        </Box>
      </Box>
      <AnimatePresence>{tickets.map((t) => <TicketCard key={t.id} ticket={t} />)}</AnimatePresence>
    </Paper>
  );
};

export default PendingTickets;
