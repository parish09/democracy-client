import React, { useContext, ReactNode } from 'react';
import { SectionList } from 'react-native';

// GraphQL
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsRootStackParamList } from '../../routes/Sidebar/Settings';
import { ConstituencyContext } from '../../context/Constituency';
import { InitialStateContext } from '../../context/InitialStates';
import { Segment } from '../Bundestag/List/Components/Segment';
import { ListItem } from './components/ListItem';
import { useNavigation } from '@react-navigation/core';
import { styled } from '../../styles';
import { NavigationContext } from '../../context/Navigation';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  flex: 1;
`;

const Text = styled.Text`
  font-size: 17;
  margin-right: auto;
`;

type FilterScreenNavigationProp = StackNavigationProp<
  SettingsRootStackParamList,
  'Settings'
>;

interface ListData {
  title: string;
  text?: string;
  arrow?: boolean;
  onPress: () => void;
  component?: ReactNode;
  description?: string;
  testID?: string;
}

interface List {
  title: string;
  data: ListData[];
}

type Props = {
  navigation: FilterScreenNavigationProp;
};

export const Settings: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { constituency } = useContext(ConstituencyContext);
  const { isVerified } = useContext(InitialStateContext);
  const { saveState } = useContext(NavigationContext);

  const navigateTo = (screen: string) => () => {
    switch (screen) {
      case 'constituency':
        navigation.navigate('Constituency');
        break;
      case 'verificate':
        saveState();
        navigation.navigate('VerificationStart');
        break;

      default:
        break;
    }
  };

  const listData: List[] = [
    {
      title: '',
      data: [
        {
          title: 'Status',
          text:
            isVerified === true
              ? 'Verifiziert'
              : isVerified === false
              ? 'Verifizieren'
              : '…',
          arrow: isVerified === false,
          onPress:
            isVerified === false ? navigateTo('verificate') : () => undefined,
          testID: isVerified === false ? 'Verifizieren' : 'Verifiziert',
        },
        {
          title: 'Wahlkreis',
          text: `WK ${constituency}`,
          onPress: navigateTo('constituency'),
          arrow: true,
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <SectionList<ListData>
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            text={item.text}
            description={item.description}
            arrow={item.arrow}
            onPress={item.onPress}
            component={item.component}
            testID={item.testID}>
            <Text>{item.title}</Text>
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Segment text={title} />
        )}
        sections={listData}
        keyExtractor={item => item.title}
      />
    </Wrapper>
  );
};
