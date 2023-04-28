import type { Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CardExpirationDate from '../../components/CardAddForm/CardExpirationDate/CardExpirationDate';
import { useCardAddForm } from '../../hooks/cards/useCardAddForm';

const meta = {
  title: 'Payments/Cards/CardExpirationDateInput',
  component: CardExpirationDate,
  tags: ['autodocs'],
} satisfies Meta<typeof CardExpirationDate>;

export default meta;

export const Default = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardExpirationDate
      isError={inputError.expirationDate}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

export const SuccessInteraction = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardExpirationDate
      isError={inputError.expirationDate}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

SuccessInteraction.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const label = canvas.getByText('만료일');
  const input = canvas.getByLabelText('만료일', {
    exact: false,
    selector: 'input',
  });

  expect(input).not.toHaveFocus();

  userEvent.click(label);
  expect(input).toHaveFocus();

  await userEvent.type(input, '1223', { delay: 200 });

  userEvent.tab();
};

export const ErrorInteraction = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardExpirationDate
      isError={inputError.expirationDate}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

ErrorInteraction.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const label = canvas.getByText('만료일');
  const input = canvas.getByLabelText('만료일', {
    exact: false,
    selector: 'input',
  });

  expect(input).not.toHaveFocus();

  userEvent.click(label);
  expect(input).toHaveFocus();

  await userEvent.type(input, '5867', { delay: 200 });

  userEvent.tab();
};
