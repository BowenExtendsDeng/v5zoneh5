import {
    Divider,
    Box,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList
} from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LockResetIcon from "@mui/icons-material/LockReset";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import {useNavigate} from "react-router-dom";
import ProfileDesktop from "./desktop/ProfileDesktop";
import {IsDesktop} from "./utils/IsDesktop";
import ProfileMobile from "./mobile/ProfileMobile";
import {ResetPasswordMobile} from "./mobile/ResetPasswordMobile";
import ResetPasswordDesktop from "./desktop/ResetPasswordDesktop";

interface HeaderProps {
    setAnchorEl: Function,
    anchorEl: any,
    open: boolean,
}

export const HeaderMenu: React.FC<HeaderProps> = (props) => {

    const [profileDesktop, setProfileDesktop] = React.useState(false);
    const [passwordDesktop, setPasswordDesktop] = React.useState(false);
    const {open, anchorEl, setAnchorEl} = props;
    const navigate = useNavigate();
    const isDesktop = IsDesktop();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        navigate("/auth/login");
    }

    const onViewProfile = () => {
        if(isDesktop){
            setProfileDesktop(true);
        }else{
            navigate("/homepage/profile");
        }
    }

    const onSetAvatar = () => {

    }

    const onResetPassword = () => {
        if(isDesktop){
            setPasswordDesktop(true);
        }else{
            navigate("/homepage/reset-password");
        }
    }

    return (
        <Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList>
                    <MenuItem onClick={onSetAvatar}>
                        <ListItemIcon>
                            <CenterFocusWeakIcon fontSize="small"/>
                        </ListItemIcon>
                        {/* eslint-disable-next-line react/jsx-no-undef */}
                        <ListItemText>
                            ????????????&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={onViewProfile}>
                        <ListItemIcon>
                            <AccountBoxIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>????????????</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={onResetPassword}>
                        <ListItemIcon>
                            <LockResetIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>????????????</ListItemText>
                    </MenuItem>
                    <Divider/>
                    <MenuItem onClick={onLogout}>
                        <ListItemIcon>
                            <LogoutIcon color="error" fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText color="error">????????????</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
            {
                isDesktop ?
                    <ProfileDesktop
                        open={profileDesktop}
                        setOpen={setProfileDesktop}
                        setMenuClose={handleClose}
                    />
                    :
                    <ProfileMobile/>
            }
            {
                isDesktop ?
                    <ResetPasswordDesktop
                        open={passwordDesktop}
                        setOpen={setPasswordDesktop}
                        setMenuClose={handleClose}
                    />
                    :
                    <ResetPasswordMobile/>
            }
        </Box>
    );
};
