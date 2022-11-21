import { Grid, Typography } from '@mui/material';
import { memo } from 'react';
import Container from '../LandingPage/Partials/Container';
import List from './Partials/List';

function Regulamin() {
	return (
		<Container
			direction="column"
			devider
			sx={{
				justifyContent: 'center',
			}}
		>
			<Grid item>
				<Typography
					fontSize={40}
					fontWeight={600}
					textTransform="capitalize"
					variant="h1"
				>
					Regulamin Ograć Buka World Cup 2022
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					fontSize={20}
					fontWeight={500}
					textAlign="center"
					maxWidth="700px"
					variant="h2"
				>
					<List />
				</Typography>
			</Grid>
		</Container>
	);
}

export default memo(Regulamin);
