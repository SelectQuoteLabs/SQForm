import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, makeStyles} from '@material-ui/core';
import {CardPopoverMenu} from 'scplus-shared-components';

const useStyles = makeStyles(theme => {
  return {
    card: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `'header' 'content' 'footer'`,
      height: '100%'
    },
    cardHeader: {
      gridArea: 'header',
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
      /**
       * Have to do this because CardPopoverMenu adds a few extra
       * pixels from a rogue span, which screws up alignment compared
       * to normal SQFormScrollableCard headers or its more generic
       * counterpart in MIAV, AdminViewCard.
       */
      height: '70px',
      alignItems: 'center'
    },
    action: {
      alignSelf: 'unset',
      marginTop: 'unset'
    }
  };
});

function getSelectedComponent(selectedTab, children) {
  if (Array.isArray(children)) {
    const selectedFormComponent = children.find(
      child => child.props.value === selectedTab.value
    );
    return selectedFormComponent;
  }
  return children;
}

export default function SQFormScrollableCardsMenuWrapper({title, children}) {
  const classes = useStyles();

  const menuItems = React.useMemo(
    () =>
      React.Children.map(children, child => {
        return {
          label: child.props.label,
          value: child.props.value
        };
      }),
    [children]
  );

  const [selectedTab, setSelectedTab] = React.useState(() => menuItems[0]);

  const handleChange = selectedMenuItemValue => {
    const newSelection = menuItems.find(
      item => item.value === selectedMenuItemValue
    );

    if (selectedTab.value !== newSelection.value) {
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
          action: classes.action
        }}
        title={title}
        className={classes.cardHeader}
        titleTypographyProps={{variant: 'h4'}}
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

SQFormScrollableCardsMenuWrapper.propTypes = {
  /** At least one instance of SQFormScrollableCard where each has
   * prop `isHeaderDisabled` === true
   * AND
   * each has a unique string `value` prop and `label` prop so we
   * have a menu label and can match the `value` to what's selected
   * in the popover menu.
   */
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  /** The Title for the Header component */
  title: PropTypes.string
};
