import React, { useEffect, createRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Paper, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent, InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useResize, http, useFormState } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy, Keyboard, NotificationsActive, Send as SendIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function DesaparecidoDisabledExample() {

    const dispatch = useDispatch();

    const formRef: any = createRef();

    const { width, height } = useResize(React);

    const { id } = useParams();

    const onSubmit = data => console.log(data);

    const navigate = useNavigate();

    const [o, { defaultProps, set, validate }] = useFormState(useState, {

    }, {});

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

    }, [width, height]);

    useEffect(() => {
        if (id) {
            http.get(process.env.REACT_APP_PATH + '/desaparecido/' + id).then((result) => {
                set(result);
                set(o => ({ ...o, id: result.id }));
                set(o => ({ ...o, nroDenuncia: result.nroDenuncia }));
                set(o => ({ ...o, regPolicial: result.dependencia.name }));
                set(o => ({ ...o, fechaHoraHecho: result.fechaHoraHecho }));
                set(o => ({ ...o, tez: result.tez }));
                set(o => ({ ...o, fenotipo: result.fenotipo }));
                set(o => ({ ...o, ojos: result.ojos }));
                set(o => ({ ...o, sangre: result.sangre }));
                set(o => ({ ...o, boca: result.boca }));
                set(o => ({ ...o, nariz: result.nariz }));
                set(o => ({ ...o, cabello: result.cabello }));
                set(o => ({ ...o, estatura: result.estatura }));
                set(o => ({ ...o, contextura: result.contextura }));
                set(o => ({ ...o, vestimenta: result.vestimenta }));
                set(o => ({ ...o, circunstancia: result.circunstancia }));
                set(o => ({ ...o, observacion: result.observacion }));
                set(o => ({ ...o, nroContacto: result.nroContacto }));
                set(o => ({ ...o, estado: result.estado }));
                set(o => ({ ...o, dni: result.persona.dni }));
                set(o => ({ ...o, nombres: result.persona.nombres }));
                set(o => ({ ...o, apePaterno: result.persona.apePaterno }));
                set(o => ({ ...o, apeMaterno: result.persona.apeMaterno }));
                set(o => ({ ...o, direccion: result.persona.direccion }));
                set(o => ({ ...o, fechaNacimiento: result.persona.fechaNacimiento }));
                set(o => ({ ...o, sexo: result.persona.sexo }));
                set(o => ({ ...o, estadoCivil: result.persona.estadoCivil }));
                set(o => ({ ...o, distrito: result.distrito.distrito }));
                set(o => ({ ...o, provincia: result.distrito.provincia.provincia }));
                set(o => ({ ...o, departamento: result.distrito.provincia.departamento.departamento }));
            });
        }
    }, [id]);

    const onKeyUp = (e: any) => {
        if (o.nroDocumento?.length === 8) {
            http.get('https://web.regionancash.gob.pe/api/reniec/Consultar?nuDniConsulta=' + o.nroDocumento + '&out=json', (h) => {
                return { "Content-Type": "*/*" };
            }).then(result => {
                if (result.consultarResponse.return.coResultado === "0000") {
                    let v = result.consultarResponse.return.datosPersona;
                    let apename = v.prenombres + ' ' + v.apPrimer + ' ' + v.apSegundo;
                    set(o => ({ ...o, apellidoNombre: apename }));
                    set(o => ({ ...o, varTemp: 1 }));
                } else {
                    set(o => ({ ...o, apellidoNombre: '' }));
                    set(o => ({ ...o, varTemp: 0 }));
                    dispatch({ type: "snack", msg: 'No contamos con sus datos personales, por favor ingrese correctamente.', severity: 'warning' });
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const onClickSave = async () => {
        const form = formRef.current;
        if (1 || form != null && validate(form)) {
            http.post(process.env.REACT_APP_PATH + '/informacion', { dni: o.nroDocumento, apeNombres: o.apellidoNombre, descripcion: o.descripcion, desaparecido: { id: o.id } }).then(async (result) => {
                if (result) {
                    dispatch({ type: "snack", msg: 'Información enviada con éxito.!' });
                    set(o => ({}));
                    navigate('/', { replace: true });
                    if (!o._id) {
                    }
                }
            });
        } else {
            dispatch({ type: "alert", msg: 'Falta campos por completar!' });
        }
    };

    function fechaHora(timestamp) {
        const fecha = new Date(timestamp);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        let hora = fecha.getHours();
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        const segundos = fecha.getSeconds().toString().padStart(2, '0');
        const amPm = hora >= 12 ? 'PM' : 'AM';
        hora = hora % 12;
        hora = hora ? hora : 12;
        return `${dia}/${mes}/${anio}  ${hora}:${minutos}:${segundos} ${amPm}`;
    }

    function disableApellidoNombre() {
        if (o.varTemp === 0) {
            return false;
        } else {
            return true;
        };
    }

    return (
        <Paper className="page color-plomo" style={{ overflow: 'auto' }}>
            <Container maxWidth="lg">
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width2: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    ref={formRef} onSubmit={onSubmit} style={{ textAlign: 'left' }}>
                    <Card className='mt-3'>
                        <Typography gutterBottom component="div" fontSize={'24px'} className='text-center fw-bold pt-2' sx={{ textTransform: 'uppercase' }}>
                            BRINDAR INFORMACIÓN DE VISTO POR ÚLTIMA VEZ
                        </Typography>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={4} className='p-3'>
                                <Card sx={{ backgroundColor: '#E0E0E0' }}>
                                    <CardActionArea className='mt-4'>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 200, height: 200, margin: 'auto' }}
                                            image={process.env.PUBLIC_URL + "/little-boy.png"}
                                            alt="Busqueda SISGEDO."
                                        />
                                        <CardContent>
                                            <Typography gutterBottom component="div" textAlign={'center'} fontSize={'20px'} fontWeight={'bold'}>
                                                {o.apePaterno} {o.apeMaterno} {o.nombres}

                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" textAlign={'center'}>
                                                Hecho ocurrido el:
                                                <br></br>
                                                {fechaHora(o.fechaHoraHecho)}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className='pl-6'>
                                        <Box sx={{ width: '100%' }}>
                                            <Button fullWidth className='hover-white mb-1' variant="contained" color="error" href={process.env.PUBLIC_URL + `/alerta/${o.id}`} startIcon={<FileCopy />}>
                                                Nota de Alerta
                                            </Button>
                                        </Box>

                                    </CardActions>
                                    <CardActions className='text-center'>
                                        <Grid container>
                                            <Grid item xs={5}>
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px' }}
                                                    image={process.env.PUBLIC_URL + "/whatsap.png"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px', border: '1px solid #009688', marginLeft: '5px' }}
                                                    image={process.env.PUBLIC_URL + "/phone.jpg"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={6} md={8} className='p-3'>
                                <Card sx={{}}>
                                    <CardContent>
                                        <Grid item xs={12} md={6} >
                                            <TextField
                                                type={'number'}
                                                sx={{ fontWeight: 'bold' }}
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="standard-name"
                                                label="Número de Documento: "
                                                placeholder="Ingrese el número de Documento."
                                                onKeyUp={onKeyUp}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Keyboard />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...defaultProps("nroDocumento")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField
                                                disabled={disableApellidoNombre()}
                                                margin="normal"
                                                required
                                                fullWidth
                                                size="medium"
                                                id="standard-name"
                                                label="Ingrese sus Apellidos y Nombres: "
                                                placeholder="Apellidos y Nombres."
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Keyboard />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                {...defaultProps("apellidoNombre")}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                multiline
                                                size="medium"
                                                rows={6}
                                                id="standard-name"
                                                label="Ingrese la ubicación de la Persona desaparecida, detalladamente considerando referencias de la ubicación y/o vestimenta: "
                                                placeholder="Descripción detallada."
                                                {...defaultProps("descripcion")}
                                            />
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Box sx={{ width: '100%' }}>
                                            <Button fullWidth className='hover-white mb-1' variant="contained" color="error" onClick={onClickSave} startIcon={<FileCopy />}>
                                                Enviar
                                            </Button>
                                        </Box>
                                    </CardActions>
                                </Card>
                            </Grid>

                        </Grid>
                    </Card>
                </Box>
            </Container>
        </Paper>
    );
}

export default DesaparecidoDisabledExample;