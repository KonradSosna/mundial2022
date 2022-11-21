import { Grid, TextField, Typography } from '@mui/material';
import { memo, useState } from 'react';
import Container from '../LandingPage/Partials/Container';
import FormButton from '../LandingPage/Partials/Button';
import { FieldValues, useForm } from 'react-hook-form';
import Flag from 'react-world-flags';
import { matches } from './matches';

function ObstawMecz() {
	const [score, setScore] = useState([0, 0]);
	const [edit, setEdit] = useState(false);
	const [index, setIndex] = useState(0);

	const { register, handleSubmit } = useForm();

	const submitForm = async (data: FieldValues) => {
		setScore([data.leftScore, data.rightScore]);
		setEdit(false);
	};

	console.log(index);

	return (
		<>
			<Container
				direction="column"
				devider
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
				devider
				sx={{ justifyContent: 'center', marginTop: '30px' }}
			>
				<Grid container direction="column" rowGap={6} alignItems="center">
					{matches.map((match) => (
						<form onSubmit={handleSubmit((data) => submitForm(data))}>
							<Grid
								key={match.id}
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
											style={{ width: '60px', height: '20px' }}
											type="number"
											inputProps={{ min: 0, max: 20 }}
										></TextField>
									) : (
										<Typography>{score[0]}</Typography>
									)}
								</Grid>
								<Grid item display="flex" alignItems="center">
									<Typography>-</Typography>
								</Grid>
								<Grid item display="flex" alignItems="center">
									{edit && index === match.id ? (
										<TextField
											{...register('rightScore', { required: true })}
											style={{ width: '60px', height: '20px' }}
											type="number"
											inputProps={{ min: 0, max: 20 }}
										></TextField>
									) : (
										<Typography marginRight="10px">{score[1]}</Typography>
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
			</Container>
		</>
	);
}

export default memo(ObstawMecz);
