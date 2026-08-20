import React from 'react'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '../ui/combobox';
import { UseFormProps } from 'react-hook-form';
import { AddUtilityFormData } from '@/features/utility_accounts/schemas';

type LocationComboBoxProps = {
  value?: string;
  onValueChange: (value: string | null) => void;
  placeHolder: string;
  locations: string[]
};

const LocationComboBox = ({
  onValueChange,
  value,
  placeHolder,
  locations,
}: LocationComboBoxProps) => {
  return (
    <Combobox items={locations} value={value} onValueChange={onValueChange}>
      <ComboboxInput placeholder={placeHolder} />

      <ComboboxContent>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};

export default LocationComboBox