import React, { useState, useContext } from 'react';
import {
    SwipeableDrawer, Divider,
    ListItemButton, IconButton,
    ListItem, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { List } from './Mobile.styles';
import { useHistory, useAuth } from 'hooks';
import { GlobalContext } from 'providers/global/GlobalProvider';

function Mobile() {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const { isAuthenticated, getUser, signOut } = useAuth();
    const { setLogin, setRegister } = useContext(GlobalContext);

    function signOutButton() {
        setOpen(false);
        signOut();
    }

    function redirect(goTo) {
        setOpen(false);
        history.redirectTo(goTo)
    }

    const user = getUser();

    return (
        <React.Fragment>
            <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
            </IconButton>

            <SwipeableDrawer
                open={open}
                anchor='right'
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
            >
                <List className='list'>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => redirect('/home')}>
                            <ListItemText primary="Início" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => redirect('/listagem-de-livros')}>
                            <ListItemText primary="Livros" />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    {isAuthenticated ? (
                        <React.Fragment>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => redirect(`/perfil-do-usuario/${user.idUser}`)}>
                                    <ListItemText primary="Perfil" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => signOutButton()}>
                                    <ListItemText primary="Sair" />
                                </ListItemButton>
                            </ListItem>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setOpen(false);
                                    setLogin(true)
                                }}>
                                    <ListItemText primary="Entrar" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton onClick={() => {
                                    setOpen(false);
                                    setRegister(true)
                                }}>
                                    <ListItemText primary="Cadastrar" />
                                </ListItemButton>
                            </ListItem>
                        </React.Fragment>
                    )}
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default Mobile;
