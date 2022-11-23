import LoadingButton from '@mui/lab/LoadingButton';
import { CSSProperties } from '@mui/styled-engine';
import { FC, memo } from 'react';
import { ButtonProps } from '@mui/material';

interface TButtonProps extends ButtonProps {
	text: string;
	variant?: 'contained' | 'outlined' | 'text';
	sx?: CSSProperties | any;
	onClick?: (v: any) => void;
	disable?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

const FormButton: FC<TButtonProps> = ({
	text,
	variant,
	sx,
	onClick,
	disable,
	loading,
	type,
	...rest
}) => {
	return (
		<LoadingButton
			loading={loading}
			onClick={onClick}
			type={type}
			disabled={disable}
			variant={variant ? variant : 'contained'}
			{...rest}
			sx={{
				backgroundColor: 'transparent',
				padding: '0 20px',
				fontWeight: '700',
				textTransform: 'capitalize',
				fontSize: '26px',
				border: '2px solid red',
				fontFamily: 'Poppins, sans-serif',
				color: '#fff !important',
				...sx,

				'&:hover': {
					backgroundColor: '#FF3838',
				},
			}}
		>
			{text}
		</LoadingButton>
	);
};

export default memo(FormButton);
