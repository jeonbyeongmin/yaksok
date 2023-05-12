import { RefObject, useEffect, useRef, useState } from 'react';

export function useHover(): [RefObject<HTMLDivElement>, boolean] {
  const [value, setValue] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, []);

  return [ref, value];
}
