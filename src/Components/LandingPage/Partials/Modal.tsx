import { FC } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, Typography } from '@mui/material';

const style = {
	position: 'absolute' as 'absolute',
	textAlign: 'center',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: '#f02718',
	border: '2px solid #000',
	borderRadius: 8,
	boxShadow: 24,
	p: 4,
	color: 'black',
};
type BasicModalProps = {
	open: boolean;
	handleClose: () => void;
};

export const BasicModal: FC<BasicModalProps> = ({ open, handleClose }) => {
	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Grid item>
						<Typography fontSize="20px" fontWeight="600">
							The winner is:
						</Typography>
					</Grid>
					<Grid item>
						<Typography fontSize="24px" fontWeight="600" margin="20px 0">
							Tadeusz 'TEDE' Kubiak!
						</Typography>
					</Grid>
					<Grid item>
						<iframe
							title="celebrating"
							src="https://giphy.com/embed/aLLZP2AiOCsPLYgi7G"
							width="480"
							height="480"
							frameBorder="0"
							className="giphy-embed"
							allowFullScreen
						></iframe>
					</Grid>
				</Box>
			</Modal>
		</div>
	);
};
