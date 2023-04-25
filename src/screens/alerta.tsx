import { useEffect, useState, useRef, createRef } from 'react';
import { Box, Button, Grid, CardContent } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useFormState, useResize, http } from 'gra-react-utils';
import Card from '@mui/material/Card';
import { FileDownload, Print } from '@mui/icons-material';
import { useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { useReactToPrint } from 'react-to-print';
import { useDispatch } from "react-redux";

function AlertaDisabledExample() {


    const formRef: any = createRef();

    const viewRef: any = createRef();

    const componentRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    const { id } = useParams();

    const [o, { set }] = useFormState(useState, {});

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
                set((o: any) => ({ ...o, nroDenuncia: result.nroDenuncia }));
                set((o: any) => ({ ...o, regPolicial: result.dependencia.name }));
                set((o: any) => ({ ...o, fechaHoraDenuncia: result.fechaHoraDenuncia }));
                set((o: any) => ({ ...o, fechaHoraHecho: result.fechaHoraHecho }));
                set((o: any) => ({ ...o, lugarHecho: result.lugarHecho }));
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