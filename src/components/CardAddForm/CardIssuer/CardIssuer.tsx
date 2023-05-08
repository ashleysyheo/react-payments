import { memo, useEffect, useRef } from 'react';
import { Modal, useModalContext } from '@ashleysyheo/react-modal';
import type { FocusEvent, MouseEvent } from 'react';
import type { CardFormData, CardFormValidation, Issuer } from '../../../types';
import Button from '../../common/Button/Button';
import CardIssuerSelection from './CardIssuerSelection/CardIssuerSelection';
import InputContainer from '../../common/InputContainer/InputContainer';
import Label from '../../common/Label/Label';
import DownIcon from '../../../assets/down-icon.svg';
import styles from './style.module.css';

interface CardIssuerProps {
  value: string;
  isError: boolean;
  updateInputValue: <K extends keyof CardFormData>(key: K, value: CardFormData[K]) => void;
  updateInputError: <K extends keyof CardFormValidation>(key: K, value: CardFormData[K]) => void;
}

const CardIssuer = ({ value, isError, updateInputValue, updateInputError }: CardIssuerProps) => {
  const { isModalOpen, isModalClosed, openModal, closeModal } = useModalContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isModalClosed) return;

    if (value === '') {
      buttonRef.current?.focus();
      updateInputError('issuer', value);
    } else {
      (
        containerRef.current?.nextElementSibling?.children[1].childNodes[0] as HTMLInputElement
      ).focus();
    }
  }, [isModalClosed, updateInputError, value]);

  const onBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (isModalOpen) return;

    updateInputError('issuer', event.currentTarget.value as Issuer);
  };

  const onOptionClick = (event: MouseEvent<HTMLButtonElement>) => {
    updateInputValue('issuer', event.currentTarget.value as Issuer);
    closeModal();
  };

  return (
    <InputContainer
      ref={containerRef}
      className={styles.container}
      supportingText={{
        error: '카드에 표시된 카드사를 선택해주세요',
      }}
      isError={isError}
    >
      <Label htmlFor="issuer" required>
        카드사
      </Label>
      <Button
        ref={buttonRef}
        type="button"
        id="issuer"
        name="issuer"
        className={`select-button flex-jsb flex-row-reverse ${isError ? styles.error : ''} ${
          value ? styles.selected : ''
        }`}
        icon={DownIcon}
        value={value}
        autoFocus
        onClick={openModal}
        onBlur={onBlur}
      >
        {value ? `${value}` : '카드사를 선택해주세요'}
      </Button>
      {isModalOpen && (
        <Modal>
          <CardIssuerSelection onOptionClick={onOptionClick} close={closeModal} />
        </Modal>
      )}
    </InputContainer>
  );
};

export default memo(CardIssuer);
