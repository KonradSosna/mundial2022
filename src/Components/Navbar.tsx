import styled from '@emotion/styled';
import { Box, Grid, List, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export const StyledLink = styled(Link)({
	color: 'black',
	textDecoration: 'none',
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
						bgcolor: 'background.paper',
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
							<ListItemButton
								sx={{
									fontWeight: selectedIndex === '/' ? 600 : 400,
								}}
								selected={selectedIndex === '/'}
								onClick={(event) => handleListItemClick(event, '/')}
							>
								Tabela wyników
							</ListItemButton>
						</StyledLink>

						<StyledLink to="/about-us">
							<ListItemButton
								sx={{
									fontWeight: selectedIndex === '/about-us' ? 600 : 400,
								}}
								selected={selectedIndex === '/about-us'}
								onClick={(event) => handleListItemClick(event, '/about-us')}
							>
								Obstaw mecz
							</ListItemButton>
						</StyledLink>
						{/* 
						<StyledLink to="/claim-report">
							<ListItemButton
								sx={{
									fontWeight: selectedIndex === '/claim-report' ? 600 : 400,
								}}
								selected={selectedIndex === '/claim-report'}
								onClick={(event) => handleListItemClick(event, '/claim-report')}
							>
								Claim report
							</ListItemButton>
						</StyledLink> */}

						<StyledLink to="/contact">
							<ListItemButton
								sx={{
									fontWeight: selectedIndex === '/contact' ? 600 : 400,
								}}
								selected={selectedIndex === '/contact'}
								onClick={(event) => handleListItemClick(event, '/contact')}
							>
								Regulamin
							</ListItemButton>
						</StyledLink>
					</List>
				</Box>
			</Grid>
		</Grid>
	);
};

export default Navbar;
