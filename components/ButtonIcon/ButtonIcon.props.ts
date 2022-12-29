import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import up from './up.svg';
import close from './close.svg';
import menu from './burger.svg';

export const icons = {
  up,
  close,
  menu
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  apperarance: 'primary' | 'white';
  icon: IconName;
}