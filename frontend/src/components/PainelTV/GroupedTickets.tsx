import React from "react";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import TicketCard from "./TicketCard";
import { getBackendUrl } from "../../config";

interface GroupedTicketsProps {
  user: any;
  tickets: any[];
}

const backendUrl = getBackendUrl();

const GroupedTickets: React.FC<GroupedTicketsProps> = ({ user, tickets }) => {
  return (
    <Paper variant="outlined" sx={{ p: 1 }} component={motion.div} layout>
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar
          src={user.profileImage ? `${backendUrl}/public/company${user.companyId}/user/${user.profileImage}` : undefined}
          sx={{ mr: 1 }}
        />
        <Box>
          <Typography variant="subtitle1">{user.name}</Typography>
          <Typography variant="caption">Atendimentos: {tickets.length}</Typography>
        </Box>
      </Box>
      <AnimatePresence>{tickets.map((t) => <TicketCard key={t.id} ticket={t} />)}</AnimatePresence>
    </Paper>
  );
};

export default GroupedTickets;
