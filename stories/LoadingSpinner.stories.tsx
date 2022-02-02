import React from 'react';
import LoadingSpinner from '../src/components/LoadingSpinner';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    docs: {
      page: createDocsPage(),
    },
  },
};

export const Default = (
  args: Record<string, unknown> & {message?: string}
): JSX.Element => {
  const {message} = args;
  return <LoadingSpinner message={message} />;
};
Default.storyName = 'LoadingSpinner';
