import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import ColorModeContext from "../../layout/themeContext";
import useSettings from "../../hooks/useSettings";
import IconButton from "@material-ui/core/IconButton";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import { Checkbox, FormControlLabel, LinearProgress } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddIcon from '@mui/icons-material/Add';
import LoginIcon from '@mui/icons-material/Login';
import { Helmet } from "react-helmet";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const handleRedirect = () => {
  window.open("https://wa.me/", "_blank");
};

const Copyright = () => {
  return (
    <Typography variant="body2" color="#fff" align="center">
      {"Copyright "}
      <Link color="#fff" href="#">
        Core Sistemas
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const customStyle = {
  borderRadius: 0,
  margin: 1,
  boxShadow: "none",
  backgroundColor: "#F78C6B",
  color: "white",
  fontSize: "12px",
};

const customStyle2 = {
  borderRadius: 0,
  margin: 1,
  boxShadow: "none",
  backgroundColor: "#0f65ab",
  color: "white",
  fontSize: "12px",
};

const customStyle3 = {
  borderRadius: 0,
  margin: 1,
  boxShadow: "none",
  backgroundColor: "#0ea17b",
  color: "white",
  fontSize: "12px",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#f4f9fa", // Cor de fundo cinza claro conforme o design
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  paper: {
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 30px",
    borderRadius: "8px",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.05)",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1.5, 0),
    backgroundColor: "#059669",
    color: "#ffffff",
    fontSize: "16px",
    textTransform: "none",
    borderRadius: "4px",
    boxShadow: "none",
    '&:hover': {
      backgroundColor: "#06ad78",
    },
  },
  forgotPassword: {
    textAlign: "right",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '& a': {
      color: "#666666",
      textDecoration: "none",
      fontSize: "14px",
      '&:hover': {
        textDecoration: "underline",
      },
    },
  },
  registerText: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    '& a': {
      color: "#000000",
      fontWeight: "bold",
      textDecoration: "underline",
    },
  },
  powered: {
    color: "#666666",
    marginTop: theme.spacing(2),
    fontSize: "14px",
  },
  logoImg: {
    width: "100%",
    maxWidth: "300px",
    height: "auto",
    margin: "0 auto 20px",
    content: "url(" + (theme.mode === "light" ? theme.calculatedLogoLight() : theme.calculatedLogoDark()) + ")",
  },
  iconButton: {
    position: "absolute",
    top: 10,
    right: 10,
    color: theme.mode === "light" ? "black" : "white",
  },
  passwordStrengthBar: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  passwordStrengthText: {
    marginTop: theme.spacing(1),
    fontSize: '0.75rem',
  },
  copyright: {
    marginTop: theme.spacing(3),
    color: "#666666",
    fontSize: "14px",
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: "4px",
      '& fieldset': {
        borderColor: '#e0e0e0',
      },
      '&:hover fieldset': {
        borderColor: '#c0c0c0',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a0a0a0',
      },
    },
    '& .MuiInputLabel-outlined': {
      color: '#666666',
    },
    marginBottom: theme.spacing(2),
  },
}));

const calculatePasswordStrength = (password) => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { colorMode } = useContext(ColorModeContext);
  const { appLogoFavicon, appName, mode } = colorMode;
  const [user, setUser] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [allowSignup, setAllowSignup] = useState(false);
  const { getPublicSetting } = useSettings();
  const { handleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  const handleChangeInput = (name, value) => {
    setUser({ ...user, [name]: value });
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    if (passwordStrength <= 2) {
      setOpenDialog(true);
    } else {
      handleLogin(user);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleProceed = () => {
    setOpenDialog(false);
    handleLogin(user);
  };

  const handleChangePassword = () => {
    setOpenDialog(false);
    // Redirecionar para a página de alteração de senha
    history.push("/change-password");
  };

  useEffect(() => {
    getPublicSetting("allowSignup")
      .then((data) => {
        setAllowSignup(data === "enabled");
      })
      .catch((error) => {
        console.log("Error reading setting", error);
      });
  }, []);

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return "#f44336";
    if (strength <= 4) return "#ff9800";
    return "#4caf50";
  };

  return (
    <>
      <Helmet>
        <title>{appName || "ZapFlow"}</title>
        <link rel="icon" href={appLogoFavicon || "/default-favicon.ico"} />
      </Helmet>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <div>
              <img className={classes.logoImg} src="/zapflow-logo.png" alt="ZapFlow" />
            </div>
            <form className={classes.form} noValidate onSubmit={handlSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email *"
                name="email"
                value={user.email}
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value.toLowerCase())
                }
                autoComplete="email"
                autoFocus
                className={classes.inputField}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha *"
                type={showPassword ? "text" : "password"}
                id="password"
                value={user.password}
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value)
                }
                autoComplete="current-password"
                className={classes.inputField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              
              <div className={classes.forgotPassword}>
                <Link component={RouterLink} to="/forgetpsw">
                  esqueceu a senha?
                </Link>
              </div>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Login
              </Button>
              
              <Typography variant="body2" className={classes.registerText}>
                Não possui uma conta? <Link component={RouterLink} to="/signup">Cadastre-se.</Link>
              </Typography>
            </form>
          </div>
          <Typography variant="body2" align="center" className={classes.copyright}>
            Copyright 2025 - ZapFlow
          </Typography>
        </Container>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Senha com segurança baixa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sua senha atual tem um nível de segurança baixo. Recomendamos que você altere sua senha para uma mais segura. Deseja prosseguir com o login ou alterar sua senha agora?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProceed} color="primary">
            Prosseguir com o login
          </Button>

        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
