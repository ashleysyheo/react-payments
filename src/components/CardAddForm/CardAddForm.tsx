import styles from './style.module.css';
import { FormEvent, memo, useEffect, useRef } from 'react';
import { CardFormData, CardFormValidation } from '../../types';
import CardIssuer from './CardIssuer/CardIssuer';
import CardNumber from './CardNumber/CardNumber';
import CardExpirationDate from './CardExpirationDate/CardExpirationDate';
import CardOwnerName from './CardOwnerName/CardOwnerName';
import CardSecurityCode from './CardSecurityCode/CardSecurityCode';
import CardPassword from './CardPassword/CardPassword';
import Button from '../common/Button/Button';

interface CardAddFormProps {
  cardInputError: CardFormValidation;
  updateInputValue: <K extends keyof CardFormData>(key: K, value: CardFormData[K]) => void;
  updateInputError: <K extends keyof CardFormValidation>(key: K, value: CardFormData[K]) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function CardAddForm({
  cardInputError,
  updateInputValue,
  updateInputError,
  handleSubmit,
}: CardAddFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRefs = useRef<(HTMLInputElement | HTMLButtonElement)[]>([]);

  useEffect(() => {
    if (formRef.current) {
      inputRefs.current = Array.from(formRef.current.querySelectorAll('input, button'));
    }
  }, [formRef]);

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={handleSubmit}>
      <CardIssuer
        isError={cardInputError.issuer}
        updateInputValue={updateInputValue}
        updateInputError={updateInputError}
      />
      <CardNumber
        isError={cardInputError.cardNumber}
        updateInputValue={updateInputValue}
        updateInputError={updateInputError}
      />
      <CardExpirationDate
        isError={cardInputError.expirationDate}
        updateInputValue={updateInputValue}
        updateInputError={updateInputError}
      />
      <CardOwnerName updateInputValue={updateInputValue} />
      <CardSecurityCode
        isError={cardInputError.securityCode}
        updateInputValue={updateInputValue}
        updateInputError={updateInputError}
      />
      <CardPassword
        isError={cardInputError.password}
        updateInputValue={updateInputValue}
        updateInputError={updateInputError}
      />
      <Button className="submit-button" variant="primary" tabIndex={8}>
        다음
      </Button>
    </form>
  );
}

export default memo(CardAddForm);
