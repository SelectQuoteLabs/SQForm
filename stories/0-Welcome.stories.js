import React from 'react';
import readme from '../README.md';
import changes from '../CHANGELOG.md';

export default {
  title: 'Welcome',
  parameters: {
    notes: {readme, changes}
  }
};

export const docs = () => (
  <h1>Go to the Notes to view the README and Changelog</h1>
);

docs.story = {
  name: 'Docs'
};
