import { Section } from '../../types';
import { useState } from 'react';
import { debounce } from '../../utils';

export const useSearch = (section: Section) => {
  const [searchedSection, setSearchedSection] = useState<Section | null>(null);

  const search = (searchPhrase: string) => {
    console.log(searchPhrase);
    if (searchPhrase) {
      const newSection = {
        ...section,
        data: [...section.data],
      };
      const searched = newSection.data.filter(item =>
        Object.values(item).some((value: string | number) =>
          `${value}`.toLowerCase().includes(searchPhrase.toLowerCase()),
        ),
      );
      setSearchedSection({ ...newSection, data: [...searched] });
    } else {
      setSearchedSection(null);
    }
  };

  const debouncedSearch = debounce(search);

  return {
    searchedSection,
    search: debouncedSearch,
  };
};
