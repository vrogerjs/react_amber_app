import { useEffect, useState, createRef } from 'react';
import { Box, Paper, Button, Container, Grid, CardActionArea, CardActions, CardMedia, CardContent, InputAdornment } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useResize, http, useFormState } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy, Keyboard} from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function DesaparecidoDisabledExample() {

    const dispatch = useDispatch();

    const formRef: any = createRef();

    const viewRef: any = createRef();

    const { id } = useParams();

    const onSubmit = (data: any) => console.log(data);

    const navigate = useNavigate();

    const [o, { defaultProps, set, validate }] = useFormState(useState, {}) as any;

    useResize(({ width, height }: any) => {
        if (formRef.current) {
            const [body, toolBar]: any = formRef.current.children;
            toolBar.style.width = width + 'px';
            body.style.height = (height - toolBar.offsetHeight) + 'px';
            body.style.width = width + 'px';
        }
    }, viewRef);

    useEffect(() => {
        if (id) {
            http.get(import.meta.env.VITE_APP_PATH + '/desaparecido/' + id).then((result: any) => {
                set(result);
                set((o: any) => ({ ...o, id: result.id }));
                set((o: any) => ({ ...o, nroDenuncia: result.nroDenuncia }));
                set((o: any) => ({ ...o, regPolicial: result.dependencia.name }));
                set((o: any) => ({ ...o, fechaHoraHecho: result.fechaHoraHecho }));
                set((o: any) => ({ ...o, tez: result.tez }));
                set((o: any) => ({ ...o, fenotipo: result.fenotipo }));
                set((o: any) => ({ ...o, ojos: result.ojos }));
                set((o: any) => ({ ...o, sangre: result.sangre }));
                set((o: any) => ({ ...o, boca: result.boca }));
                set((o: any) => ({ ...o, nariz: result.nariz }));
                set((o: any) => ({ ...o, cabello: result.cabello }));
                set((o: any) => ({ ...o, estatura: result.estatura }));
                set((o: any) => ({ ...o, contextura: result.contextura }));
                set((o: any) => ({ ...o, vestimenta: result.vestimenta }));
                set((o: any) => ({ ...o, circunstancia: result.circunstancia }));
                set((o: any) => ({ ...o, observacion: result.observacion }));
                set((o: any) => ({ ...o, nroContacto: result.nroContacto }));
                set((o: any) => ({ ...o, estado: result.estado }));
                set((o: any) => ({ ...o, dni: result.persona.dni }));
                set((o: any) => ({ ...o, nombres: result.persona.nombres }));
                set((o: any) => ({ ...o, apePaterno: result.persona.apePaterno }));
                set((o: any) => ({ ...o, apeMaterno: result.persona.apeMaterno }));
                set((o: any) => ({ ...o, direccion: result.persona.direccion }));
                set((o: any) => ({ ...o, fechaNacimiento: result.persona.fechaNacimiento }));
                set((o: any) => ({ ...o, sexo: result.persona.sexo }));
                set((o: any) => ({ ...o, estadoCivil: result.persona.estadoCivil }));
                set((o: any) => ({ ...o, foto: result.persona.foto }));
                set((o: any) => ({ ...o, distrito: result.distrito.distrito }));
                set((o: any) => ({ ...o, provincia: result.distrito.provincia.provincia }));
                set((o: any) => ({ ...o, departamento: result.distrito.provincia.departamento.departamento }));
            });
        }
    }, [id]);

    const onKeyUp = () => {
        if (o.nroDocumento?.length === 8) {
            http.get('https://web.regionancash.gob.pe/api/reniec/Consultar?nuDniConsulta=' + o.nroDocumento + '&out=json', () => {
                return { "Content-Type": "*/*" };
            }).then((result: any) => {
                if (result.consultarResponse.return.coResultado === "0000") {
                    const v = result.consultarResponse.return.datosPersona;
                    const apename = v.prenombres + ' ' + v.apPrimer + ' ' + v.apSegundo;
                    set((o: any) => ({ ...o, apellidoNombre: apename }));
                    set((o: any) => ({ ...o, varTemp: 1 }));
                } else {
                    set((o: any) => ({ ...o, apellidoNombre: '' }));
                    set((o: any) => ({ ...o, varTemp: 0 }));
                    dispatch({ type: "snack", msg: 'No contamos con sus datos personales, por favor ingrese correctamente.', severity: 'warning' });
                }
            }).catch((error: any) => {
                console.log(error);
            });
        }
    }

    const onClickSave = async () => {
        const form = formRef.current;
        // eslint-disable-next-line no-constant-condition
        if (1 || form != null && validate(form)) {
            http.post(import.meta.env.VITE_APP_PATH + '/informacion', { dni: o.nroDocumento, apeNombres: o.apellidoNombre, descripcion: o.descripcion, desaparecido: { id: o.id } }).then(async (result: any) => {
                if (result) {
                    dispatch({ type: "snack", msg: 'Información enviada con éxito.!' });
                    navigate('/', { replace: true });
                }
            });
        } else {
            dispatch({ type: "alert", msg: 'Falta campos por completar!' });
        }
    };

    function fechaHora(timestamp: any) {
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
        }
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
                                        <img
                                            alt="Foto"
                                            height={'200px'}
                                            width={'150px'}
                                            src={o.foto ? 'data:image/png;base64, ' + o.foto : (import.meta.env.VITE_PUBLIC_URL + "/male-female.jpg")}
                                            style={{ display: 'block', margin: '0 auto' }}
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
                                            <Button fullWidth className='hover-white mb-1' variant="contained" color="error" href={import.meta.env.VITE_PUBLIC_URL + `/alerta/${o.id}`} startIcon={<FileCopy />}>
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
                                                    image={import.meta.env.VITE_PUBLIC_URL + "/whatsap.png"}
                                                    alt="Busqueda SISGEDO."
                                                />
                                            </Grid>
                                            <Grid item xs={1}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ height: '70', width: '70', margin: 'auto', borderRadius: '5px', border: '1px solid #009688', marginLeft: '5px' }}
                                                    image={import.meta.env.VITE_PUBLIC_URL + "/phone.jpg"}
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