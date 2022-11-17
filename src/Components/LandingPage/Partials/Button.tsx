import LoadingButton from '@mui/lab/LoadingButton';
import { CSSProperties } from '@mui/styled-engine';
import { FC, memo } from 'react';

type TButtonProps = {
	text: string;
	variant?: 'contained' | 'outlined' | 'text';
	sx?: CSSProperties | any;
	onClick?: (v: any) => void;
	disable?: boolean;
	loading?: boolean;
	type?: 'button' | 'submit' | 'reset';
};

const FormButton: FC<TButtonProps> = ({
	text,
	variant,
	sx,
	onClick,
	disable,
	loading,
	type,
}) => {
	return (
		<LoadingButton
			loading={loading}
			onClick={onClick}
			type={type}
			disabled={disable}
			variant={variant ? variant : 'contained'}
			sx={{
				backgroundColor: 'black',
				width: '200px',
				height: '50px',
				textTransform: 'capitalize',
				fontSize: '15px',
				...sx,

				'&:hover': {
					backgroundColor: 'gray',
					color: 'white',
				},
			}}
		>
			{text}
		</LoadingButton>
	);
};

export default memo(FormButton);
