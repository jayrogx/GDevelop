// @flow
import * as React from 'react';
import { Line, Column } from '../../../UI/Grid';
import Text from '../../../UI/Text';
import Window from '../../../Utils/Window';
import { Trans } from '@lingui/macro';
import PublishIcon from '@material-ui/icons/Publish';
import { LineStackLayout } from '../../../UI/Layout';
import { type HomeTab } from './HomePageMenu';
import { isUserflowRunning } from '../../Onboarding/OnboardingDialog';
import { isMobile } from '../../../Utils/Platform';
import optionalRequire from '../../../Utils/OptionalRequire';
import { sendOnboardingManuallyOpened } from '../../../Utils/Analytics/EventSender';
import SectionContainer, { SectionRow } from './SectionContainer';
import FlatButton from '../../../UI/FlatButton';
import {
  useResponsiveWindowWidth,
  type WidthType,
} from '../../../UI/Reponsive/ResponsiveWindowMeasurer';
import { CardWidget, SMALL_WIDGET_SIZE } from './CardWidget';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import { TutorialContext } from '../../../Tutorial/TutorialContext';
import TutorialsLine from './Tutorials/TutorialsLine';
import PlaceholderError from '../../../UI/PlaceholderError';
import PlaceholderLoader from '../../../UI/PlaceholderLoader';
const electron = optionalRequire('electron');

const useStyles = makeStyles({
  tile: {
    width: '100%',
  },
});

const styles = {
  grid: {
    textAlign: 'center',
    maxWidth: SMALL_WIDGET_SIZE * 4 + 100, // Avoid tiles taking too much space on large screens.
  },
  gridListTile: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  helpItem: {
    padding: 10,
  },
};

const getColumnsFromWidth = (width: WidthType, showTourHelpItem: boolean) => {
  switch (width) {
    case 'small':
      return 1;
    case 'medium':
      return 3;
    case 'large':
    default:
      return showTourHelpItem ? 4 : 3;
  }
};

type Props = {|
  onOpenOnboardingDialog: () => void,
  onCreateProject: () => void,
  onTabChange: (tab: HomeTab) => void,
  onOpenHelpFinder: () => void,
|};

