// @flow

import * as React from 'react';
import { action } from '@storybook/addon-actions';
import { BuildCard } from '../../../Export/Builds/BuildCard';

import muiDecorator from '../../ThemeDecorator';
import paperDecorator from '../../PaperDecorator';

import {
  erroredCordovaBuild,
  pendingCordovaBuild,
  pendingElectronBuild,
  completeCordovaBuild,
  completeElectronBuild,
  completeWebBuild,
  game1,
  fakeIndieAuthenticatedUser,
} from '../../../fixtures/GDevelopServicesTestData';

export default {
  title: 'Builds/BuildCard',
  component: BuildCard,
  decorators: [paperDecorator, muiDecorator],
};

export const WebBuildCard = () => (
  <BuildCard
    build={completeWebBuild}
    game={{ ...game1, acceptsBuildComments: true }}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);

export const WebCurrentlyOnlineBuildCard = () => (
  <BuildCard
    build={completeWebBuild}
    game={{
      ...game1,
      publicWebBuildId: completeWebBuild.id,
    }}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);

export const ElectronBuildCard = () => (
  <BuildCard
    build={completeElectronBuild}
    game={game1}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);
export const PendingElectronBuildCard = () => (
  <BuildCard
    build={pendingElectronBuild}
    game={game1}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);
export const CordovaBuildCard = () => (
  <BuildCard
    build={completeCordovaBuild}
    game={game1}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);
export const pendingCordovaBuildCard = () => (
  <BuildCard
    build={pendingCordovaBuild}
    game={game1}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);
export const ErroredCordovaBuildCard = () => (
  <BuildCard
    build={erroredCordovaBuild}
    game={game1}
    gameUpdating={false}
    setGameUpdating={action('setGameUpdating')}
    onBuildUpdated={action('onBuildUpdated')}
    onBuildDeleted={action('onBuildDeleted')}
    authenticatedUser={fakeIndieAuthenticatedUser}
  />
);
