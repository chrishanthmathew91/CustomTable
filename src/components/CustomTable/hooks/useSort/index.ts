import { useState } from 'react';
import { Section } from '../../types';

export const useSort = (section: Section) => {
  const [sortedSection, setSortedSection] = useState<Section | null>(null);

  const sort = (selectedKey: string, isDescending: boolean) => {
    if (selectedKey) {
      const newSection = {
        ...section,
        data: [...section.data],
      };

      newSection.data.sort((a, b) => {
        const aVal = a[selectedKey];
        const bVal = b[selectedKey];

        if (aVal < bVal) {
          return isDescending ? 1 : -1;
        }
        if (aVal > bVal) {
          return isDescending ? -1 : 1;
        }
        return 0;
      });

      setSortedSection(newSection);
    } else {
      setSortedSection(null);
    }
  };

  return { sortedSection, sort };
};
