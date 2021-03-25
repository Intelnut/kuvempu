import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';

import useAuth from '../../context/Auth';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -8,
        marginLeft: -8,
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [credentials, setCredentials] = useState({
        email_id: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const { login } = useAuth();

    const handleChange = (e) => {
        const newFormData = {
            ...credentials,
            [e.target.name]: e.target.value,
        }
        setCredentials(newFormData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        let response = await login(credentials);
        setLoading(false);
        if (response.error) {
            setError(response.error);
        }
    };

    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Login in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email_id'
                        label='Email Address'
                        name='email_id'
                        type='email'
                        autoComplete='email'
                        autoFocus
                        value={credentials.email_id}
                        onChange={handleChange}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    <div className={classes.wrapper}>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            disabled={loading}
                        >
                            Sign In
                        </Button>
                        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                    {error && <Alert elevation={6} variant='filled' severity='error'>{error}</Alert>}
                    {/**
                     <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot password?
                            </Link>
                        </Grid>
                    </Grid>
                     */}

                </form>
            </div>
        </Container>
    );
}