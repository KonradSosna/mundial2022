import styled from '@emotion/styled';
import { Box, Grid, List, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { SignOut } from '../App';
import Logo from './Logo';
import FormButton from './LandingPage/Partials/Button';

export const StyledLink = styled(Link)({
	color: 'black',
	textDecoration: 'none',
});

export const StlyedListItemButton = styled(ListItemButton)({
	backgroundColor: 'transparent',
	padding: '0 20px',
	fontWeight: '700',
	textTransform: 'uppercase',
	fontSize: '16px',
	border: '2px solid red',
	fontFamily: 'Poppins, sans-serif',
	color: '#fff !important',
	height: '50px',
	margin: '0 10px',
	textAlign: 'center',

	'&:hover': {
		backgroundColor: '#FF3838',
	},
});

const Navbar = ({ isMobile }: { isMobile?: boolean }) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="space-around"
			height="70px"
			alignItems="center"
			flexWrap="nowrap"
		>
			<Grid item sx={{ minWidth: '250px' }}>
				<Logo />
			</Grid>

			<Grid item>
				<Box
					sx={{
						width: '100%',
						maxWidth: 500,
					}}
				>
					<List
						component="nav"
						aria-label="main navigation bar"
						sx={{
							display: 'flex',
							flexDirection: isMobile ? 'column' : 'row',
							fontWeight: 500,
						}}
					>
						<StyledLink to="/">
							<FormButton text={'Tabela wyników'} />
						</StyledLink>

						<StyledLink to="/obstaw-mecz">
							<FormButton text={'Obstaw mecz'} />
						</StyledLink>

						<StyledLink to="/regulamin">
							<FormButton text={'Regulamin'} />
						</StyledLink>

						<SignOut />
					</List>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Navbar;
