// @flow
import * as React from 'react';
import Dialog from '../UI/Dialog';
import { TutorialsList } from './TutorialsList';

type Props = {};

export const TutorialsDialog = (props: Props) => {
  return (
    <Dialog>
      <TutorialsList />
    </Dialog>
  );
};
