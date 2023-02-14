import React from 'react';
import userEvent from '@testing-library/user-event';
import {composeStories} from '@storybook/testing-react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import * as stories from '../SQFormGuidedWorkflow.stories';

const {Default: SQFormGuidedWorkflow, Testing} = composeStories(stories);

describe('SQFormGuidedWorkflow Tests', () => {
  it('should render a title, subtitle, and 3 sections', () => {
    render(<SQFormGuidedWorkflow />);

    const mainTitle = screen.getByText('CCA Guided Workflow');
    expect(mainTitle).toBeVisible();

    const mainSubtitle = screen.getByText(/please review/i);
    expect(mainSubtitle).toBeVisible();

    const openButton = screen.getByRole('button', {name: /open/i});
    expect(openButton).toBeInTheDocument();

    const toggleButtons = screen.getAllByRole('button', {
      name: /toggle-expansion/i,
    });
    expect(toggleButtons.length).toBe(3); // x 3

    //First section defaults to open
    const introSection = screen.getByRole('button', {
      name: /toggle-expansion/i,
      expanded: true,
    });
    expect(introSection).toBeVisible();

    //Other 2 sections not open
    const remainingSections = screen.getAllByRole('button', {
      name: /toggle-expansion/i,
      expanded: false,
    });
    expect(remainingSections.length).toBe(2);

    const agentScript = screen.getByRole('heading', {name: /agent script/i});
    expect(agentScript).toBeVisible();

    const outcomeArea = screen.getByRole('heading', {name: /confirm info/i});
    expect(outcomeArea).toBeVisible();

    const resetButton = screen.getByRole('button', {name: /reset/i});
    expect(resetButton).toBeVisible();
    expect(resetButton).toBeDisabled();

    const nextButton = screen.getByRole('button', {name: /next/i});
    expect(nextButton).toBeVisible();
    expect(nextButton).toBeDisabled();
  });

  it('should enable next button when all required fields are filled out in the 1st section', async () => {
    render(<SQFormGuidedWorkflow />);

    const nextButton = screen.getByRole('button', {name: /next/i});
    expect(nextButton).toBeDisabled();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    await waitFor(() => {
      expect(nextButton).toBeEnabled();
    });
  });

  it('should close current expanded card and open the next one when next button is clicked', async () => {
    render(<SQFormGuidedWorkflow />);

    const introText = screen.queryByText(
      /Review the following ancillary benefits with the client/i
    );
    expect(introText).toBeVisible();

    const policyText = screen.queryByText(/stuff about policy cancellation/i);
    expect(policyText).not.toBeVisible();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    const nextButton = screen.getByRole('button', {name: /next/i});
    await waitFor(() => {
      expect(nextButton).toBeEnabled();
    });
    userEvent.click(nextButton);

    await waitForElementToBeRemoved(screen.queryByTestId('loadingSpinner'), {
      timeout: 3500,
    });

    expect(introText).not.toBeVisible();
    expect(screen.getByText(/stuff about policy cancellation/i)).toBeVisible();
  });

  it("should allow user to go reopen the 1st section after it's completed", async () => {
    //This test runs long so extending the time limit
    jest.setTimeout(10000);
    render(<SQFormGuidedWorkflow />);

    const introText = screen.getByText(
      /Review the following ancillary benefits with the client/i
    );
    expect(introText).toBeVisible();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    const nextButton = screen.getByRole('button', {name: /next/i});
    await waitFor(() => {
      expect(nextButton).toBeEnabled();
    });
    userEvent.click(nextButton);

    await waitForElementToBeRemoved(screen.queryByTestId('loadingSpinner'), {
      timeout: 3500,
    });

    const toggleButtons = screen.getAllByRole('button', {
      name: /toggle-expansion/i,
    });
    const firstSection = toggleButtons[0];

    userEvent.click(firstSection);

    await waitFor(
      () =>
        expect(
          screen.getByText(
            /Review the following ancillary benefits with the client/i
          )
        ).toBeVisible(),
      {timeout: 2000}
    );

    expect(
      screen.getByText(
        /Review the following ancillary benefits with the client/i
      )
    ).toBeVisible();
  });

  it('should display an error when in a failed state', async () => {
    render(<SQFormGuidedWorkflow />);

    //Completing the 1st module to get to the 2nd
    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);
    const interested = screen.getByText('Interested');
    userEvent.click(interested);
    const nextButton = screen.getByRole('button', {name: /next/i});
    await waitFor(() => {
      expect(nextButton).toBeEnabled();
    });
    userEvent.click(nextButton);
    await waitForElementToBeRemoved(screen.queryByTestId('loadingSpinner'), {
      timeout: 3500,
    });

    const infoText = screen.getByText(/interact with the form/i);
    expect(infoText).toBeVisible();

    const ineligibleButton = screen.getByRole('button', {name: /ineligible/i});
    expect(ineligibleButton).toBeInTheDocument();

    userEvent.click(ineligibleButton);

    expect(infoText).toHaveTextContent(/do not pass go/i);
  });
});

describe('Testing new story', () => {
  it('should render with new given options', () => {
    render(
      <Testing
        mainTitle="Something"
        mainSubtitle="Something else"
        isStrictMode={true}
      />
    );

    const mainTitle = screen.getByText('Something');
    expect(mainTitle).toBeVisible();

    const mainSubtitle = screen.getByText('Something else');
    expect(mainSubtitle).toBeVisible();
  });

  it('should not allow reopen of first section if strict mode is on', async () => {
    render(
      <Testing
        mainTitle="Main Title"
        mainSubtitle="Subtitle goes here"
        isStrictMode={true}
      />
    );

    const firstScript = screen.getByText(/this is some text/i);
    expect(firstScript).toBeVisible();

    const textbox = screen.getByRole('textbox', {name: /first text/i});
    userEvent.type(textbox, 'Hello');

    const nextButton = screen.getByRole('button', {name: /next/i});
    await waitFor(() => {
      expect(nextButton).toBeEnabled();
    });
    userEvent.click(nextButton);

    await waitFor(
      () => expect(screen.getByText('This is some more text')).toBeVisible(),
      {timeout: 5000}
    );

    const secondScript = screen.getByText('This is some more text');
    expect(secondScript).toBeVisible();

    const toggleButtons = screen.getAllByRole('button', {
      name: /toggle-expansion/i,
    });
    const firstSection = toggleButtons[0];

    userEvent.click(firstSection);

    expect(firstScript).not.toBeVisible();
    expect(secondScript).toBeVisible();
  });

  it('should skip the first section and open the second section when there is 1 completed task', () => {
    render(
      <Testing
        mainTitle="Something"
        mainSubtitle="Something else"
        isStrictMode={true}
        initialCompletedTasks={1}
      />
    );

    const firstScript = screen.getByText(/this is some text/i);
    expect(firstScript).not.toBeVisible();

    const secondScript = screen.getByText('This is some more text');
    expect(secondScript).toBeVisible();
  });
});
