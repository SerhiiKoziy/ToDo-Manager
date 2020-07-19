import classNames from 'classnames';

const buildClassName = (...args: string[]): string | undefined => classNames(...args) || undefined;

export default buildClassName;
