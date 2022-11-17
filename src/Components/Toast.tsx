import { Grid } from '@mui/material';
import { FC, memo } from 'react';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';

type TExpenseReportProps = {
	message: string;
	open: boolean;
	onClose: () => void;
	toastType: 'success' | 'error';
};

const Toast: FC<TExpenseReportProps> = ({
	message,
	open,
	onClose,
	toastType,
}) => {
	setTimeout(() => {
		onClose();
	}, 10000);

	return open ? (
		<Grid
			direction="row"
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				position: 'absolute',
				bottom: 30,
				left: 20,
				backgroundColor: '#ecf7ed',
				padding: '10px 70px',
				borderRadius: '10px',
			}}
			aria-live="polite"
		>
			<Grid item marginRight="20px">
				{toastType === 'success' ? <DoneAllIcon /> : <ErrorIcon />}
			</Grid>
			<Grid item role="status">
				{message}
			</Grid>
		</Grid>
	) : null;
};

export default memo(Toast);
