import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import {
  uploadConversationList,
  listConversationLists,
  deleteConversationList,
} from "../../services/conversationListApi";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    width: "100%"
  }
}));

const ChipConversationUpload = () => {
  const classes = useStyles();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    try {
      const { data } = await listConversationLists();
      setLists(data);
    } catch (err) {
      // ignore
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file || !name) {
      toast.error("Selecione nome e arquivo");
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("name", name);
    try {
      await uploadConversationList(data);
      toast.success("Lista enviada");
      setFile(null);
      setName("");
      fetchLists();
    } catch (err) {
      toast.error("Erro ao enviar");
    }
  };

  const handleDelete = async id => {
    try {
      await deleteConversationList(id);
      fetchLists();
    } catch (err) {
      toast.error("Erro ao excluir");
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.container}>
        <TextField
          label="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          variant="outlined"
        />
        <input
          type="file"
          accept="text/plain"
          onChange={e => setFile(e.target.files[0])}
        />
        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
      <List>
        {lists.map(list => (
          <ListItem key={list.id} dense>
            <ListItemText
              primary={list.name}
              secondary={`${list.messages.length} mensagens`}
            />
            <IconButton edge="end" onClick={() => handleDelete(list.id)}>
              <DeleteOutlineIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChipConversationUpload;
