import React, {useState} from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import * as Yup from 'yup';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch} from "react-redux";
import {Alert, Stack} from "@mui/material";
import {createMinistry, getAllMinstries} from "../store/actions/ministry_actions";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                www.ega.go.tz
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Schema = Yup.object({
    name: Yup.string().required().trim(),
    shortCode: Yup.string().required().trim(),
    // email: Yup.string().required().email().trim(),
    // Uncomment the following lines if you want to include password and confirm password fields
    // password: Yup.string().required().min(6),
    // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

export default function RegisterMinistry() {

    const navigate =  useNavigate();
    const dispatch = useDispatch();

    const [succeed, setSucceed]  =  useState(false);
    const [failed, setFailed] = useState(false);

    const {control, handleSubmit,reset, formState,setError,isSubmitSuccesful} =  useForm({
        resolver :yupResolver(Schema)
    });
    const onSubmit = async (data) => {

        try {

            // Dispatch the signInUser action
            const response = await dispatch(createMinistry(data));
            // console.log(data)

            setTimeout(() =>{
                reset({
                    name : "",
                    shortCode : "",

                })
            },500)

            const newToken = response.payload;
            // console.log(newToken);
            if (newToken?.data?.active) {
                setSucceed(true)
                setFailed(false)

                setTimeout(() => {
                    setSucceed(false);
                    dispatch(getAllMinstries())
                },3000)

            } else {
                setFailed(true)
                setSucceed(false);

                setTimeout(() => {
                    setFailed(false)
                },4000)
            }
        } catch (error){
            console.log(error)
        }



    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xl">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >

                    <Stack>
                        {
                            succeed ? <Alert severity="success">Ministry Created Successful.</Alert> : <></>
                        }
                        {
                            failed ? <Alert severity="error">Request failed please try again.</Alert>  : <></>
                        }

                    </Stack>

                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        {/*<img src={report_icon} style={{width: '100%', height: '100%', objectFit: 'cover'}}/>*/}
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register Ministry
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                        {/*<Grid container spacing={2}>*/}
                                <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({field,fieldState})=>(
                                        <TextField
                                            {...field}
                                            autoComplete="given-name"
                                            name="name"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Ministry name"
                                            autoFocus
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message}
                                            sx={{mt : 1}}
                                        />
                                    )}
                                />


                                <Controller
                                    name="shortCode"
                                    control={control}
                                    defaultValue=""
                                    render={({field,fieldState}) =>(
                                        <TextField
                                            {...field}
                                            required
                                            fullWidth
                                            id="shortCode"
                                            label="Short Code"
                                            autoComplete="family-name"
                                            autoFocus
                                            error={Boolean(fieldState.error)}
                                            helperText={fieldState.error?.message}
                                            sx={{mt:3}}
                                        />
                                    )}
                                />



                            {/*<Grid container spacing={1} my={2} ml={1} >*/}
                            {/*    <Grid item xs={12} sm={6} mt={-2} >*/}
                            {/*        <Controller*/}
                            {/*            name="email"*/}
                            {/*            control={control}*/}
                            {/*            defaultValue=""*/}
                            {/*            render={({field, fieldState}) =>(*/}
                            {/*                <TextField*/}
                            {/*                    {...field}*/}
                            {/*                    margin="normal"*/}
                            {/*                    required*/}
                            {/*                    fullWidth*/}
                            {/*                    label="Email Address"*/}
                            {/*                    autoComplete="email"*/}
                            {/*                    autoFocus*/}
                            {/*                    error={Boolean(fieldState.error)}*/}
                            {/*                    helperText={fieldState.error?.message}*/}
                            {/*                />*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item xs={12} sm={6} >*/}
                            {/*        <Controller*/}
                            {/*            name="phone"*/}
                            {/*            control={control}*/}
                            {/*            defaultValue=""*/}
                            {/*            render={({field,fieldState}) =>(*/}
                            {/*                <TextField*/}
                            {/*                    {...field}*/}
                            {/*                    required*/}
                            {/*                    fullWidth*/}
                            {/*                    id="phone"*/}
                            {/*                    label="Telephone"*/}
                            {/*                    autoComplete="telephone"*/}
                            {/*                    autoFocus*/}
                            {/*                    error={Boolean(fieldState.error)}*/}
                            {/*                    helperText={fieldState.error?.message}*/}
                            {/*                />*/}
                            {/*            )}*/}
                            {/*        />*/}
                            {/*    </Grid>*/}
                            {/*</Grid>*/}

                        {/*</Grid>*/}


                        <Grid item xs={12}>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container justifyContent="flex-end">

                        </Grid>
                        {/*</Grid>*/}

                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}
