import React from 'react';
import {Card, CardHeader, makeStyles} from '@material-ui/core';
import {CardPopoverMenu} from 'scplus-shared-components';
import {HEADER_HEIGHT} from '../../utils/constants';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `'header' 'content' 'footer'`,
      height: '100%',
    },
    cardHeader: {
      gridArea: 'header',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      height: HEADER_HEIGHT, // overrides a scplus-shared-component theme hard coded height
      alignItems: 'center',
    },
    action: {
      alignSelf: 'unset',
      marginTop: 'unset',
    },
    title: {
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '1',
      overflow: 'hidden',
    },
  };
});

function getSelectedComponent(
  selectedTab: {label: string; value: string},
  children: JSX.Element | JSX.Element[]
) {
  if (Array.isArray(children)) {
    const selectedFormComponent = children.find(
      (child) => child.props.value === selectedTab.value
    );
    return selectedFormComponent;
  }
  return children;
}

export interface SQFormScrollableCardsMenuWrapperProps {
  /** At least one instance of SQFormScrollableCard where each has
   * prop `isHeaderDisabled` === true
   * AND
   * each has a unique string `value` prop and `label` prop so we
   * have a menu label and can match the `value` to what's selected
   * in the popover menu.
   */
  children: JSX.Element | JSX.Element[];
  /** The Title for the Header component */
  title?: string;
}

export default function SQFormScrollableCardsMenuWrapper({
  title,
  children,
}: SQFormScrollableCardsMenuWrapperProps): JSX.Element {
  const classes = useStyles();

  const menuItems = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        return {
          label: child.props.label,
          value: child.props.value,
        };
      }),
    [children]
  );

  const [selectedTab, setSelectedTab] = React.useState(() => menuItems[0]);

  const handleChange = (selectedMenuItemValue: string) => {
    const newSelection = menuItems.find(
      (item) => item.value === selectedMenuItemValue
    );

    if (
      typeof newSelection !== 'undefined' &&
      selectedTab.value !== newSelection.value
    ) {
      setSelectedTab(newSelection);
    }
  };

  const SelectedForm = React.useMemo(() => {
    const selected = getSelectedComponent(selectedTab, children);
    return selected;
  }, [selectedTab, children]);

  return (
    <Card raised={true} elevation={1} square={true} className={classes.card}>
      <CardHeader
        classes={{
          action: classes.action,
          title: classes.title,
        }}
        title={title}
        className={classes.cardHeader}
        titleTypographyProps={{variant: 'h5'}}
        action={
          <CardPopoverMenu
            tabs={menuItems}
            selectedTab={selectedTab}
            selectTab={handleChange}
          />
        }
      />
      {SelectedForm}
    </Card>
  );
}
