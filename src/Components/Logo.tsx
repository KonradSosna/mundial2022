import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { StyledLink } from './Navbar';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';

const StyledTypography = styled(Typography)`
	font-weight: 700;
	font-size: 40px;
`;

function Logo() {
	const location = useLocation();

	return (
		<StyledLink
			to="/"
			style={{
				cursor: location.pathname === '/insurance' ? 'default' : 'pointer',
			}}
		>
			<Grid
				container
				gap={2}
				alignItems="center"
				justifyContent="center"
				color="white"
			>
				<StyledTypography variant="caption">Ograć Buka</StyledTypography>
				<StyledTypography variant="caption" style={{ color: '#FF3838' }}>
					Qatar 2022
				</StyledTypography>
				<SportsSoccerIcon color="inherit" />
			</Grid>
		</StyledLink>
	);
}

export default Logo;
