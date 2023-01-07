import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { loginsys } from '../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';

const Login = () => {

    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const dispatch = useDispatch();

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [username, setusername] = useState("");
    const list = useSelector((state) => state.loginreducer.list)
    const Username = (e) => {

        setusername(e.target.value);
    }
    const Emailfield = (e) => {

        setemail(e.target.value);
    }
    const Passwordfield = (e) => {
        setpassword(e.target.value)
    }
    const submitlogin = (e) => {
        e.preventDefault();
        dispatch(loginsys(email, password, username))
    }
    const persistedState = localStorage.getItem('data')
        ? JSON.parse(localStorage.getItem('data'))
        : {}
    let local_data = persistedState.loginreducer.list

    const login = () => {
        if (list) {

            let check = local_data.map(user => {
                console.log("user==", user.password)
                if (username === user.username && password === user.password) {

                    return navigate('/search')
                }
                else {
                    return navigate('/')
                }
            })

        }
    }
    return (
        <Container maxWidth="sx">
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Login" value="1" />
                            <Tab label="Sign Up" id="signup" value="2" />

                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <TextField label="UserName" variant="outlined" />
                        <br /><br /><br />

                        <TextField label="Password" variant="outlined" type="password" />

                        <br /><br /><br />
                        <Button variant="contained" onClick={login}>Login</Button>

                        <br /><br />
                        <label htmlFor="">Do you have An Account?</label>
                        <Link href="#Sign Up">Sign Up</Link>
                    </TabPanel>
                    <TabPanel value="2">
                        <TextField label="UserName" variant="outlined" value={username} onChange={Username} />
                        <br /><br /><br />
                        <TextField label="Email" variant="outlined" value={email} onChange={Emailfield} type="email" />
                        <br /><br /><br />
                        <TextField label="Password" variant="outlined" value={password} onChange={Passwordfield} required type="password" />
                        <br /><br /><br />
                        <Button variant="contained" onClick={submitlogin}>Sign Up</Button>
                        <br /><br />
                        <label htmlFor="">You have Already an Account?</label>
                        <Link href="">Login</Link>
                    </TabPanel>
                </TabContext>
            </Box>
        </Container>

    )
}
export default Login;