import React, { AnchorHTMLAttributes } from 'react';

import classNames from 'classnames';

import styles from './styles.scss';

export interface ILinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  styled?: boolean;
}

const Link = ({ className, styled, ...rest }: ILinkProps) => (
  <a
    className={
      classNames(
        className,
        {
          [styles.link]: styled,
        },
      )
    }
    {...rest}
  />
);

export default Link;
