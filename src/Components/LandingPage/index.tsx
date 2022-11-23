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
} from '@mui/material';
import Container from './Partials/Container';
import FormButton from './Partials/Button';
import Paper from '@mui/material/Paper';
import FootbalPitch from '../../Img/football-pitch.jpg';
import { StyledLink } from '../Navbar';

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
	const rows = [
		{ name: 'Konrad Sosna', points: 100 },
		{ name: 'Tomasz Stańczak', points: 100 },
		{ name: 'Grzesiu Kę', points: 100 },
		{ name: 'Grzesiu Zi', points: 100 },
		{ name: 'Ariel Stańczak', points: 100 },
		{ name: 'Tadeusz Kubiak', points: 100 },
		{ name: 'Porky', points: 100 },
	];

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

				<Grid item>
					<StyledLink to="/obstaw-mecz">
						<FormButton text="Obstaw mecz" />
					</StyledLink>
				</Grid>
			</Container>

			<Container direction="row">
				<TableContainer component={Paper} style={styles.paperContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<StyledTableRow>
								<StyledTableCell align="center">Zawodnik</StyledTableCell>
								<StyledTableCell align="left">Punkty</StyledTableCell>
							</StyledTableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<StyledTableRow
									key={row.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<StyledTableCell align="center" component="th" scope="row">
										{row.name}
									</StyledTableCell>
									<StyledTableCell align="left">{row.points}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>
		</>
	);
};

export default LandingPage;
