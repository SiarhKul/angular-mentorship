export const getLSValue = <T extends Record<string, any>>(
  key: string,
  cb?: Function,
): T | null => {
  const stringValue: string | null = localStorage.getItem(key);

  if (stringValue !== null) {
    const value: T = JSON.parse(stringValue);

    cb?.(value);

    return value;
  }

  return null;
};
