import React from 'react';
import LoadingSpinner from '../src/components/LoadingSpinner';
import {createDocsPage} from './utils/createDocsPage';

export default {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    docs: {
      page: createDocsPage()
    }
  }
};

export const Default = args => {
  return <LoadingSpinner {...args} />;
};
Default.storyName = 'LoadingSpinner';
