import styled from '@emotion/styled';
import { List, ListItem } from '@mui/material';
import { memo } from 'react';

const StyledListItem = styled(ListItem)({
	listStyleType: 'disc',
	display: 'list-item',
});

function FormList() {
	return (
		<List sx={{ fontSize: '24px' }}>
			<StyledListItem>Każda osoba wpłaca do puli 150 zł</StyledListItem>
			<StyledListItem>
				Pula nagród (900 zł) rozdzielana jest między trzech zwycięzców:
				<StyledListItem>I miejsce: 400 zł</StyledListItem>
				<StyledListItem>II miejsce: 200 zł</StyledListItem>
				<StyledListItem>III miejsce: 100 zł</StyledListItem>
				Przy takiej samej liczbie punktów dwóch osób,które zajęły I miejsce: I
				miejsce:
				<StyledListItem>
					I miejsce: 600 zł (dzielone na dwie osoby)
				</StyledListItem>
				<StyledListItem>III miejsce: 100 zł</StyledListItem>
				Przy takiej samej liczbie punktów dwóch osób,które zajęły II miejsce:
				<StyledListItem>I miejsce: 400 zł</StyledListItem>
				<StyledListItem>
					II miejsce: 300 zł (dzielone na dwie osoby)
				</StyledListItem>
				Przy takiej samej liczbie punktów dwóch osób,które zajęły III miejsce:
				<StyledListItem>I miejsce: 400 zł</StyledListItem>
				<StyledListItem>II miejsce: 200 zł</StyledListItem>
				<StyledListItem>
					III miejsce 100 zł (dzielone na dwie osoby)
				</StyledListItem>
			</StyledListItem>
			<StyledListItem>
				Termin typowania:
				<StyledListItem>
					a) zwycięzca WorldCup2022, król strzelców, najlepszy piłkarz oraz
					złota rękawica: najpóźniej godzinę przed pierwszym gwizdkiem
					inaugurującego meczu Katar-Ekwador (20.11.2022, godz. 16:00:00)
				</StyledListItem>
				<StyledListItem>
					b) mecze fazy grupowej/pucharowej najpóźniej 1 godzinę przed
					rozpoczęciem pierwszego spotkania z danego dnia.
					<StyledListItem>
						typy meczów fazy grupowej są wpisywane bezpośrednio w aplikacje
						przez każdego gracza
					</StyledListItem>
				</StyledListItem>
			</StyledListItem>

			<StyledListItem>
				Sekretarz Rozgrywek Ograć Buka WorldCup2022: Grzesiu Zi
			</StyledListItem>

			<StyledListItem>
				Zmiany w regulaminie (poza punktem 6.) mogą zostać przeprowadzone przez
				Kapitułę Ograć Buka WorldCup2022:
				<StyledListItem>przed rozpoczęciem WorldCup2022</StyledListItem>
				<StyledListItem>reguła głosowania większościowego</StyledListItem>
				<StyledListItem>
					w trakcie WorldCup2022 reguła jednomyślności głosowania
				</StyledListItem>
			</StyledListItem>

			<StyledListItem>
				Kapituła Ograć Buka:
				<StyledListItem>Grzegorz Kęsicki</StyledListItem>
				<StyledListItem>Tadeusz Kubiak</StyledListItem>
				<StyledListItem>Bartosz Pawluk</StyledListItem>
				<StyledListItem>Konrad Sosna</StyledListItem>
				<StyledListItem>Ariel Stańczak</StyledListItem>
				<StyledListItem>Tomasz Stańczak</StyledListItem>
				<StyledListItem>Grzesiu Zi</StyledListItem>
			</StyledListItem>
		</List>
	);
}

export default memo(FormList);
