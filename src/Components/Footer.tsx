import { Grid, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from './LandingPage/Partials/Container';
import Logo from './Logo';
import { StyledLink } from './Navbar';

function Footer({ isMobile }: { isMobile: boolean }) {
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
		<Container
			className="footer"
			sx={{
				backgroundColor: '#8A1538',
				justifyContent: 'space-around',
				minHeight: '200px',
			}}
			direction={isMobile ? 'column' : 'row'}
		>
			<Grid
				item
				xs={5}
				sx={{
					justifyContent: 'center',
					height: '100%',
					paddingLeft: '70px',
				}}
			>
				<Logo />
			</Grid>

			<Grid item xs={5}>
				<Grid
					container
					gap={3}
					justifyContent="center"
					direction={isMobile ? 'column' : 'row'}
					flexWrap="nowrap"
				>
					<Grid item>
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
					</Grid>
					<Grid item>
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
					</Grid>
					<Grid item>
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
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Footer;
