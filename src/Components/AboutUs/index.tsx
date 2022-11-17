import { Grid, Typography } from '@mui/material';
import { memo } from 'react';
import Container from '../LandingPage/Partials/Container';

function AboutUs() {
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
					about us
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
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis error
					corporis explicabo labore nobis ea cum doloremque dolorem!
				</Typography>
			</Grid>
		</Container>
	);
}

export default memo(AboutUs);
