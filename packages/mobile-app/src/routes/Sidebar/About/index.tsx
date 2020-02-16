import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import styled from 'styled-components/native';
import { theme } from '../../../styles';
import { AboutScreen } from '../../../screens/modals/About';

export type AboutRootStackParamList = {
  About: undefined;
};

const AboutRootStack = createStackNavigator<AboutRootStackParamList>();

type AboutNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'About'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const AboutRootNavigation = () => {
  const navigation = useNavigation<AboutNavigationProps>();
  return (
    <AboutRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <AboutRootStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'About & Support',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MenuButton onPress={navigation.toggleDrawer}>
              <MenuIcon width={18} height={18} color="#fff" />
            </MenuButton>
          ),
        }}
      />
    </AboutRootStack.Navigator>
  );
};

export default AboutRootNavigation;
