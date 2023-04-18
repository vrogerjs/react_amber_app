import React from 'react';
import './App.css';
import FormDisabledExample from './screens/form';
import MainDisabledExample from './screens/main';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import SearchDisabledExample from './screens/search';
import VideoDisabledExample from './screens/video';
import AlertaDisabledExample from './screens/alerta';
import InformacionDisabledExample from './screens/informacion';
import DesaparecidoDisabledExample from './screens/desaparecido';
import UbicadoDisabledExample from './screens/ubicado';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSelector, useDispatch } from "react-redux";
import { http } from 'gra-react-utils';
import {
  Alert, AppBar, Box, IconButton, Snackbar, Toolbar, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Grid,
  Link
} from '@mui/material';
import {
  BrowserRouter as Router
} from "react-router-dom";
import {
  Routes,
  Route
} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

function VDialog() {

  const dialog = useSelector((state: any) => state.dialog);

  const options = dialog?.options ?? (dialog?.type === 'confirm' ? ['Cancelar', 'Si'] : ['Cerrar']);

  const dispatch = useDispatch();

  function onClose(e) {
    const el = e.target;
    let index;
    if (el.tagName === 'BUTTON')
      index = Array.prototype.indexOf.call(el.parentNode.children, el);
    if (dialog.cb) dialog.cb(index);
    dispatch({ type: "alert" })
  }

  return dialog ? <Dialog
    open={!!dialog}
    onClose={onClose}>
    <DialogTitle>
      {dialog.title ?? (dialog.type === 'confirm' ? 'Confirmar' : dialog.type === 'error' ? 'Error' : 'Mensaje')}
    </DialogTitle>
    <DialogContent>
      <DialogContentText style={{ lineBreak: 'anywhere' }} dangerouslySetInnerHTML={{ __html: dialog.msg }} ></DialogContentText>
    </DialogContent>
    <DialogActions style={{
      float: 'none',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {options.map((e, i) => (<Button key={i} onClick={onClose} autoFocus={i === options.length - 1}>{e}</Button>))}
    </DialogActions>
  </Dialog> : null

}

function VSnackbar() {
  const snack = useSelector((state: any) => state.snack);

  const dispatch = useDispatch();

  const onClose = () => { dispatch({ type: "snack" }) };

  return <Snackbar open={!!snack}
    sx={{ bottom: 70 }}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={2000} onClose={onClose}>
    {<Alert severity={snack && snack.severity || "success"} variant="filled" onClose={onClose} sx={{ width: '100%' }}>
      {snack ? snack.msg : ''}
    </Alert>
    }
  </Snackbar>;
}
const pages = ['HOME', 'DESAPARECIDOS', 'UBICADOS', 'COMO DENUNCIAR?'];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  http.onError = (request) => {
    console.log(request);
    // dispatch({ type: 'error', msg: ('<b>' + request.url + '</b><br/>' + request.error + '->' + request.message) });
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, backgroundColor: '#f0f0f0' }}>
        <AppBar position="static" className='bg-gore'>
          <Toolbar>
            <Grid container spacing={1}>
              <Grid item xs={12} md={2} className="text-center">
                <Box
                  component="img"
                  sx={{
                    maxWidth: 150,
                    paddingTop: 2,
                    paddingLeft: 2,
                    paddingBottom: 2,
                  }}
                  alt="Logo del GORE Áncash."
                  src={process.env.PUBLIC_URL + "/logogore.png"}
                />
              </Grid>

              <Grid item xs={12} md={8} className="text-center mt-2" display={{ xs: "none", lg: "block", md: "block" }}>
                <Typography color="#fff" fontSize={'13px'} fontStyle="italic">
                  “Año de la unidad, la paz y el desarrollo”
                </Typography>
                <Typography color="#fff" fontWeight={'bold'} fontSize={'30px'}>
                  SISTEMA DE ALERTAS AMBER
                </Typography>
                <Typography className='font-size-14' color="#fff" fontWeight={'bold'} fontSize={'30px'}>
                  Gobierno Regional de Áncash
                </Typography>
              </Grid>

              <Grid item xs={12} md={2} className="text-center" display={{ xs: "none", lg: "block", md: "block" }}>
                <Box
                  component="img"
                  sx={{
                    maxWidth: 70,
                    paddingTop: 1,
                    paddingLeft: 1,
                    paddingBottom: 1,
                  }}
                  alt="Escudo del Perú."
                  src={process.env.PUBLIC_URL + "/logoperu.png"}
                />
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>

        <Container className='mt-3'>
          <AppBar position="static" sx={{ backgroundColor: '#0f62ac' }}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center"><Link href={process.env.PUBLIC_URL + "/register"}>{page}</Link></Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Typography
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontWeight: 600,
                    color: 'inherit',
                    textDecoration: 'none',
                    fontSize: '15px'
                  }}
                >
                  SISTEMA DE ALERTAS AMBER
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  <Button
                    key='HOME'
                    href={process.env.PUBLIC_URL + "/"}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    HOME
                  </Button>
                  <Button
                    key='DESAPARECIDOS'
                    href={process.env.PUBLIC_URL + "/desaparecido"}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    DESAPARECIDOS
                  </Button>
                  <Button
                    key='UBICADOS'
                    href={process.env.PUBLIC_URL + "/ubicado"}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    UBICADOS
                  </Button>
                  <Button
                    key='COMO DENUNCIAR?'
                    href={process.env.PUBLIC_URL + "/denuncia"}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    COMO DENUNCIAR?
                  </Button>
                </Box>
                <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </Toolbar>
            </Container>
          </AppBar>
        </Container>


        <Router basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path={`/`} element={<MainDisabledExample />} />
            <Route path={`/register`} element={<FormDisabledExample />} />
            <Route path={`/search`} element={<SearchDisabledExample />} />
            <Route path={`/video`} element={<VideoDisabledExample />} />
            <Route path={`/desaparecido`} element={<DesaparecidoDisabledExample />} />
            <Route path={`/ubicado`} element={<UbicadoDisabledExample />} />
            <Route path={`/alerta/:id`} element={<AlertaDisabledExample />} />
            <Route path={`/informacion/:id`} element={<InformacionDisabledExample />} />
          </Routes>
        </Router>
      </Box>
      <VSnackbar />
      <VDialog />

    </div>
  );
}

export function VRadioGroup({ children, error, label, value, ...other }) {
  return <FormControl className={error ? 'error' : ''} >
    <FormLabel id={other.name}>{label}</FormLabel>
    <RadioGroup
      aria-labelledby={other.name}
      value={value}
      {...other}
    >
      {children}
    </RadioGroup>
  </FormControl>;
}

export default App;
