import React, { FC, useContext, useState, useEffect } from 'react';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../../../routes';

import { Slide } from '@democracy-deutschland/mobile-ui/src/components/Introduction';
import { slidesData } from '@democracy-deutschland/mobile-ui/src/components/Introduction/data';
import { Pager } from '@democracy-deutschland/mobile-ui/src/components/Pager';
import { getSlides } from './utils/getSlides';
import { InitialStateContext } from '../../../context/InitialStates';
import { getVersion } from 'react-native-device-info';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: #fff;
`;

type IntroductionScreenRouteProp = RouteProp<
  RootStackParamList,
  'Introduction'
>;

type Props = {
  route: IntroductionScreenRouteProp;
};

const Introduction: FC<Props> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { isVerified, setLastStartWithVersion } = useContext(
    InitialStateContext,
  );
  const [wasVerified] = useState(isVerified);
  let { lastStartWithVersion, done } = {
    lastStartWithVersion: '',
    done: undefined,
  } as IntroductionScreenRouteProp['params'];
  if (route && route.params) {
    lastStartWithVersion = route.params.lastStartWithVersion || '';
    done = route.params.done;
  }

  // Close instructions if user verify himself within instructions
  useEffect(() => {
    if (!wasVerified && isVerified) {
      navigation.goBack();
    }
  }, [isVerified, wasVerified, navigation]);

  const finishAction = () => {
    if (done === 'SET_LAST_START_VERSION') {
      setLastStartWithVersion(getVersion());
    }
    navigation.goBack();
  };

  const slides = getSlides({
    lastVersion: lastStartWithVersion,
    registered: isVerified,
  });

  return (
    <SafeAreaView testID="Introduction">
      <Pager
        nextButton
        nextText="Verstanden"
        finishText="Los geht's"
        finishAction={finishAction}>
        {slides.map((slide, i) => (
          <Slide
            key={slide.head.title}
            head={slide.head}
            images={slide.images}
            isNew={slide.isNew}
            nextSlide={
              // TODO fix android next button click. does not work correctly
              i + 1 === Object.keys(slidesData).length
                ? finishAction
                : undefined
            }
          />
        ))}
      </Pager>
    </SafeAreaView>
  );
};

export default Introduction;
