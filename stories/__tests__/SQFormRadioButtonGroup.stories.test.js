import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormRadioButtonGroup.stories';

const {
  Default: SQFormRadioButtonGroup,
  WithValidation: SQFormRadioButtonGroupWithValidation
} = composeStories(stories);

describe('SQFormRadioButtonGroup Tests', () => {
  describe('Without validation', () => {
    beforeEach(() => {
      render(<SQFormRadioButtonGroup size="auto" />);
    });

    it('should render a label and group of radio buttons', () => {
      const label = screen.getByText(/Pandas/i);
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Pandas');

      const radioGroup = screen.getByRole('radiogroup', {name: /pandas/i});
      expect(radioGroup).toBeInTheDocument();
    });

    describe('radio button group', () => {
      it('should render three radio buttons', () => {
        const radioButtons = screen.getAllByRole('radio');
        expect(radioButtons).toHaveLength(3);
      });

      it('should have radio buttons with proper labels', () => {
        const radioButtons = screen.getAllByRole('radio');

        const giantPandaButton = radioButtons[0];
        const giantPandaLabel = screen.getByText(/Giant Panda/i);

        const redPandaButton = radioButtons[1];
        const redPandaLabel = screen.getByText(/Red Panda/i);

        const kungFuPandaButton = radioButtons[2];
        const kungFuPandaLabel = screen.getByText(/Kung Fu Panda/i);

        expect(giantPandaButton).toBeInTheDocument();
        expect(giantPandaLabel).toBeInTheDocument();
        expect(giantPandaLabel).toHaveTextContent('Giant Panda');

        expect(redPandaButton).toBeInTheDocument();
        expect(redPandaLabel).toBeInTheDocument();
        expect(redPandaLabel).toHaveTextContent('Red Panda');

        expect(kungFuPandaButton).toBeInTheDocument();
        expect(kungFuPandaLabel).toBeInTheDocument();
        expect(kungFuPandaLabel).toHaveTextContent('Kung Fu Panda');
      });
    });
  });
});

/*
describe('SQFormTextarea Tests', () => {
  describe('Textarea Only', () => {
    it('should render a label and text box', () => {
      render(<SQFormTextarea size="auto" />);

      const label = screen
        .getAllByText(/textarea/i)
        .find(item => item.parentElement.tagName === 'LABEL');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Textarea');

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toBeInTheDocument();
    });

    it('should render with empty initial value', () => {
      render(<SQFormTextarea size="auto" />);

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toHaveValue('');
    });

    it('should render with non-emtpy initial value', () => {
      render(
        <SQFormTextarea
          size="auto"
          SQFormProps={{initialValues: {textarea: 'Hello SelectQuote!'}}}
        />
      );

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toHaveValue('Hello SelectQuote!');
    });

    it('should update when text is entered', () => {
      render(<SQFormTextarea size="auto" />);

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toHaveValue('');

      userEvent.type(textbox, 'Hello');

      expect(textbox).toHaveValue('Hello');
    });

    it('should render as disabled when isDisabled is true', () => {
      render(<SQFormTextarea size="auto" isDisabled />);

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toBeDisabled();
    });

    it('shouod not render as disable when isDisabled is false', () => {
      render(<SQFormTextarea size="auto" isDisabled={false} />);

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).not.toBeDisabled();
    });

    it('should render as required when isRequired is true', () => {
      render(<SQFormTextarea size="auto" isRequired />);

      const required = screen.getByText('Required');
      expect(required).toBeInTheDocument();
    });

    it('should not render as required when isRequired is false', () => {
      render(<SQFormTextarea size="auto" isRequired={false} />);

      const required = screen.queryByText('Required');
      expect(required).not.toBeInTheDocument();
    });

    it('should only render the number of characters equal to maxCharacters', () => {
      const maxCharacters = 5;

      render(<SQFormTextarea size="auto" maxCharacters={maxCharacters} />);

      const charCount = screen
        .getAllByText(`Textarea : 0/${maxCharacters}`)
        .find(item => item.parentElement.tagName === 'LABEL');
      expect(charCount).toBeInTheDocument();

      const textbox = screen.getByRole('textbox', {name: /textarea/i});

      userEvent.type(textbox, 'Hello World');

      expect(textbox).toHaveValue('Hello');
      const charCountAfter = screen
        .getAllByText(`Textarea : ${maxCharacters}/${maxCharacters}`)
        .find(item => item.parentElement.tagName === 'LABEL');
      expect(charCountAfter).toBeInTheDocument();
    });

    it('should render all characters given when no maxCharacters passed in', () => {
      render(<SQFormTextarea size="auto" />);

      const textbox = screen.getByRole('textbox', {name: /textarea/i});

      userEvent.type(textbox, 'This is a really long string.');

      expect(textbox).toHaveValue('This is a really long string.');
    });
  });

  describe('Textarea With Validation', () => {
    it('should highlight field if required by no value selected', () => {
      render(<SQFormTextareaWithValidation size="auto" />);

      userEvent.tab();

      const textbox = screen.getByRole('textbox', {name: /textarea/i});
      expect(textbox).toHaveFocus();

      userEvent.tab();
      expect(textbox).not.toHaveFocus();

      const required = screen.getByText('Required');
      expect(required).toHaveClass('Mui-error');
    });
  });
});
*/
