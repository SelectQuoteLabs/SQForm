import React from 'react';
import CheckCircle from '@material-ui/icons/CheckCircle';
import {composeStories} from '@storybook/testing-react';
import {render, screen, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormIconButton.stories';

const {
  Default: SQFormIconButton,
  WithTestField: SQFormIconButtonWithField
} = composeStories(stories);

describe('SQFormIconButton Tests', () => {
  describe('Button Only', () => {
    it('should render a button with an icon', () => {
      render(<SQFormIconButton exampleIcons={CheckCircle} />);

      const iconButton = screen.getByRole('button', {name: /form submission/i});
      const svg = within(iconButton).getByTitle(/form submission/i);

      expect(iconButton).toBeInTheDocument();
      expect(svg).toBeInTheDocument();
    });

    it('should render a submit button', () => {
      render(<SQFormIconButton exampleIcons={CheckCircle} />);

      const iconButton = screen.getByRole('button', {name: /form submission/i});

      expect(iconButton).toBeInTheDocument();
      expect(iconButton).toHaveAttribute('type', 'submit');
    });

    it('should render a reset button given the type reset', () => {
      render(<SQFormIconButton exampleIcons={CheckCircle} type="reset" />);

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(iconButton).toBeInTheDocument();
      expect(iconButton).toHaveAttribute('type', 'reset');
    });

    it('should render a button given the type button', () => {
      render(<SQFormIconButton exampleIcons={CheckCircle} type="button" />);

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(iconButton).toBeInTheDocument();
      expect(iconButton).toHaveAttribute('type', 'button');
    });

    it('should render a button with teal color', () => {
      render(
        <SQFormIconButton
          exampleIcons={CheckCircle}
          isIconTeal={true}
          type="button"
        />
      );

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });
      const svg = within(iconButton).getByTitle(/Form Submission/i);

      expect(iconButton).toBeInTheDocument();
      expect(svg).toHaveStyle({
        color: 'var(--color-teal)',
        width: '1em',
        height: '1em'
      });
    });

    it('should call a function when clicked', () => {
      const onClickSpy = jest.fn();
      render(
        <SQFormIconButton exampleIcons={CheckCircle} onClick={onClickSpy} />
      );

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      userEvent.click(iconButton);

      expect(onClickSpy).toHaveBeenCalled();
    });

    it('should show as disabled when isDisabled is true', () => {
      render(<SQFormIconButton exampleIcons={CheckCircle} isDisabled={true} />);

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(iconButton).toBeDisabled();
    });

    it('should not fire onClick when disabled', () => {
      const onClickSpy = jest.fn();
      render(
        <SQFormIconButton
          exampleIcons={CheckCircle}
          isDisabled={true}
          onClick={onClickSpy}
        />
      );

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      userEvent.click(iconButton);

      expect(onClickSpy).not.toHaveBeenCalled();
    });

    it('should disable when shouldRequireFieldUpdates is true', () => {
      render(
        <SQFormIconButton
          exampleIcons={CheckCircle}
          shouldRequireFieldUpdates={true}
        />
      );

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(iconButton).toBeDisabled();
    });
  });

  describe('Button with Test Field', () => {
    it('should render a button and a text field', () => {
      render(<SQFormIconButtonWithField />);

      const testField = screen.getByLabelText(/test field/i);

      expect(testField).toBeInTheDocument();

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });

      expect(iconButton).toBeInTheDocument();
    });

    it('should enable after field value is changed when shouldRequireFieldUpdates is true', () => {
      render(<SQFormIconButtonWithField shouldRequireFieldUpdates={true} />);

      const iconButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(iconButton).toBeDisabled();

      const testField = screen.getByLabelText(/test field/i);

      userEvent.type(testField, 'Hello');

      expect(iconButton).toBeEnabled();
    });

    it('should reset field when clicked', () => {
      render(<SQFormIconButtonWithField type="reset" />);

      const resetButton = screen.getByRole('button', {
        name: /form submission/i
      });
      expect(resetButton).toHaveAttribute('type', 'reset');

      const testField = screen.getByLabelText(/test field/i);
      userEvent.type(testField, 'Hello');
      expect(testField).toHaveValue('Hello');
      expect(resetButton).toBeEnabled();

      userEvent.click(resetButton);

      expect(testField).toHaveValue('');
    });
  });
});
