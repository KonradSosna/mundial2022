import { lazy, Suspense } from 'react';
import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import { CircularProgress, Grid, useMediaQuery, useTheme } from '@mui/material';
import NavbarMobile from './Components/NavbarMobile';
import FormButton from './Components/LandingPage/Partials/Button';
import { motion } from 'framer-motion';

import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logo from './Components/Logo';
import GoogleIcon from '@mui/icons-material/Google';
import Container from './Components/LandingPage/Partials/Container';

const ObstawMecz = lazy(() => import('./Components/ObstawMecz'));
const Regulamin = lazy(() => import('./Components/Regulamin'));

const app = initializeApp({
	apiKey: 'AIzaSyBwMGQeuUtnIat0IEfSF1q_gB20wm875Ds',
	authDomain: 'mundial2022-2922a.firebaseapp.com',
	projectId: 'mundial2022-2922a',
	storageBucket: 'mundial2022-2922a.appspot.com',
	messagingSenderId: '1086627670843',
	appId: '1:1086627670843:web:9e14a7c6ce6c9e1050251e',
	measurementId: 'G-SXFE8MZ8QD',
});

export const db = getFirestore(app);
export const authz = getAuth(app);

onAuthStateChanged(authz, (user) => {
	if (user) {
		console.log('user logged in: ', user);
	} else {
		console.log('user logged out');
	}
});

const SignIn = () => {
	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(authz, provider);
	};

	return (
		<motion.div
			animate={{ scale: 1 }}
			initial={{ scale: 0 }}
			transition={{ duration: 1 }}
		>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="space-evenly"
				minWidth={window.innerWidth}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			>
				<Grid item margin="30px">
					<Logo />
				</Grid>

				<Grid item margin="30px">
					<FormButton
						text="Sign in"
						onClick={signInWithGoogle}
						endIcon={<GoogleIcon />}
					/>
				</Grid>
			</Grid>
		</motion.div>
	);
};

export const SignOut = () => {
	return (
		authz.currentUser && (
			<Grid item>
				<FormButton
					text="Wyloguj"
					onClick={() => authz.signOut()}
					sx={{
						fontSize: '16px',
						textTransform: 'uppercase',
						width: '-webkit-fill-available',
						height: '50px',
						margin: '10px',
					}}
				/>
			</Grid>
		)
	);
};

const FallbackComponent = () => {
	return (
		<Container
			direction="column"
			sx={{
				backgroundColor: 'transparent',
				justifyContent: 'center',
				minHeight: '70vh',
			}}
		>
			<CircularProgress />
		</Container>
	);
};

function App() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const [user, loading] = useAuthState(authz);

	return (
		<div className="App">
			{loading ? (
				<Container
					direction="column"
					sx={{
						backgroundColor: 'transparent',
						justifyContent: 'center',
						minHeight: '100vh',
					}}
				>
					<CircularProgress />
				</Container>
			) : user ? (
				<>
					{!isMobile ? <Navbar /> : <NavbarMobile />}

					<Suspense fallback={<FallbackComponent />}>
						<Routes>
							<Route path="/" element={<LandingPage isMobile={isMobile} />} />
							<Route
								path="/obstaw-mecz"
								element={<ObstawMecz isMobile={isMobile} />}
							/>
							<Route path="/regulamin" element={<Regulamin />} />
						</Routes>
					</Suspense>

					<Footer isMobile={isMobile} />
				</>
			) : (
				<Container
					direction="column"
					sx={{
						backgroundColor: 'transparent',
						justifyContent: 'center',
						minHeight: '100vh',
					}}
				>
					<SignIn />
				</Container>
			)}
		</div>
	);
}

export default App;
