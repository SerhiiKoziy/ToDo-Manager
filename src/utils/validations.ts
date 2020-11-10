
export const required = (value: string | number) => (value || typeof value === 'number' ? undefined : 'Required field');

export const email = (value: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? undefined : 'Wrong email');

export const maxLength = (max: number) => (value: string) => (
  (!value || value.replace(/<\/?[^>]+(>|$)/g, '').length <= max) ? undefined : 'Max numbers'
);

export const stringInput = (value: string): string | undefined => {
  if (!value) {
    return undefined;
  }

  return /[A-Za-z0-9]+/.test(value) ? undefined : 'Invalid text';
};
