import React from 'react';
import {
  Title,
  Description,
  ArgsTable,
  Stories
} from '@storybook/addon-docs/blocks';

export const createDocsPage = ({markdown, showStories = true} = {}) => {
  return () => (
    <>
      {markdown ? null : <Title />}
      <Description markdown={markdown} />
      <ArgsTable />
      {showStories ? <Stories includePrimary /> : null}
    </>
  );
};
