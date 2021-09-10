import React from 'react';
import {Title, Description, ArgsTable, Stories} from '@storybook/addon-docs';

interface createDocsPageParams {
  markdown?: string;
  showStories?: boolean;
}

export const createDocsPage = ({
  markdown,
  showStories = true,
}: createDocsPageParams = {}): (() => React.ReactElement) => {
  return () => (
    <>
      {markdown ? null : <Title />}
      <Description markdown={markdown} />
      <ArgsTable />
      {showStories ? <Stories includePrimary /> : null}
    </>
  );
};
