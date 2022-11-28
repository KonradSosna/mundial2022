import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FormButton from './LandingPage/Partials/Button';

function ScrollToTop({ dontAnimate }: { dontAnimate?: boolean }) {
	return (
		<FormButton
			text={<KeyboardDoubleArrowUpIcon />}
			onClick={() => window.scrollTo(0, 0)}
			sx={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 100 }}
			dontAnimate
		/>
	);
}

export default ScrollToTop;
