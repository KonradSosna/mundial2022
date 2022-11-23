import Container from './LandingPage/Partials/Container';
import Navbar from './Navbar';

function Footer({ isMobile }: { isMobile: boolean }) {
	return (
		<Container
			className="footer"
			sx={{
				backgroundColor: 'transparent',
				justifyContent: 'space-around',
				minHeight: '300px',
			}}
			direction={isMobile ? 'column' : 'row'}
		>
			<Navbar isMobile={isMobile} />
		</Container>
	);
}

export default Footer;
