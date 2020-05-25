import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from '..';
import { theme } from '../../styles';
import DonationButton from '../../screens/Sidebar/Donate/DonationButton';

export type DonateStackParamList = {
  Donate: undefined;
};

const DonateStack = createStackNavigator<DonateStackParamList>();

type DonateNavigationProps = StackNavigationProp<RootStackParamList>;

const DonateNavigation = () => {
  return (
    <DonateStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: '#fff',
      }}>
      <DonateStack.Screen
        name="Donate"
        component={DonationButton}
        options={{
          title: 'Wahl-O-Meter',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </DonateStack.Navigator>
  );
};

export default DonateNavigation;
