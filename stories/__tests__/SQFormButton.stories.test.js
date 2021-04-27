import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import * as stories from '../SQFormButton.stories';

const {
  Default: SQFormButton,
  WithTestField: SQFormButtonWithField
} = composeStories(stories);

describe('SQFormButton Tests', () => {
  describe('Button Only', () => {
    it('should render a button with text', () => {
      render(<SQFormButton />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Submit');
    });

    it('should render a reset button given the type reset', () => {
      render(<SQFormButton type="reset" />);

      const resetButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toHaveAttribute('type', 'reset');
    });

    it('should be disabled when button is type reset', () => {
      render(<SQFormButton type="reset" />);

      const resetButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toHaveAttribute('type', 'reset');
      expect(resetButton).toBeDisabled();
    });

    it('should disable when shouldRequireFieldUpdates is true', () => {
      render(<SQFormButton shouldRequireFieldUpdates={true} />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(submitButton).toBeDisabled();
    });

    it('should call a function when clicked', () => {
      const onClickSpy = jest.fn();
      render(<SQFormButton onClick={onClickSpy} />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      userEvent.click(submitButton);

      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should show as disabled when isDisabled is true', () => {
      render(<SQFormButton isDisabled={true} />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(submitButton).toBeDisabled();
    });

    it('should not fire onClick when disabled', () => {
      const onClickSpy = jest.fn();
      render(<SQFormButton isDisabled={true} onClick={onClickSpy} />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      userEvent.click(submitButton);

      expect(onClickSpy).not.toHaveBeenCalled();
    });
  });

  describe('Button with Test Field', () => {
    it('should render a button and a text field', () => {
      render(<SQFormButtonWithField />);

      const testField = screen.getByLabelText(/test field/i);

      expect(testField).toBeInTheDocument();

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveTextContent('Submit');
    });

    it('should enable after field value is changed when shouldRequireFieldUpdates is true', () => {
      render(<SQFormButtonWithField shouldRequireFieldUpdates={true} />);

      const submitButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(submitButton).toBeDisabled();

      const testField = screen.getByLabelText(/test field/i);

      userEvent.type(testField, 'Hello');

      expect(submitButton).toBeEnabled();
    });

    it('should enable when data entered into field and type is reset', () => {
      render(<SQFormButtonWithField type="reset" />);

      const resetButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(resetButton).toHaveAttribute('type', 'reset');
      expect(resetButton).toBeDisabled();

      const testField = screen.getByLabelText(/test field/i);
      userEvent.type(testField, 'Hello');

      expect(resetButton).toBeEnabled();
    });

    it('should reset field when clicked', () => {
      render(<SQFormButtonWithField type="reset" />);

      const resetButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(resetButton).toHaveAttribute('type', 'reset');
      expect(resetButton).toBeDisabled();

      const testField = screen.getByLabelText(/test field/i);
      userEvent.type(testField, 'Hello');
      expect(testField).toHaveValue('Hello');
      expect(resetButton).toBeEnabled();

      userEvent.click(resetButton);

      expect(testField).toHaveValue('');
    });
  });
});
