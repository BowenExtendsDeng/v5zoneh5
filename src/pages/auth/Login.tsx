import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useNavigate} from "react-router-dom/";
import {IsDesktop} from "../../components/utils/IsDesktop";
import React from "react";
import {post} from "../../components/utils/Request"


function Login() {

    const navigate = useNavigate();
    const isDesktop = IsDesktop();

    const [showPassword, setShowPassword] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [usernameInvalid, setUsernameInvalid] = React.useState(false);
    const [passwordInvalid, setPasswordInvalid] = React.useState(false);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    const handleCloseBackdrop = () => {
        setOpenBackDrop(false);
    };
    const handleToggleBackdrop = () => {
        setOpenBackDrop(true);
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setUsername(event.target.value);
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value);

    const handleClickShowPassword = () =>
        setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onClickLogin = () => {
        handleToggleBackdrop();

        localStorage.setItem("v5_token", "undefined");
        post("/auth/authenticate", {"id": username,"password": password}).then(((res:any) => {
            if (res.status === 200) {
                localStorage.setItem('v5_token', res.data.token);
                console.log(res.data.token);
                localStorage.setItem('v5_id', res.data.id);
                console.log(res.data.id);
                localStorage.setItem('v5_contact_tech', "??????");
                localStorage.setItem('v5_contact_college', "??????");
                localStorage.setItem('v5_contact_session', "??????");
                navigate("/homepage");
            }
        })).catch(() => {
            alert("???????????????????????????")
        })

        handleCloseBackdrop();
    }

    return (
        <Box
            sx={{
                width: 480 > window.innerWidth ? 0.83 * window.innerWidth : 480,
                height: 400,
                backgroundColor: '#ffffff',
                opacity: 0.85,
                borderRadius: 5,
            }}
        >
            <Stack>
                <Box sx={{
                    marginRight: 2
                }}>
                    <Typography
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            fontFamily: "??????",
                            fontWeight: "bold",
                            fontSize: 24,
                        }}
                    >
                        <img src={require("../../assets/v5logo.png")}
                             style={{
                                 width: 70,
                                 height: 30,
                                 marginRight: 10,
                             }}
                             alt={'v5logo'}>
                        </img>
                        V5 Zone ??????
                    </Typography>
                </Box>
                <TextField
                    required
                    id="outlined-required"
                    label={usernameInvalid ? "??????????????????????????????" : "??????"}
                    sx={{
                        margin: 3,
                        height: 40
                    }}
                    error={usernameInvalid}
                    value={username}
                    onChange={handleUsernameChange}
                />
                <FormControl
                    required={true}
                    sx={{
                        margin: 3,
                    }}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">??????</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        error={passwordInvalid}
                        label={passwordInvalid ? "??????????????????????????????" : "??????"}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </FormControl>
                <Grid
                    container spacing={2}
                    sx={{
                        marginLeft: 4,
                        justifyContent: "left",
                    }}
                >
                    <Grid>
                        <FormControlLabel
                            control={<Checkbox defaultChecked/>}
                            label="?????????"
                            sx={{
                                marginX: 1,
                                marginTop: 1,
                                height: 18,
                            }}
                        />
                    </Grid>
                    {isDesktop ?
                        <Grid>
                            <Button
                                sx={{
                                    fontWeight: "bold",
                                    font: 18,
                                }}
                                variant="text"
                                onClick={() => {
                                    if (isDesktop) {
                                        navigate('../registry')
                                    } else return (
                                        alert("????????????????????????")
                                    )
                                }}
                            >???????????????</Button>
                        </Grid>
                        :
                        <Grid xs={2}/>
                    }
                    <Grid>
                        <Button
                            sx={{
                                fontWeight: "bold",
                                font: 18,
                            }}
                            variant="text"
                            onClick={() => {
                                navigate('../reset')
                            }}
                        >
                            ???????????????
                        </Button>
                    </Grid>
                </Grid>
                <Box sx={{textAlign: "center"}}>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: isDesktop ? 120 : 100,
                        }}
                        variant="contained"
                        onClick={onClickLogin}
                    >??????</Button>
                    <Button
                        sx={{
                            margin: 3,
                            textAlign: "center",
                            width: isDesktop ? 120 : 100,
                            fontWeight: "bold",
                        }}
                        disabled={true}
                        variant="outlined"
                        onClick={onClickLogin}
                    >????????????</Button>
                </Box>
            </Stack>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={openBackDrop}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    );
};

export default Login;
