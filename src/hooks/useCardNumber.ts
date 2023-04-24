import { ChangeEvent, RefObject } from 'react';
import { CARD_NUMBER_INPUT_UNIT_MAX_LENGTH } from '../constants';
import { useInputCursorPosition } from './useInputCursorPosition';
import { checkNumberFormat } from '../utils/formatChecker';

const useCardNumber = (inputRef: RefObject<HTMLInputElement>) => {
  const setCursor = useInputCursorPosition(inputRef);

  const onInputCursorPositionChange = ({ target, nativeEvent }: ChangeEvent<HTMLInputElement>) => {
    if (!(nativeEvent instanceof InputEvent) || !target.selectionStart) return;

    const key = nativeEvent.data;
    const cursor =
      target.selectionStart +
      (target.selectionStart % CARD_NUMBER_INPUT_UNIT_MAX_LENGTH === 0 && key ? 1 : 0);
    setCursor(cursor);
  };

  const onInputTypeChange = ({ target, nativeEvent }: ChangeEvent<HTMLInputElement>) => {
    if (
      !(nativeEvent instanceof InputEvent) ||
      target.dataset.value === undefined ||
      target.selectionStart === null
    ) {
      return;
    }

    if (nativeEvent.inputType === 'insertText') {
      const value = nativeEvent.data as string;
      target.dataset.value = checkNumberFormat(value)
        ? target.dataset.value + value
        : target.dataset.value;
    }

    if (nativeEvent.inputType === 'deleteContentBackward') {
      const modifiedValue =
        target.dataset.value.slice(0, target.selectionStart) +
        target.dataset.value.slice(target.selectionStart + 1);
      target.dataset.value = modifiedValue;
    }
  };

  const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    onInputCursorPositionChange(event);
    onInputTypeChange(event);
  };

  return { onInputValueChange };
};

export { useCardNumber };