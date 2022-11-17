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
			<StyledListItem>List item #1</StyledListItem>
			<StyledListItem>List item #2</StyledListItem>
			<StyledListItem>List item #3</StyledListItem>
		</List>
	);
}

export default memo(FormList);
