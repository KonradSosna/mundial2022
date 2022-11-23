import {
	CircularProgress,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import Container from '../LandingPage/Partials/Container';
import FormButton from '../LandingPage/Partials/Button';
import { FieldValues, useForm } from 'react-hook-form';
import Flag from 'react-world-flags';
import { matches } from './matches';
import {
	collection,
	getDocs,
	doc,
	setDoc,
	DocumentData,
} from 'firebase/firestore';
import { db, authz } from '../../App';
import { useAuthState } from 'react-firebase-hooks/auth';
import { isAfter } from 'date-fns';

function ObstawMecz() {
	const [edit, setEdit] = useState(false);
	const [index, setIndex] = useState(0);
	const [bets, setBets] = useState<DocumentData[]>();
	const [loading, setLoading] = useState(false);

	const user = useAuthState(authz);
	const { register, handleSubmit } = useForm();

	const submitForm = async (data: FieldValues, matchId: number) => {
		const bet = {
			uid: user[0]?.uid,
			matchId: matchId,
			leftTeam: data.leftScore,
			rightTeam: data.rightScore,
		};
		// console.log(bet);

		await setDoc(
			doc(db, 'bets', `${user[0]?.displayName} ${matchId.toString()}`),
			bet
		);
		setEdit(false);
		getCities().then((betsData) => {
			setBets(betsData);
		});
	};

	async function getCities() {
		await setLoading(true);
		const betsCol = collection(db, 'bets');

		const betsSnapshot = await getDocs(betsCol);
		const betsList = betsSnapshot.docs.map((doc) => doc.data());

		await setLoading(false);

		return betsList;
	}

	useEffect(() => {
		getCities()
			.then((betsData) => {
				setBets(betsData);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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
							<Divider style={{backgroundColor: 'white'}} />
							<Grid
								container
								direction="row"
								alignItems="center"
								justifyContent="space-evenly"
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
														border: '1px solid black',
														width: '500px',
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
																style={{ width: '60px' }}
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
																style={{ width: '60px' }}
																type="number"
																inputProps={{ min: 0, max: 20 }}
																defaultValue={
																	bets?.find((bet) => bet.matchId === match.id)
																		?.rightTeam
																}
															></TextField>
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
																sx={{ width: '20px', height: '25px' }}
																onClick={() => {
																	setEdit(true);
																	setIndex(match.id);
																}}
															/>
														)}
														{edit && index === match.id && (
															<FormButton
																text="Obstaw"
																sx={{ width: '20px', height: '25px' }}
																type="submit"
															/>
														)}
													</Grid>
												</Grid>
											</form>
										))}
									</Grid>
								</Grid>
								<Grid item>{matchGroup[0].date}</Grid>
							</Grid>
						</>
					))}
				</Grid>
			</Container>
		</>
	);
}

export default memo(ObstawMecz);
