import React, {useEffect, useState} from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Button
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {post} from "../../components/utils/Request";
import {IsDesktop} from "../../components/utils/IsDesktop";
import Paper from "@mui/material/Paper";
import {BudgetRow} from "../../components/BudgetRow";

const Budget = () => {
    const [renderRows, setRenderRows] = useState([]);
    const [applyType, setApplyType] = useState();
    const [applyDescription, setApplyDescription] = useState();
    const [applyAmount, setApplyAmount] = useState();
    const [applyTele, setApplyTele] = useState();
    const [isInvoiceRequired, setIsInvoiceRequired]
        = useState(false);

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsInvoiceRequired(event.target.checked);
    };
    const handleDescriptionChanged = (event:any) => {
        setApplyDescription(event.target.value);
    }

    const handleTypeChanged = (event:any) => {
        setApplyType(event.target.value);
    }

    const handleAmountChanged = (event:any) => {
        setApplyAmount(event.target.value);
    }

    function init() {
        post("/transaction/get-application-list",
            localStorage.getItem("v5_token")).then((res:any) => {
            if (res.status === 200) {
                setRenderRows(res.data.records.reverse());
            }
        })
    }

    useEffect(() => {
        init();
        getTele();
    }, [])

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleApply = () => {
        const data = {
            id: localStorage.getItem("v5_token"),
            description: applyDescription,
            type: applyType,
            amount: applyAmount,
            alipayTelephone: applyTele,
        }
        post('/transaction/apply', data).then((res:any) => {
            if (res.status === 200 && res.data.msg === "success") {
                alert("????????????");
                setOpen(false);
                navigate(0);
            } else {
                alert("????????????????????????????????????");
            }
        })
    };

    const isDesktop = IsDesktop();

    const type = [
        {
            value: '??????',
            label: '??????',
        },
        {
            value: '??????',
            label: '??????',
        },
    ];

    const method = [
        {
            value: '??????',
            label: '??????',
        },
        {
            value: '?????????',
            label: '?????????',
        },
    ];

    const time = [
        {
            value: '??????',
            label: '??????',
        },
        {
            value: '?????????',
            label: '?????????',
        },
        {
            value: '?????????',
            label: '?????????',
        },
    ];

    function handleTeleChanged(event:any) {
        setApplyAmount(event.target.value);
    }

    function getTele() {
        post("/member/tele",
            localStorage.getItem("v5_token")).then((res:any) => {
            if (res.status === 200) {
                setApplyTele(res.data.msg);
            }
        }).catch(() => {
            alert("????????????????????????????????????");
            navigate("/auth/login");
        })
    }

    return (
        <Box>
            {isDesktop ? <div/> :
                <Typography
                    align="center"
                    sx={{
                        fontFamily: "??????",
                        fontSize: 20,
                        fontWeight: "bold",
                        height: 32,
                        marginTop: 2
                    }}
                >????????????</Typography>
            }
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>????????????</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ????????? ????????????????????????100?????????????????????
                    </DialogContentText>
                    <TextField
                        id="????????????"
                        select
                        label="????????????"
                        defaultValue="??????"
                        size="small"
                        sx={{
                            margin: 3,
                            width: 120,
                        }}
                        value={applyType}
                        onChange={handleTypeChanged}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="????????????"
                        select
                        label="????????????"
                        defaultValue="??????"
                        size="small"
                        sx={{
                            margin: 3,
                            width: 120,
                        }}
                        value={applyType}
                        onChange={handleTypeChanged}
                    >
                        {type.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        sx={{
                            margin: 3,
                            fontWeight: "bold",
                        }}
                        variant="outlined"
                        onClick={() => {
                            navigate("/homepage/md?fileLink=Application.md&darkMode=false");
                        }}
                    >?????????????????????
                    </Button>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="???????????????"
                        fullWidth
                        variant="standard"
                        value={applyDescription}
                        onChange={handleDescriptionChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="????????????"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyAmount}
                        onChange={handleAmountChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="????????????????????????"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={applyTele}
                        onChange={handleTeleChanged}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            sx={{marginRight: 3, marginBottom: 3,fontSize: 16}
                            }>??????</Button>
                    <Button onClick={handleApply}
                            sx={{marginRight: 5, marginBottom: 3,fontSize: 16}
                            }>????????????</Button>
                </DialogActions>
            </Dialog>
            <Grid container spacing={1} sx={{textAlign: "center", marginY: 3}}>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="????????????"
                        select
                        label="????????????"
                        defaultValue="??????"
                        size="small"
                        sx={{}}
                    >
                        {method.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <TextField
                        disabled={true}
                        id="????????????"
                        select
                        label="????????????"
                        defaultValue="??????"
                        size="small"
                        sx={{}}
                    >
                        {time.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={4}>
                    <Button
                        variant="contained"
                        onClick={handleClickOpen}
                    >????????????</Button>
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            {isDesktop ?
                                <TableCell align="center">????????????</TableCell>
                                :
                                <div/>
                            }
                            <TableCell align="center">?????????</TableCell>
                            <TableCell align="center">??????</TableCell>
                            <TableCell align="center">??????</TableCell>
                            {isDesktop ?
                                <TableCell align="center">??????????????????</TableCell>
                                :
                                <div/>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderRows.map((row:any) => (
                            <BudgetRow key={row.name} row={row}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Budget;
