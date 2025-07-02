import React from "react";
import { Avatar, Box, Chip, Typography } from "@mui/material";
import { format, isSameDay, parseISO } from "date-fns";
import { motion } from "framer-motion";

interface TicketCardProps {
  ticket: any;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  const lastUpdate = parseISO(ticket.updatedAt);

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <Box display="flex" alignItems="center" p={1} borderBottom={1} borderColor="divider">
        <Avatar src={ticket.contact?.urlPicture} sx={{ mr: 1 }} />
        <Box flexGrow={1} minWidth={0}>
          <Typography variant="subtitle2" noWrap>
            {ticket.contact?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {ticket.lastMessage}
          </Typography>
          <Box mt={0.5}>
            {ticket.whatsapp?.name && (
              <Chip size="small" label={ticket.whatsapp.name} sx={{ mr: 0.5 }} />
            )}
            {ticket.queue?.name && (
              <Chip
                size="small"
                label={ticket.queue.name.toUpperCase()}
                sx={{ mr: 0.5, backgroundColor: ticket.queue.color || "#7c7c7c", color: "#fff" }}
              />
            )}
          </Box>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {isSameDay(lastUpdate, new Date()) ? format(lastUpdate, "HH:mm") : format(lastUpdate, "dd/MM")}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default TicketCard;
