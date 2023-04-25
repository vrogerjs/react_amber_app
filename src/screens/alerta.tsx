import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, CardActionArea, CardActions, CardMedia, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useFormState, useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileCopy, FileDownload, NotificationsActive, Print, Send as SendIcon } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from "react-redux";

function AlertaDisabledExample() {

    const { width, height } = useResize(React);

    const [desaparecidos, setDesaparecidos] = useState([] as any);

    const componentRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const { id } = useParams();

    const [o, { defaultProps, handleChange, bindEvents, validate, set }] = useFormState(useState, {

    });

    const onSubmit = data => console.log(data);

    useEffect(() => {

        let header: HTMLElement | null = document.querySelector('.MuiToolbar-root');
        let paper: HTMLElement | null = document.querySelector('.page');
        if (header && paper) {
            paper.style.height = (height - header.offsetHeight) + 'px';
        }

    }, [width, height]);

    useEffect(() => {
        if (id) {
            http.get(import.meta.env.VITE_APP_PATH + '/desaparecido/' + id).then((result) => {
                set(result);
                set(o => ({ ...o, nroDenuncia: result.nroDenuncia }));
                set(o => ({ ...o, regPolicial: result.dependencia.name }));
                set(o => ({ ...o, fechaHoraDenuncia: result.fechaHoraDenuncia }));
                set(o => ({ ...o, fechaHoraHecho: result.fechaHoraHecho }));
                set(o => ({ ...o, lugarHecho: result.lugarHecho }));
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
                set(o => ({ ...o, foto: result.persona.foto }));
                set(o => ({ ...o, distrito: result.distrito.distrito }));
                set(o => ({ ...o, provincia: result.distrito.provincia.provincia }));
                set(o => ({ ...o, departamento: result.distrito.provincia.departamento.departamento }));
            });
        }
    }, [id]);

    const fetchData = async () => {
        const result = await (http.get(import.meta.env.VITE_APP_PATH + '/desaparecido/' + id));
        if (result !== '') {
            console.log(result);
            setDesaparecidos(result);
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

    const onClickPrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Nota de Alerta impreso exitosamente.',
        onAfterPrint: () => dispatch({ type: "snack", msg: 'Reporte de Atenciones por Edad impreso.!' }),
    });

    return (
        <Container maxWidth="lg">
            <Box sx={{ width: '100%', textAlign: 'right', marginTop: '10px' }}>
                <Button className='hover-white' sx={{ marginRight: '5px' }} variant="contained" color="error" onClick={onClickPrint} startIcon={<Print />}>
                    IMPRIMIR
                </Button>
                <Button className='hover-white bg-teal' sx={{ marginLeft: '5px' }} variant="contained" color="success" href='http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php' target={'_blank'} startIcon={<FileDownload />}>
                    DESCARGAR
                </Button>
            </Box>
            <Card ref={componentRef} sx={{ minWidth: 275 }} className='mt-4'>
                <CardContent>
                    <Typography gutterBottom component="div" fontSize={'25px'} className='text-center fw-bold pt-2 mb-0' sx={{ textTransform: 'uppercase', color: 'red' }}>
                        NOTA DE ALERTA
                    </Typography>
                    <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold' sx={{ textTransform: 'uppercase' }}>
                        POLICIA NACIONAL DEL PERÚ
                    </Typography>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} className='p-3' sx={{ backgroundColor: '#a8a8a8' }}>
                            <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold' sx={{ textTransform: 'uppercase' }}>
                                DATOS DE LA DEPENDENCIA Y DENUNCIA POLICIAL
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                DEPENDENCIA POLICIAL :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.regPolicial}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                Nº DE LA DENUNCIA :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.nroDenuncia}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                FECHA :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {fechaHora(o.fechaHoraDenuncia)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className='p-3' sx={{ backgroundColor: '#a8a8a8' }}>
                            <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold' sx={{ textTransform: 'uppercase' }}>
                                DATOS DE LA PERSONA DESAPARECIDA
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} className='mt-3' sx={{ paddingLeft: '1rem' }}>
                            <img
                                alt="Foto"
                                height={'200px'}
                                width={'150px'}
                                src={o.foto ? 'data:image/png;base64, ' + o.foto : (import.meta.env.VITE_PUBLIC_URL + "/male-female.jpg")}
                                style={{ display: 'block', margin: '0 auto' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} className='mt-3' sx={{ paddingLeft: '1rem' }}>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    APELLIDOS :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {o.apePaterno} {o.apeMaterno}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    NOMBRES :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {o.nombres}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    EDAD :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {o.edad}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    FECHA DE NACIMIENTO :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {o.fechaNacimiento}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    FECHA DE HECHO :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {fechaHora(o.fechaHoraHecho)}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                    LUGAR DE HECHO :
                                </Typography>
                                <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                    {o.lugarHecho}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} className='mt-3'>
                            <Divider variant="middle" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className='mt-3' sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                CARACTERÍSTICAS :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                TEZ :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.tez}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                FENOTIPO :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.fenotipo}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                OJOS :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.ojos}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                SANGRE :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.sangre}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                BOCA :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.boca}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                NARIZ :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.nariz}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                CABELLO :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.cabello}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                ESTATURA :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.estatura}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} sx={{ paddingLeft: '1rem', display: 'flex' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                CONTEXTURA :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.contextura}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} className='mt-3'>
                            <Divider variant="middle" />
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} className='mt-3' sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold mb-0w' sx={{ textTransform: 'uppercase' }}>
                                SEÑAS PARTICULARES :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                VESTIMENTA :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.vestimenta}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} md={3} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                CIRCUNSTANCIAS :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={9} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.circunstancia}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} md={3} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                OTRAS OBSERVACIONES :
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={9} md={9} sx={{ paddingLeft: '1rem' }}>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.observacion}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className='p-3' sx={{ backgroundColor: '#a8a8a8' }}>
                            <Typography gutterBottom component="div" fontSize={'20px'} className='text-center fw-bold' sx={{ textTransform: 'uppercase' }}>
                                INFORMACIÓN ADICIONAL
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} sx={{ paddingLeft: '1rem', display: 'flex' }} className='mt-2'>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase' }}>
                                INSTRUCTOR POLICIAL :
                            </Typography>
                            <Typography gutterBottom component="div" fontSize={'16px'} className='fw-bold' sx={{ textTransform: 'uppercase', color: '#0f62ac' }}>
                                {o.observacion}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default AlertaDisabledExample;