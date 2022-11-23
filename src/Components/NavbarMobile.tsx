import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledLink } from './Navbar';
import { useLocation } from 'react-router-dom';
import { SignOut } from '../App';
import { ListItemButton } from '@mui/material';
import styled from '@emotion/styled';

type Anchor = 'left';

export const StlyedListItemButton = styled(ListItemButton)({
	backgroundColor: 'transparent',
	padding: '0 20px',
	fontWeight: '700',
	textTransform: 'uppercase',
	fontSize: '16px',
	border: '2px solid red',
	fontFamily: 'Poppins, sans-serif',
	color: '#fff',
	height: '50px',
	margin: '10px',
	textAlign: 'center',
	justifyContent: 'center',
});

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
			sx={{
				width: 250,
				backgroundColor: 'rgba(6, 5, 28, 0.7)',
				height: '100%',
			}}
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
	);

	return (
		<div>
			<Button onClick={toggleDrawer('left', true)} sx={{ color: '#FF3838' }}>
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
