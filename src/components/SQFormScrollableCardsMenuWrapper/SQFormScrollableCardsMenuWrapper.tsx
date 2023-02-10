import React from 'react';
import {Card, CardHeader} from '@mui/material';
import {CardPopoverMenu} from 'scplus-shared-components';
import {HEADER_HEIGHT} from '../../utils/constants';
import type {ArrayOrSingle} from 'ts-essentials';
import type {CardPopoverMenuTab} from 'scplus-shared-components';

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

export type SQFormScrollableCardsMenuWrapperProps = {
  /**
   * Children should render an SQFormScrollableCard. Each card
   * should have their header disabled for layout compliance.
   * Additionally, each direct child should have `value` and `label`
   * as props to ensure the tab selection is rendered properly.
   * See SQFormScrollableCardsMenuWrapper stories for an example.
   */
  children: ArrayOrSingle<React.ReactElement<{value: string; label: string}>>;
  /** The Title for the Header component */
  title?: string;
};

export default function SQFormScrollableCardsMenuWrapper({
  title,
  children,
}: SQFormScrollableCardsMenuWrapperProps): JSX.Element {
  const menuItems = React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        return {
          label: child.props.label || '',
          value: child.props.value || '',
        };
      }),
    [children]
  );

  const [selectedTab, setSelectedTab] = React.useState(() => menuItems[0]);

  const handleChange = (
    selectedMenuItemValue: CardPopoverMenuTab['value'] | undefined
  ) => {
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
    <Card
      raised={true}
      elevation={1}
      square={true}
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateAreas: `'header' 'content' 'footer'`,
        height: '100%',
      }}
    >
      <CardHeader
        title={title}
        sx={(theme) => ({
          gridArea: 'header',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
          height: HEADER_HEIGHT, // overrides a scplus-shared-component theme hard coded height
          alignItems: 'center',
          '& .MuiCardHeader-action': {
            alignSelf: 'unset',
            marginTop: 'unset',
          },
          '& .MuiCardHeader-title': {
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '1',
            overflow: 'hidden',
          },
        })}
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
