import React, { useState, useContext } from 'react';
import {
    Typography, Avatar,
    Menu, MenuItem, Tooltip
} from '@mui/material';

import { Mask } from 'modules';
import { useHistory, useAuth } from 'hooks';
import { GoToButton, ButtonAvatar } from './Desktop.styles';
import { GlobalContext } from 'providers/global/GlobalProvider';

function Desktop() {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const { isAuthenticated, getUser, signOut } = useAuth();
    const { setLogin, setRegister } = useContext(GlobalContext);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(undefined);
    };

    function signOutButton() {
        handleClose();
        signOut();
    }

    const user = getUser();

    return (
        <React.Fragment>
            <GoToButton variant='text' onClick={() => history.redirectTo('/home')}>
                Início
            </GoToButton>
            <GoToButton variant='text' onClick={() => history.redirectTo('/listagem-de-livros')}>
                Livros
            </GoToButton>
            {isAuthenticated ? (
                <>
                    <Tooltip title="Opções">
                        <ButtonAvatar onClick={handleClick}>
                            <Avatar
                                src={Mask.formatBase64(user.photo)}
                                className='avatar'
                                alt="Foto do usuário"
                            />
                        </ButtonAvatar>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        open={Boolean(anchorEl)}
                    >
                        <MenuItem onClick={() => history.redirectTo(`/perfil-do-usuario/${user.idUser}`)}>
                            <Typography textAlign="center">Perfil</Typography>
                        </MenuItem>
                        <MenuItem onClick={signOutButton}>
                            <Typography textAlign="center">Sair</Typography>
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <GoToButton variant='contained' onClick={() => setRegister(true)}>
                        Cadastrar
                    </GoToButton>
                    <GoToButton variant='text' onClick={() => setLogin(true)}>
                        Entrar
                    </GoToButton>
                </>
            )}
        </React.Fragment>
    );
}

export default Desktop;
