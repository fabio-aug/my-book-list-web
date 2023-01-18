import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';

const SnackbarContext = createContext();

function SnackbarProvider({ children }) {
	const [content, setContent] = useState(undefined);
	const [snackbarData, setSnackbarData] = useState({ open: false, message: '', onClose: () => { } });

	function open(content, data) {
		setContent(content);
		setSnackbarData({ ...data, open: true, onClose: close });
	}

	function close() {
		setSnackbarData(prevData => ({ ...prevData, open: false }));
	}

	return (
		<SnackbarContext.Provider value={{ open, close }}>
			{children}
			<Snackbar {...snackbarData}>{content}</Snackbar>
		</SnackbarContext.Provider>
	);
}

SnackbarProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { SnackbarContext, SnackbarProvider };
