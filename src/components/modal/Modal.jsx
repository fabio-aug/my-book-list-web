import React from 'react';
import PropTypes from "prop-types";
import { Close as CloseIcon } from '@mui/icons-material/';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

import { IconButton } from './Modal.style';

function Modal({ title, open, onClose, content, actions, ...rest }) {
	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="modal"
			{...rest}
		>
			<DialogTitle id="modal-title">
				{title}
				<IconButton aria-label="modal-close" onClick={onClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			{content && (
				<DialogContent>
					{content}
				</DialogContent>
			)}
			{actions && (
				<DialogActions>
					{actions}
				</DialogActions>
			)}
		</Dialog>
	);
}

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	content: PropTypes.node,
	actions: PropTypes.node
};

export default Modal;