import { useEffect } from 'react';

const SUFFIX = 'Prima Vista Bauprojekte';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SUFFIX}` : SUFFIX;
  }, [title]);
}
