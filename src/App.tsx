import Footer from './Components/Footer';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import ObstawMecz from './Components/ObstawMecz';
import Regulamin from './Components/Regulamin';
import Navbar from './Components/Navbar';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import NavbarMobile from './Components/NavbarMobile';
import FormButton from './Components/LandingPage/Partials/Button';

// import 'firebase/auth';
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
// import { useCollectionData } from 'react-firebase-hooks/firestore';
import GoogleIcon from '@mui/icons-material/Google';

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
		<Grid
			container
			direction="column"
			alignItems="center"
			justifyContent="space-evenly"
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
	);
};

export const SignOut = () => {
	return (
		authz.currentUser && (
			<Grid container>
				<Grid item>
					<FormButton
						text="Wyloguj"
						onClick={() => authz.signOut()}
						sx={{ fontSize: '16px', height: '50px', textTransform: 'uppercase' }}
					/>
				</Grid>
			</Grid>
		)
	);
};

function App() {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const user = useAuthState(authz);

	return (
		<div className="App">
			{user[0] ? (
				<>
					{!isMobile ? <Navbar /> : <NavbarMobile />}

					<Routes>
						<Route path="/" element={<LandingPage isMobile={isMobile} />} />
						<Route path="/obstaw-mecz" element={<ObstawMecz />} />
						<Route path="/regulamin" element={<Regulamin />} />
					</Routes>

					<Footer isMobile={isMobile} />
				</>
			) : (
				<SignIn />
			)}
		</div>
	);
}

export default App;
