import type { Meta, StoryObj } from '@storybook/react';
import CardItem from '../../components/CardItem/CardItem';

const meta = {
  title: 'Payments/Cards/CardItem',
  component: CardItem,
  argTypes: {
    cardNumber: {
      control: {
        type: 'text',
        maxLength: 16,
      },
    },
    expirationDate: {
      control: { type: 'object' },
    },
    ownerName: {
      control: {
        type: 'text',
        maxLength: 20,
      },
    },
  },
} satisfies Meta<typeof CardItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs = {
  cardNumber: ['1234', '1234', '1234', '1234'],
  expirationDate: {
    month: '12',
    year: '23',
  },
  ownerName: 'WOOWA',
};

export const BlankCard: Story = {
  args: {
    issuer: '',
    cardNumber: ['', '', '', ''],
    expirationDate: {
      month: '',
      year: '',
    },
    ownerName: '',
  },
};

export const ShinhanCard: Story = {
  args: {
    issuer: '신한카드',
    ...defaultArgs,
  },
};

export const KakaoBankCard: Story = {
  args: {
    issuer: '카카오뱅크',
    ...defaultArgs,
  },
};

export const LotteCard: Story = {
  args: {
    issuer: '롯데카드',
    ...defaultArgs,
  },
};

export const HyundaiCard: Story = {
  args: {
    issuer: '현대카드',
    ...defaultArgs,
  },
};

export const WooriCard: Story = {
  args: {
    issuer: '우리카드',
    ...defaultArgs,
  },
};

export const BCCard: Story = {
  args: {
    issuer: 'BC카드',
    ...defaultArgs,
  },
};

export const HanaCard: Story = {
  args: {
    issuer: '하나카드',
    ...defaultArgs,
  },
};

export const KBCard: Story = {
  args: {
    issuer: '국민카드',
    ...defaultArgs,
  },
};
