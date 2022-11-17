import { Grid } from '@mui/material';
import { memo } from 'react';

const Box = ({ text }: { text: string }) => {
	return (
		<Grid item>
			<Grid
				container
				direction="column"
				gap={4}
				width="300px"
				alignItems="center"
			>
				<Grid
					item
					sx={{
						width: '250px',
						height: '250px',
						backgroundColor: 'black',
					}}
				></Grid>
				<Grid
					item
					sx={{
						textTransform: 'capitalize',
						fontSize: '20px',
						flexWrap: 'wrap',
					}}
				>
					{text}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default memo(Box);
