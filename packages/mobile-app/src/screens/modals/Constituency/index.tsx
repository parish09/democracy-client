import React, { useState, useContext } from 'react';
import { Alert, Platform, FlatList } from 'react-native';

import SearchIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Lens';
// constituencies plz list
import constituenciesList from './constituencies-list.json';
import constituencies from '../../Bundestag/Procedure/components/svgs/constituencies';
import { Constituency } from './constituencyData';
import { ConstituencyContext } from '../../../context/Constituency';
import { styled } from '../../../styles/index';
import { RouteProp, useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../../routes';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.main};
`;

const SearchBox = styled.View`
  height: 44;
  background-color: ${({ theme }) => theme.colors.background.header};
`;

const SearchInputWrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5.5;
  flex-direction: row;
  align-items: center;
  padding-left: 6;
  height: 15;
  margin-horizontal: 8;
  margin-vertical: 8;
`;

const SearchInputIcon = styled(SearchIcon).attrs(() => ({
  color: '#7a797b',
  width: 16,
  height: 16,
}))``;

const SearchInput = styled.TextInput.attrs(() => ({
  clearButtonMode: 'always',
  autoFocus: true,
  placeholderTextColor: '#7a797b',
  underlineColorAndroid: 'transparent',
  selectionColor: '#000',
  returnKeyType: 'search',
  autoCorrect: false,
}))`
  flex: 1;
  font-size: 14;
  height: ${Platform.OS === 'ios' ? 28 : 50};
  padding-horizontal: 6;
  color: #000;
`;

const FlatListWrapper = styled.View``;

const Title = styled.Text`
  font-size: 17;
`;

const Plz = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15;
  color: ${({ theme }) => theme.textColors.secondary};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 12;
  padding-horizontal: 12;
  border-bottom-color: #bcbbc1;
  border-bottom-width: 0.5;
  align-items: center;
`;

// const SelectedConstituencyIcon = styled(Ionicons).attrs(() => ({
//   color: '#16c063',
//   size: 23,
//   name: 'ios-checkmark-circle',
// }))`
//   position: absolute;
//   left: 50;
//   bottom: 10;
// `;

const RowTextWrapper = styled.View`
  flex: 1;
  padding-left: 12;
`;

const Checkmark = styled.Text`
  color: #16c063;
  font-size: 18;
  font-weight: bold;
  margin-left: 8;
`;

type ConstituencScreenRouteProp = RouteProp<RootStackParamList, 'Constituency'>;

interface Props {
  route: ConstituencScreenRouteProp;
}

export const ConstituencyScreen: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const { constituency, setConstituency } = useContext(ConstituencyContext);
  const [term, setTerm] = useState('');

  const onChangePlz = (newTerm: string) => {
    setTerm(newTerm);
  };

  const getConstituency = (wk: string) => {
    const DynComp = constituencies(wk);
    return (
      <DynComp.default
        width={60}
        height={36}
        childProps={{ fill: 'none', stroke: '#000', strokeWidth: '2%' }}
      />
    );
  };

  const getPlz = (item: Constituency) => {
    const areacodes = item.areacodes.map(({ code }) => code.padStart(5, '0'));
    areacodes.sort((x, y) => {
      return x.indexOf(term) !== -1 ? -1 : y.indexOf(term) !== -1 ? 1 : 0;
    });
    return areacodes.join(', ');
  };

  const selectConstituency = (item: Constituency) => () => {
    Alert.alert(
      'Bestätigung des Wahlkreises',
      `WK: ${item.number}: ${item.name}\n Ist diese Auswahl korrekt?`,
      [
        { text: 'Nein', onPress: () => undefined },
        {
          text: 'Ja',
          onPress: () => {
            setConstituency(item.number);
            route.params && route.params.goBack
              ? navigation.goBack()
              : undefined;
          },
        },
      ],
      { cancelable: false },
    );
  };

  const constituenciesArray = [...constituenciesList.constituencies];
  let constituenciesData = constituenciesArray.map(constituencyData => {
    let selected = false;
    if (constituencyData.number === constituency) {
      selected = true;
    }
    return { ...constituencyData, selected };
  });

  const selectedConstituency = constituenciesData.find(data => {
    return data.selected;
  });

  constituenciesData =
    term.length > 0
      ? constituenciesData.filter(({ areacodes, name, selected, number }) => {
          // remove starting zeros from search term
          const termCode = `${parseInt(term, 10)}`;
          return (
            (areacodes.some(({ code }) => code.indexOf(termCode) === 0) ||
              name.toLowerCase().indexOf(term.toLowerCase()) !== -1 ||
              number === term) &&
            !selected
          );
        })
      : constituenciesData.filter(({ selected }) => !selected);

  if (selectedConstituency) {
    constituenciesData = [selectedConstituency, ...constituenciesData];
  }

  return (
    <Wrapper>
      <SearchBox>
        <SearchInputWrapper>
          <SearchInputIcon />
          <SearchInput placeholder="PLZ eingeben" onChangeText={onChangePlz} />
        </SearchInputWrapper>
      </SearchBox>
      <FlatListWrapper>
        <FlatList
          data={constituenciesData}
          renderItem={({ item }) => {
            return (
              <Row onPress={selectConstituency(item)}>
                <>
                  {getConstituency(item.number)}
                  <RowTextWrapper>
                    <Title>{item.name}</Title>
                    <Plz>
                      {`Wahlkreis ${item.number}: `}
                      {getPlz(item)}
                    </Plz>
                  </RowTextWrapper>
                  {item.selected && <Checkmark>{'\u2713'}</Checkmark>}
                </>
              </Row>
            );
          }}
          keyExtractor={item => item.number}
        />
      </FlatListWrapper>
    </Wrapper>
  );
};
