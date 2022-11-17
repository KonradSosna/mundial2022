import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLink } from './Navbar';
import { useLocation } from 'react-router-dom';

type Anchor = 'left';

function NavbarMobile() {
	const [state, setState] = useState({
		left: false,
	});
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

	const toggleDrawer =
		(anchor: Anchor, open: boolean) =>
		(event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List
				component="nav"
				aria-label="main navigation bar"
				sx={{
					display: 'flex',
					flexDirection: 'column',
					fontWeight: 500,
					fontSize: '1.5rem',
				}}
			>
				<StyledLink to="/">
					<ListItemButton
						sx={{ fontWeight: selectedIndex === '/insurance' ? 600 : 400 }}
						selected={selectedIndex === '/insurance'}
						onClick={(event) => handleListItemClick(event, '/insurance')}
					>
						Insurance
					</ListItemButton>
				</StyledLink>

				<StyledLink to="/about-us">
					<ListItemButton
						sx={{ fontWeight: selectedIndex === '/about-us' ? 600 : 400 }}
						selected={selectedIndex === '/about-us'}
						onClick={(event) => handleListItemClick(event, '/about-us')}
					>
						About us
					</ListItemButton>
				</StyledLink>

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
				</StyledLink>

				<StyledLink to="/contact">
					<ListItemButton
						sx={{ fontWeight: selectedIndex === '/contact' ? 600 : 400 }}
						selected={selectedIndex === '/contact'}
						onClick={(event) => handleListItemClick(event, '/contact')}
					>
						Contact
					</ListItemButton>
				</StyledLink>
			</List>
		</Box>
	);

	return (
		<div>
			<Button onClick={toggleDrawer('left', true)} sx={{ color: 'black' }}>
				<MenuIcon fontSize="large" />
			</Button>
			<Drawer
				anchor={'left'}
				open={state['left']}
				onClose={toggleDrawer('left', false)}
			>
				{list('left')}
			</Drawer>
		</div>
	);
}

export default NavbarMobile;
