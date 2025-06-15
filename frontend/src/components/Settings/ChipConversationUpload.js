import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { uploadConversationList } from "../../services/conversationListApi";

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
    } catch (err) {
      toast.error("Erro ao enviar");
    }
  };

  return (
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
  );
};

export default ChipConversationUpload;
