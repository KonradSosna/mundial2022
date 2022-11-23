import {
	CircularProgress,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { memo, useState } from 'react';
import Container from '../LandingPage/Partials/Container';
import FormButton from '../LandingPage/Partials/Button';
import { FieldValues, useForm } from 'react-hook-form';
import Flag from 'react-world-flags';
import { matches } from './matches';
import {
	collection,
	doc,
	setDoc,
	DocumentData,
	query,
	onSnapshot,
	where,
} from 'firebase/firestore';
import { db, authz } from '../../App';
import { useAuthState } from 'react-firebase-hooks/auth';
import { isAfter } from 'date-fns';

function ObstawMecz({ isMobile }: { isMobile: boolean }) {
	const [edit, setEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [bets, setBets] = useState<DocumentData[]>();
	const [loading, setLoading] = useState(false);

	const StyledTextField = {
		width: '60px',
		border: '1px solid #FF3838',
		borderRadius: '15px',
		backgroundColor: 'rgba(165, 48, 58, 0.7)',

		'& .MuiInputBase-input': {
			color: 'white',
		},

		'&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},

		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			border: 'none',
		},
	};

	const user = useAuthState(authz);
	const { register, handleSubmit } = useForm();

	const submitForm = async (data: FieldValues, matchId: number) => {
		const bet = {
			uid: user[0]?.uid,
			matchId: matchId,
			leftTeam: data.leftScore,
			rightTeam: data.rightScore,
		};

		await setDoc(
			doc(db, 'bets', `${user[0]?.displayName} ${matchId.toString()}`),
			bet
		);
		setEdit(false);
	};

	onSnapshot(
		query(collection(db, 'bets'), where('uid', '==', user[0]?.uid)),
		(snapshot) => {
			setLoading(true);
			const usersData = snapshot.docs.map((doc) => doc.data());
			setBets(usersData);
			setLoading(false);
		}
	);

	return (
		<>
			<Container
				direction="column"
				sx={{
					justifyContent: 'center',
					minHeight: '200px',
				}}
			>
				<Grid item>
					<Typography
						fontSize={40}
						fontWeight={600}
						textTransform="capitalize"
						variant="h1"
					>
						Obstaw Mecz
					</Typography>
				</Grid>
			</Container>
			<Container
				direction="column"
				sx={{ justifyContent: 'center', marginTop: '30px' }}
			>
				<Grid container direction="column" rowGap={6}>
					{matches.map((matchGroup) => (
						<>
							<Divider style={{ backgroundColor: 'white' }} />
							<Grid
								container
								direction={isMobile ? 'column-reverse' : 'row'}
								alignItems="center"
								justifyContent="space-evenly"
								className="match"
							>
								<Grid item>
									<Grid container direction="column" rowGap={4}>
										{matchGroup.map((match) => (
											<form
												key={match.id}
												onSubmit={handleSubmit((data) =>
													submitForm(data, match.id)
												)}
											>
												<Grid
													container
													justifyContent="center"
													alignItems="center"
													sx={{
														maxWidth: '600px',
														height: '80px',
													}}
													direction="row"
													spacing={2}
												>
													<Grid item display="flex" alignItems="center">
														<Typography>{match.leftTeam}</Typography>
														<Flag
															code={match.leftFlag}
															fallback={<span>Unknown</span>}
															height="16"
															style={{ margin: '10px' }}
														/>
														{edit && index === match.id ? (
															<TextField
																{...register('leftScore', { required: true })}
																sx={StyledTextField}
																type="number"
																inputProps={{ min: 0, max: 20 }}
																defaultValue={
																	bets?.find((bet) => bet.matchId === match.id)
																		?.leftTeam
																}
															/>
														) : (
															<Typography>
																{loading ? (
																	<CircularProgress />
																) : (
																	bets?.find((bet) => bet.matchId === match.id)
																		?.leftTeam || 0
																)}
															</Typography>
														)}
													</Grid>
													<Grid item display="flex" alignItems="center">
														<Typography>-</Typography>
													</Grid>
													<Grid item display="flex" alignItems="center">
														{edit && index === match.id ? (
															<TextField
																{...register('rightScore', { required: true })}
																sx={StyledTextField}
																type="number"
																inputProps={{ min: 0, max: 20 }}
																defaultValue={
																	bets?.find((bet) => bet.matchId === match.id)
																		?.rightTeam
																}
															/>
														) : (
															<Typography marginRight="10px">
																{loading ? (
																	<CircularProgress />
																) : (
																	bets?.find((bet) => bet.matchId === match.id)
																		?.rightTeam || 0
																)}
															</Typography>
														)}
														<Flag
															code={match.rightFlag}
															fallback={<span>Unknown</span>}
															height="16"
															style={{ margin: '10px' }}
														/>
														<Typography>{match.rightTeam}</Typography>
													</Grid>
													<Grid item>
														{!edit && (
															<FormButton
																disable={isAfter(
																	new Date(),
																	new Date(match.dateTime)
																)}
																text="Edytuj"
																sx={{
																	height: '30px',
																	fontSize: '16px',
																}}
																onClick={() => {
																	setEdit(true);
																	setIndex(match.id);
																}}
															/>
														)}
														{edit && index === match.id && (
															<FormButton
																text="Obstaw"
																sx={{
																	width: '80px',
																	height: '30px',
																	fontSize: '16px',
																}}
																type="submit"
															/>
														)}
													</Grid>
												</Grid>
											</form>
										))}
									</Grid>
								</Grid>
								<Grid item>
									<Typography fontWeight={600} fontSize="24px">
										{matchGroup[0].date}
									</Typography>
								</Grid>
							</Grid>
						</>
					))}
				</Grid>
			</Container>
			<Divider style={{ backgroundColor: 'white', margin: '30px 0' }} />
		</>
	);
}

export default memo(ObstawMecz);
