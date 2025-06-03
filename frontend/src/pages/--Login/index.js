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
import { Helmet } from "react-helmet";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  backgroundColor: "#e8ab31",
  color: "white",
  fontSize: "12px",
};

const customStyle2 = {
  borderRadius: 0,
  margin: 1,
  boxShadow: "none",
  backgroundColor: "#096799",
  color: "white",
  fontSize: "12px",
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    backgroundImage: "url(https://i.postimg.cc/L4P5YD9K/bg-fw.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
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
    padding: "55px 30px",
    borderRadius: "12.5px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    borderRadius: 0,
    margin: 1,
    boxShadow: "none",
    backgroundColor: "#75bfe6",
    color: "white",
    fontSize: "12px",
  },
  powered: {
    color: "white",
  },
  logoImg: {
    width: "100%",
    maxWidth: "350px",
    height: "auto",
    maxHeight: "120px",
    margin: "0 auto",
    content:
      "url(" +
      (theme.mode === "light"
        ? theme.calculatedLogoLight()
        : theme.calculatedLogoDark()) +
      ")",
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
        <title>{appName || "CHATPAGEPRO"}</title>
        <link rel="icon" href={appLogoFavicon || "/default-favicon.ico"} />
      </Helmet>
      <div className={classes.root}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <IconButton
              className={classes.iconButton}
              onClick={colorMode.toggleColorMode}
            >
              {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <div>
              <img className={classes.logoImg} alt="logo" />
            </div>
            <form className={classes.form} noValidate onSubmit={handlSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label={i18n.t("login.form.email")}
                name="email"
                value={user.email}
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value.toLowerCase())
                }
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label={i18n.t("login.form.password")}
                type={showPassword ? "text" : "password"}
                id="password"
                value={user.password}
                onChange={(e) =>
                  handleChangeInput(e.target.name, e.target.value)
                }
                autoComplete="current-password"
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
              <LinearProgress
                className={classes.passwordStrengthBar}
                variant="determinate"
                value={(passwordStrength / 5) * 100}
                style={{ backgroundColor: getPasswordStrengthColor(passwordStrength) }}
              />
              <Typography variant="body2" className={classes.passwordStrengthText}>
                {passwordStrength <= 2 && "Senha fraca"}
                {passwordStrength > 2 && passwordStrength <= 4 && "Senha média"}
                {passwordStrength > 4 && "Senha forte"}
              </Typography>
              <Grid container justify="flex-end">
                <Grid item xs={6} style={{ textAlign: "right" }}>
                  <Link component={RouterLink} to="/forgetpsw" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={user.rememberMe}
                    onChange={(e) =>
                      handleChangeInput("rememberMe", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label="Lembre-se de mim"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                style={customStyle2}
                className={classes.submit}
              >
                {i18n.t("login.buttons.submit")}
              </Button>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                style={customStyle}
                to="/signup"
              >
                {i18n.t("login.buttons.register")}
              </Button>
              {allowSignup && (
                <Grid container>
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      component={RouterLink}
                      to="/signup"
                    >
                      {i18n.t("login.buttons.register")}
                    </Link>
                  </Grid>
                </Grid>
              )}
            </form>
          </div>
          <Box> Copyright 2024 - Core Sistemas </Box>
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
          <Button onClick={handleChangePassword} color="primary" autoFocus>
            Alterar senha
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
