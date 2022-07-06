// @flow
import * as React from 'react';
import { type Tutorial } from '../../../../Utils/GDevelopServices/Tutorial';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Column, Line } from '../../../../UI/Grid';
import {
  useResponsiveWindowWidth,
  type WidthType,
} from '../../../../UI/Reponsive/ResponsiveWindowMeasurer';
import { CorsAwareImage } from '../../../../UI/CorsAwareImage';
import Text from '../../../../UI/Text';
import { shortenString } from '../../../../Utils/StringHelpers';
import { LineStackLayout } from '../../../../UI/Layout';
import FlatButton from '../../../../UI/FlatButton';
import { Trans } from '@lingui/macro';

const styles = {
  tutorialsContainer: {
    marginTop: 25,
  },
  grid: {
    maxWidth: 1200, // Avoid tiles taking too much space on large screens.
  },
  buttonStyle: {
    textAlign: 'left',
  },
  titleContainer: {
    // Fix min height to ensure the content stays aligned.
    // 2 line heights (20) + 2 text paddings (6)
    minHeight: 2 * 20 + 2 * 6,
  },
  thumbnailImageWithDescription: {
    objectFit: 'contain',
    verticalAlign: 'middle',
    backgroundColor: 'black',
    width: 'calc(100% - 2px)', // Not full because of border.
    borderRadius: 8,
    border: '1px solid lightgrey',
  },
};

// Styles to give the impression of pressing an element.
const useStylesForTile = makeStyles(theme =>
  createStyles({
    tile: {
      borderRadius: 8,
      '&:focus': {
        backgroundColor: theme.palette.action.hover,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
);

const getColumnsFromWidth = (width: WidthType) => {
  switch (width) {
    case 'small':
      return 1;
    case 'medium':
      return 3;
    case 'large':
    default:
      return 5;
  }
};

type TutorialsLineProps = {|
  title: React.Node,
  description: React.Node,
  tutorials: Array<Tutorial>,
|};

const TutorialsLine = ({
  title,
  description,
  tutorials,
}: TutorialsLineProps) => {
  const windowWidth = useResponsiveWindowWidth();
  const tileClasses = useStylesForTile();

  return (
    <>
      <LineStackLayout
        justifyContent="space-between"
        alignItems="center"
        noMargin
        expand
      >
        <Column noMargin>
          <Text size="section-title">{title}</Text>
        </Column>
        <Column noMargin>
          <FlatButton
            onClick={() => {}}
            primary
            label={<Trans>See all</Trans>}
          />
        </Column>
      </LineStackLayout>
      <Line noMargin>
        <Text noMargin>{description}</Text>
      </Line>
      <div style={styles.tutorialsContainer}>
        <Line noMargin>
          <GridList
            cols={getColumnsFromWidth(windowWidth)}
            style={styles.grid}
            cellHeight="auto"
            spacing={10}
          >
            {tutorials.slice(0, 5).map((tutorial, index) => (
              <GridListTile key={index} classes={tileClasses}>
                <ButtonBase style={styles.buttonStyle}>
                  <Column noMargin>
                    <CorsAwareImage
                      style={styles.thumbnailImageWithDescription}
                      src={tutorial.thumbnailUrl}
                      alt={tutorial.title}
                    />
                    <div style={styles.titleContainer}>
                      <Text size="sub-title">{tutorial.title}</Text>
                    </div>
                    <Text size="body" color="secondary">
                      {shortenString(tutorial.description, 120)}
                    </Text>
                  </Column>
                </ButtonBase>
              </GridListTile>
            ))}
          </GridList>
        </Line>
      </div>
    </>
  );
};

export default TutorialsLine;