const LearnSection = ({
  onOpenOnboardingDialog,
  onCreateProject,
  onTabChange,
  onOpenHelpFinder,
}: Props) => {
  const classes = useStyles();
  const windowWidth = useResponsiveWindowWidth();
  const showTourHelpItem = !electron && !isMobile() && !isUserflowRunning;
  const helpItems = [
    showTourHelpItem
      ? {
          title: <Trans>Guided Tour</Trans>,
          description: (
            <Trans>Learn the fundamentals of the editor in 5 minutes</Trans>
          ),
          action: () => {
            sendOnboardingManuallyOpened();
            onOpenOnboardingDialog();
          },
        }
      : undefined,
    {
      title: <Trans>Documentation</Trans>,
      description: <Trans>Find the complete documentation on everything</Trans>,
      action: onOpenHelpFinder,
    },
    {
      title: <Trans>Examples</Trans>,
      description: <Trans>Have look at existing games from the inside</Trans>,
      action: onCreateProject,
    },
    {
      title: <Trans>Community</Trans>,
      description: <Trans>Ask your questions to the community</Trans>,
      action: () => onTabChange('community'),
    },
  ].filter(Boolean);

  const {
    tutorials,
    fetchTutorials,
    error: tutorialLoadingError,
  } = React.useContext(TutorialContext);

  React.useEffect(
    () => {
      fetchTutorials();
    },
    [fetchTutorials]
  );

  return (
    <SectionContainer title={<Trans>Help and guides</Trans>}>
      <SectionRow>
        <Line noMargin>
          <GridList
            cols={getColumnsFromWidth(windowWidth, showTourHelpItem)}
            style={styles.grid}
            cellHeight="auto"
            spacing={10}
          >
            {helpItems.map((helpItem, index) => (
              <GridListTile
                key={index}
                style={styles.gridListTile}
                classes={{ tile: classes.tile }}
              >
                <CardWidget onClick={helpItem.action} key={index} size="small">
                  <div style={styles.helpItem}>
                    <Column alignItems="center">
                      <Text size="block-title">{helpItem.title}</Text>
                      <Text size="body" color="secondary">
                        {helpItem.description}
                      </Text>
                    </Column>
                  </div>
                </CardWidget>
              </GridListTile>
            ))}
          </GridList>
        </Line>
      </SectionRow>
      {tutorialLoadingError ? (
        <PlaceholderError onRetry={fetchTutorials}>
          <Trans>
            Can't load the tutorials. Verify your internet connection or retry
            later.
          </Trans>
        </PlaceholderError>
      ) : !tutorials ? (
        <PlaceholderLoader />
      ) : (
        <>
          <SectionRow>
            <LineStackLayout
              justifyContent="space-between"
              alignItems="center"
              noMargin
              expand
            >
              <Column noMargin>
                <Text size="title">
                  <Trans>Guides and tutorials</Trans>
                </Text>
              </Column>
              <Column noMargin>
                {windowWidth === 'large' && (
                  <FlatButton
                    key="submit-example"
                    onClick={() => {
                      Window.openExternalURL(
                        'https://github.com/GDevelopApp/GDevelop-examples/issues/new/choose'
                      );
                    }}
                    primary
                    icon={<PublishIcon />}
                    label={<Trans>Submit your project as an example</Trans>}
                  />
                )}
              </Column>
            </LineStackLayout>
            <Line noMargin>
              <Text noMargin>
                <Trans>Learn by doing</Trans>
              </Text>
            </Line>
          </SectionRow>
          <SectionRow>
            <TutorialsLine
              title={<Trans>Entire games</Trans>}
              description={<Trans>Make complete games step by step</Trans>}
              tutorials={tutorials
                .filter(tutorial => tutorial.category === 'full-game')
                .slice(0, 5)}
            />
          </SectionRow>
          <SectionRow>
            <TutorialsLine
              title={<Trans>Specific game mechanics</Trans>}
              description={
                <Trans>
                  Find how to implement the most common game mechanics and more!
                </Trans>
              }
              tutorials={tutorials
                .filter(tutorial => tutorial.category === 'game-mechanic')
                .slice(0, 5)}
            />
          </SectionRow>
          <SectionRow>
            <Line noMargin>
              <Text size="title">
                <Trans>Courses</Trans>
              </Text>
            </Line>
            <Line noMargin>
              <Text noMargin>
                <Trans>
                  Learn everything about GDevelop from the ground up
                </Trans>
              </Text>
            </Line>
          </SectionRow>
          <SectionRow>
            <TutorialsLine
              title={<Trans>Beginner course</Trans>}
              description={
                <Trans>Learn the fundamental principles of GDevelop</Trans>
              }
              tutorials={tutorials
                .filter(tutorial => tutorial.category === 'official-beginner')
                .slice(0, 5)}
            />
          </SectionRow>
          <SectionRow>
            <TutorialsLine
              title={<Trans>Intermediate course</Trans>}
              description={
                <Trans>Learn all the game-building mechanics of GDevelop</Trans>
              }
              tutorials={tutorials
                .filter(
                  tutorial => tutorial.category === 'official-intermediate'
                )
                .slice(0, 5)}
            />
          </SectionRow>
          <SectionRow>
            <TutorialsLine
              title={<Trans>Advanced course</Trans>}
              description={<Trans>The icing on the cake</Trans>}
              tutorials={tutorials
                .filter(tutorial => tutorial.category === 'official-advanced')
                .slice(0, 5)}
            />
          </SectionRow>
        </>
      )}
    </SectionContainer>
  );
};

export default LearnSection;
