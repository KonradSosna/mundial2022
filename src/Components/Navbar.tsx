import styled from '@emotion/styled';
import { Box, Grid, List, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SignOut } from '../App';
import Logo from './Logo';

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

const Navbar = () => {
	const location = useLocation();
	const [selectedIndex, setSelectedIndex] = useState(location.pathname);

	useEffect(() => {
		setSelectedIndex(location.pathname);
	}, [location]);

	const handleListItemClick = (
		_event: React.MouseEvent<HTMLDivElement, MouseEvent>,
		index: string
	) => {
		setSelectedIndex(index);
	};
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
							flexDirection: 'row',
							fontWeight: 500,
						}}
					>
						<StyledLink to="/">
							<StlyedListItemButton
								selected={selectedIndex === '/'}
								onClick={(event) => handleListItemClick(event, '/')}
							>
								Tabela wyników
							</StlyedListItemButton>
						</StyledLink>

						<StyledLink to="/obstaw-mecz">
							<StlyedListItemButton
								sx={{
									fontWeight: selectedIndex === '/obstaw-mecz' ? 600 : 400,
								}}
								selected={selectedIndex === '/obstaw-mecz'}
								onClick={(event) => handleListItemClick(event, '/obstaw-mecz')}
							>
								Obstaw mecz
							</StlyedListItemButton>
						</StyledLink>

						<StyledLink to="/regulamin">
							<StlyedListItemButton
								sx={{
									fontWeight: selectedIndex === '/regulamin' ? 600 : 400,
								}}
								selected={selectedIndex === '/regulamin'}
								onClick={(event) => handleListItemClick(event, '/regulamin')}
							>
								Regulamin
							</StlyedListItemButton>
						</StyledLink>

						<SignOut />
					</List>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Navbar;
