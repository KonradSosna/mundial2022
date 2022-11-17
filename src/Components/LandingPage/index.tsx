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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontSize: 24,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 20,
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
		width: '700px',
	},
};

const LandingPage = ({ isMobile }: { isMobile: boolean }) => {
	function createData(name: string, points: number) {
		return { name, points };
	}

	const rows = [
		createData('Konrad Sosna', 100),
		createData('Tomasz Stańczak', 0),
		createData('Grzesiu Kę', 0),
		createData('Grzesiu Zi', 0),
		createData('Ariel Stańczak', 0),
		createData('Tadeusz Kubiak', 0),
		createData('Porky', 0),
	];

	return (
		<>
			<Container
				direction="column"
				sx={{
					backgroundColor: 'green',
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
						Witam w Ograć Buka Qatar 2022
					</Typography>
				</Grid>
				{/* <Grid item>
					<Typography fontSize={20} fontWeight={500} maxWidth="700px">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis
						error corporis explicabo labore nobis ea cum doloremque dolorem!
					</Typography>
				</Grid> */}
				<Grid item>
					<FormButton text="Obstaw mecz" />
				</Grid>
			</Container>

			<Container direction="row">
				<TableContainer component={Paper} style={styles.paperContainer}>
					<Table aria-label="simple table">
						<TableHead>
							<StyledTableRow>
								<StyledTableCell align="center">Zawodnik</StyledTableCell>
								<StyledTableCell align="center">Punkty</StyledTableCell>
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
									<StyledTableCell align="center">{row.points}</StyledTableCell>
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
