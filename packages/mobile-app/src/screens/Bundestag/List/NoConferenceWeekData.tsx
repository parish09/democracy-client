import React from 'react';
import styled from 'styled-components/native';
import { useQuery } from '@apollo/react-hooks';
import { CURRENT_CONFERENCE_WEEK } from './graphql/query/currentConferenceWeek';
import { CurrentConferenceWeek } from './graphql/query/__generated__/CurrentConferenceWeek';
import dateFormat from 'dateformat';
import SvgConferenceWeekPlaceholder from '@democracy-deutschland/mobile-ui/src/components/Icons/ConferenceWeekPlaceholder';
import { Space } from '../../modals/Verification/Start';

const Container = styled.ScrollView.attrs({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
})``;

const Text = styled.Text`
  font-size: 15;
  text-align: center;
  padding-horizontal: 18;
  padding-bottom: 11;
`;

const TextGrey = styled(Text)`
  color: #9b9b9b;
`;

const Bold = styled.Text`
  font-weight: bold;
`;

const IconWrapper = styled.View`
  align-items: center;
`;

export const NoConferenceWeekData = () => {
  const { data } = useQuery<CurrentConferenceWeek>(CURRENT_CONFERENCE_WEEK);
  return (
    <Container testID={'NoConferenceWeekData'}>
      <IconWrapper>
        <SvgConferenceWeekPlaceholder width={150} height={150} color="#000" />
      </IconWrapper>
      <Space />
      <Text>
        Es liegen derzeit <Bold>{'noch keine\nAbstimmungsdaten'}</Bold> vor.
      </Text>
      {!!data && (
        <TextGrey>
          {`Die nächste Sitzungswoche findet gemäß Sitzungswochenkalender in KW ${data.currentConferenceWeek.calendarWeek}
(`}
          {dateFormat(data.currentConferenceWeek.start, 'dd.mm.yyyy')} –{' '}
          {dateFormat(data.currentConferenceWeek.end, 'dd.mm.yyyy')}
          {`)
statt.`}
        </TextGrey>
      )}
    </Container>
  );
};
