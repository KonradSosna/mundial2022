import {
	Box,
	CircularProgress,
	Divider,
	FormControl,
	Grid,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { memo, useEffect, useRef, useState } from 'react';
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
import { isAfter, isToday } from 'date-fns';
import ScrollToTop from '../ScrollToTop';

function ObstawMecz({ isMobile }: { isMobile: boolean }) {
	const [edit, setEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [bets, setBets] = useState<DocumentData[]>();
	const [loading, setLoading] = useState(false);
	const [loadingSubmit, setLoadingSubmit] = useState(false);

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
	const { register, handleSubmit, resetField, watch } = useForm();

	const winner = watch('winner');
	const leftScore = watch('leftScore');
	const rightScore = watch('rightScore');

	const submitForm = async (data: FieldValues, matchId: number) => {
		await setLoadingSubmit(true);
		const bet = {
			uid: user[0]?.uid,
			matchId: matchId,
			leftTeam: data.leftScore,
			rightTeam: data.rightScore,
			winner: data.leftScore === data.rightScore ? data.winner : null,
			photo: user[0]?.photoURL,
		};

		await setDoc(
			doc(db, 'bets', `${user[0]?.displayName} ${matchId.toString()}`),
			bet
		);
		await setLoadingSubmit(false);

		resetField('leftScore');
		resetField('rightScore');
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

	const myRef = useRef(null);
	const executeScroll = (myRef: any) => {
		if (myRef && myRef.current)
			myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	useEffect(() => {
		executeScroll(myRef);
	}, [myRef]);

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
					<Grid item>
						<Typography
							fontSize={40}
							fontWeight={600}
							textTransform="capitalize"
							variant="h1"
							textAlign="center"
						>
							1/4 Finału
						</Typography>
					</Grid>
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
														minHeight: '80px',
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
																	bets?.find((bet) => bet.matchId === index)
																		?.leftTeam || 0
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
																		?.rightTeam || 0
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
													<Grid item display="flex" alignItems="center">
														{leftScore === rightScore ? (
															<>
																<Typography>Awans:</Typography>
																{edit && index === match.id ? (
																	<Box sx={{ minWidth: 120, color: 'white' }}>
																		<FormControl fullWidth>
																			<Select
																				labelId="demo-simple-select-label"
																				id="demo-simple-select"
																				value={winner}
																				label="Age"
																				{...register('winner')}
																				sx={StyledTextField}
																				style={{
																					width: '80px',
																					marginLeft: '10px',
																				}}
																			>
																				<MenuItem value={match.leftFlag}>
																					<Flag
																						code={match.leftFlag}
																						fallback={<span>Unknown</span>}
																						height="16"
																					/>
																				</MenuItem>
																				<MenuItem value={match.rightFlag}>
																					<Flag
																						code={match.rightFlag}
																						fallback={<span>Unknown</span>}
																						height="16"
																					/>
																				</MenuItem>
																			</Select>
																		</FormControl>
																	</Box>
																) : bets?.find(
																		(bet) => bet.matchId === match.id
																  )?.winner ? (
																	<Flag
																		code={
																			bets?.find(
																				(bet) => bet.matchId === match.id
																			)?.winner || ''
																		}
																		fallback={<span>Unknown</span>}
																		height="16"
																		style={{ margin: '10px' }}
																	/>
																) : null}
															</>
														) : null}
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
																	fontSize: '16px',
																	minWidth: '80px',
																	height: '30px',
																}}
																loading={loadingSubmit}
																type="submit"
																startIcon={
																	loadingSubmit && (
																		<CircularProgress color="info" size={20} />
																	)
																}
															/>
														)}
													</Grid>
												</Grid>
											</form>
										))}
									</Grid>
								</Grid>
								<Grid
									item
									ref={isToday(new Date(matchGroup[0].dateTime)) ? myRef : null}
								>
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
			<ScrollToTop />
		</>
	);
}

export default memo(ObstawMecz);
