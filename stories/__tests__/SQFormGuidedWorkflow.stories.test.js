import React from 'react';
import {composeStories} from '@storybook/testing-react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as stories from '../SQFormGuidedWorkflow.stories';

const {Default: SQFormGuidedWorkflow} = composeStories(stories);

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
      name: /toggle-expansion/i
    });
    expect(toggleButtons.length).toBe(3); // x 3

    //First section defaults to open
    const introSection = screen.getByRole('button', {
      name: /toggle-expansion/i,
      expanded: true
    });
    expect(introSection).toBeVisible();

    //Other 2 sections not open
    const remainingSections = screen.getAllByRole('button', {
      name: /toggle-expansion/i,
      expanded: false
    });
    expect(remainingSections.length).toBe(2);

    const agentScript = screen.getByRole('heading', {name: /agent script/i});
    expect(agentScript).toBeVisible();

    //Should we also check for the icon and script text?

    const outcomeArea = screen.getByRole('heading', {name: /confirm info/i});
    expect(outcomeArea).toBeVisible();

    //Should we also check for the dropdown and textarea?

    const resetButton = screen.getByRole('button', {name: /reset form/i});
    expect(resetButton).toBeVisible();
    expect(resetButton).toBeDisabled();

    const nextButton = screen.getByRole('button', {name: /form submission/i});
    expect(nextButton).toBeVisible();
    expect(nextButton).toBeDisabled();
  });

  it('should enable next button when all required fields are filled out in the 1st section', () => {
    render(<SQFormGuidedWorkflow />);

    const nextButton = screen.getByRole('button', {name: /form submission/i});
    expect(nextButton).toBeDisabled();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    expect(nextButton).toBeEnabled();
  });

  it('should close curent expanded card and open the next one when next button is clicked', async () => {
    render(<SQFormGuidedWorkflow />);

    const introText = screen.queryByText(/hi, bob smith, my name is/i);
    expect(introText).toBeVisible();

    const policyText = screen.queryByText(/stuff about policy cancellation/i);
    expect(policyText).not.toBeVisible();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    const nextButton = screen.getByRole('button', {name: /form submission/i});
    userEvent.click(nextButton);

    await waitFor(
      () =>
        expect(
          screen.getByText(/stuff about policy cancellation/i)
        ).toBeVisible(),
      {timeout: 5000}
    );

    expect(introText).not.toBeVisible();
    expect(screen.getByText(/stuff about policy cancellation/i)).toBeVisible();
  });

  it("should allow user to go reopen the 1st section after it's completed", async () => {
    render(<SQFormGuidedWorkflow />);

    const introText = screen.getByText(/hi, bob smith, my name is/i);
    expect(introText).toBeVisible();

    const outcome = screen.getByRole('button', {name: /outcome/i});
    userEvent.click(outcome);

    const interested = screen.getByText('Interested');
    userEvent.click(interested);

    const nextButton = screen.getByRole('button', {name: /form submission/i});
    userEvent.click(nextButton);

    await waitFor(
      () =>
        expect(
          screen.getByText(/stuff about policy cancellation/i)
        ).toBeVisible(),
      {timeout: 5000}
    );

    const policyText = screen.getByText(/stuff about policy cancellation/i);
    expect(policyText).toBeVisible();

    const toggleButtons = screen.getAllByRole('button', {
      name: /toggle-expansion/i
    });
    const firstSection = toggleButtons[0];

    userEvent.click(firstSection);

    await waitFor(
      () =>
        expect(screen.getByText(/hi, bob smith, my name is/i)).toBeVisible(),
      {timeout: 2000}
    );

    expect(screen.getByText(/hi, bob smith, my name is/i)).toBeVisible();
    //expect(screen.queryByText(/stuff about policy cancellation/i)).not.toBeVisible();
    expect(screen.getByText(/stuff about policy/i)).toBeVisible();
  });

  //it('should ')
});
