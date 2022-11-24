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
import { isAfter, isBefore, isSameDay } from 'date-fns';
import { matches } from '../ObstawMecz/matches';
import Flag from 'react-world-flags';
import { endOfDay } from 'date-fns/esm';

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
	const [bets, setBets] = useState<DocumentData[]>();

	onSnapshot(
		query(collection(db, 'users'), orderBy('score', 'desc')),
		(snapshot) => {
			setLoading(true);
			const usersData = snapshot.docs.map((doc) => doc.data());
			setUsers(usersData);
			setLoading(false);
		}
	);

	onSnapshot(query(collection(db, 'bets')), (snapshot) => {
		setLoading(true);
		const usersData = snapshot.docs.map((doc) => doc.data());
		setBets(usersData);
		setLoading(false);
	});

	const todayMatches = matches.filter(
		(match) =>
			match.filter((m) => isSameDay(new Date(), new Date(m.dateTime))).length >
			0
	);
	const todayMatchesFiltered = [...todayMatches[0]];

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
			</Container>

			<Container direction="column">
				<Typography fontSize="34px" fontWeight="600" margin="30px">
					Tak obstawiali
				</Typography>

				{isAfter(new Date(), new Date(todayMatchesFiltered[0].dateTime)) &&
				isBefore(
					new Date(),
					endOfDay(new Date(todayMatchesFiltered[0].dateTime))
				) ? (
					users.map((user) => (
						<Grid
							key={user.id}
							container
							justifyContent="space-evenly"
							alignItems="center"
							borderBottom="1px solid white"
						>
							<Grid item>
								<Typography fontSize="24px">
									{user.name} {`"${user.nick}"`} {user.surname}
								</Typography>
							</Grid>
							<Grid item>
								{todayMatchesFiltered.map((match) => (
									<Grid
										item
										key={match.id}
										display="flex"
										alignItems="center"
										margin="10px"
									>
										<Typography>{match.leftTeam}</Typography>
										<Flag
											code={match.leftFlag}
											fallback={<span>Unknown</span>}
											height="16"
											style={{ margin: '10px' }}
										/>
										<Typography margin="0 10px">
											{bets?.find(
												(bet) => bet.uid === user.id && match.id === bet.matchId
											)?.leftTeam || 'N/A'}
										</Typography>
										<Typography>{'-'}</Typography>
										<Typography margin="0 10px">
											{bets?.find(
												(bet) => bet.uid === user.id && match.id === bet.matchId
											)?.rightTeam || 'N/A'}
										</Typography>
										<Flag
											code={match.rightFlag}
											fallback={<span>Unknown</span>}
											height="16"
											style={{ margin: '10px' }}
										/>
										<Typography>{match.rightTeam}</Typography>
									</Grid>
								))}
							</Grid>
						</Grid>
					))
				) : (
					<Typography fontSize="34px" fontWeight="600" margin="30px">
						soon...
						<CircularProgress />
					</Typography>
				)}
			</Container>
		</>
	);
};

export default LandingPage;
