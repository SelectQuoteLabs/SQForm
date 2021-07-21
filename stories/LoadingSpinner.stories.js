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

export const LoadingSpinnerWithoutMessage = () => {
  return <LoadingSpinner />;
};

export const LoadingSpinnerWithMessage = args => {
  return <LoadingSpinner message={args.message ?? 'Loading...'} />;
};
