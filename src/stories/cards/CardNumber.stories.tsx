import type { Meta } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import CardNumber from '../../components/CardAddForm/CardNumber/CardNumber';
import { useCardAddForm } from '../../hooks/cards/useCardAddForm';

const meta = {
  title: 'Payments/Cards/CardNumberInput',
  component: CardNumber,
  tags: ['autodocs'],
} satisfies Meta<typeof CardNumber>;

export default meta;

export const Default = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardNumber
      isError={inputError.cardNumber}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

export const SuccessInteraction = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardNumber
      isError={inputError.cardNumber}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

SuccessInteraction.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const label = canvas.getByText('카드 번호');
  const input = canvas.getByLabelText('카드 번호', {
    exact: false,
    selector: 'input',
  });

  expect(input).not.toHaveFocus();

  userEvent.click(label);
  expect(input).toHaveFocus();

  await userEvent.type(input, '1234123412341234', { delay: 200 });
  expect(input).toHaveValue('1234 1234 •••• ••••');

  userEvent.tab();
};

export const ErrorInteraction = () => {
  const { inputError, updateInputValue, updateInputError } = useCardAddForm();

  return (
    <CardNumber
      isError={inputError.cardNumber}
      updateInputValue={updateInputValue}
      updateInputError={updateInputError}
    />
  );
};

ErrorInteraction.play = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  const canvas = within(canvasElement);

  const label = canvas.getByText('카드 번호');
  const input = canvas.getByLabelText('카드 번호', {
    exact: false,
    selector: 'input',
  });

  expect(input).not.toHaveFocus();

  userEvent.click(label);
  expect(input).toHaveFocus();

  await userEvent.type(input, '12345', { delay: 200 });
  expect(input).toHaveValue('1234 5');

  userEvent.tab();
};
