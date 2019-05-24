// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const IsEmpty = (value: undefined | null | {} | string): boolean =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)