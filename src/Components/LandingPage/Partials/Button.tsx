import LoadingButton from '@mui/lab/LoadingButton';
import { CSSProperties } from '@mui/styled-engine';
import { FC, memo } from 'react';
import { ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';

interface TButtonProps extends ButtonProps {
	text: string | any;
	variant?: 'contained' | 'outlined' | 'text';
	sx?: CSSProperties | any;
	onClick?: (v: any) => void;
	disable?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
	dontAnimate?: boolean;
}

const FormButton: FC<TButtonProps> = ({
	text,
	variant,
	sx,
	onClick,
	disable,
	loading,
	type,
	dontAnimate,
	...rest
}) => {
	return (
		<motion.div whileHover={{ scale: dontAnimate ? 1 : 1.1 }}>
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
					textTransform: 'uppercase',
					fontSize: '14px',
					border: '2px solid red',
					fontFamily: 'Poppins, sans-serif',
					color: '#fff',
					height: '50px',
					margin: '10px',
					textAlign: 'center',
					justifyContent: 'center',
					...sx,

					'&:hover': {
						backgroundColor: '#FF3838',
					},

					'&:disabled': {
						backgroundColor: '#574c4c',
						borderColor: '#a79c9c',
						color: 'gray',
					},
				}}
			>
				{text}
			</LoadingButton>
		</motion.div>
	);
};

export default memo(FormButton);
