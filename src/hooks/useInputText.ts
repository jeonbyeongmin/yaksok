import { useCallback, useState } from 'react';

export function useInputText(
  initialValue?: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState<string>(initialValue ?? '');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return [value, onChange];
}
