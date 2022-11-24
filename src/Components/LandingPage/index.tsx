import {
	Grid,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	tableCellClasses,
	CircularProgress,
} from '@mui/material';
import Container from './Partials/Container';
import FormButton from './Partials/Button';
import Paper from '@mui/material/Paper';
import FootbalPitch from '../../Img/football-pitch.jpg';
import { StyledLink } from '../Navbar';
import { useState } from 'react';
import {
	collection,
	DocumentData,
	query,
	orderBy,
	onSnapshot,
} from 'firebase/firestore';
import { db } from '../../App';
import { motion } from 'framer-motion';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'black',
		color: 'white',
		fontSize: 24,
		fontWeight: 600,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 24,
		fontWeight: 600,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const styles = {
	paperContainer: {
		backgroundImage: `url(${FootbalPitch})`,
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		backgr: 'transparent',
		border: '1px solid white',
		borderRadius: '50px',
	},
};

const LandingPage = ({ isMobile }: { isMobile: boolean }) => {
	const [loading, setLoading] = useState(false);
	const [users, setUsers] = useState<DocumentData[]>([]);

	onSnapshot(
		query(collection(db, 'users'), orderBy('score', 'desc')),
		(snapshot) => {
			setLoading(true);
			const usersData = snapshot.docs.map((doc) => doc.data());
			setUsers(usersData);
			setLoading(false);
		}
	);

	return (
		<>
			<Container
				direction="column"
				sx={{
					backgroundColor: '#transparent',
					justifyContent: 'center',
					minHeight: '300px',
				}}
			>
				<motion.div animate={{ x: 0 }} initial={{ x: -300 }}>
					<Grid item>
						<Typography
							fontSize={40}
							fontWeight={600}
							textTransform="capitalize"
							textAlign="center"
							variant="h1"
						>
							Witam w Ograć Buka Qatar 2022!
						</Typography>
					</Grid>
				</motion.div>

				<motion.div animate={{ x: 0 }} initial={{ x: -300 }}>
					<Grid item>
						<StyledLink to="/obstaw-mecz">
							<FormButton text="Obstaw mecz" />
						</StyledLink>
					</Grid>
				</motion.div>
			</Container>

			<Container direction="row">
				<TableContainer component={Paper} style={styles.paperContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<StyledTableRow>
								<StyledTableCell align="center">Zawodnik</StyledTableCell>
								<StyledTableCell align="justify">Punkty</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<CircularProgress />
							) : (
								users.map((row) => (
									<StyledTableRow
										key={row.name}
										sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
									>
										<StyledTableCell align="center" component="th" scope="row">
											{`${row.name} ${row.surname}`}
										</StyledTableCell>
										<StyledTableCell align="justify">
											{row.score}
										</StyledTableCell>
									</StyledTableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<Grid>
					<Typography fontSize="24px">
						Typy innych graczy comming soon!
					</Typography>
				</Grid>
			</Container>
		</>
	);
};

export default LandingPage;
