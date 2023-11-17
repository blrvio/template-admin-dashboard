import { Chip } from '@nextui-org/react';
import React from 'react';

interface SelectChipProps {
  options: string[];
  selectedOptions: string[];
  handleSelectOption: (option: string) => void;
  selectionLimit?: number; // Adicionando um limite para a seleção
}

const SelectChips: React.FC<SelectChipProps> = ({ 
  options, 
  selectedOptions, 
  handleSelectOption,
  selectionLimit = 100,
}) => {

  const isLimitReached = selectedOptions.length >= selectionLimit;

  return (
    <div className="w-full max-w-md px-4 text-center flex flex-wrap justify-center gap-2">
      {options.map((option, index) => (
        <Chip
          key={index}
          className="capitalize m-1"
          color={selectedOptions.includes(option) ? 'success' : 'default'}
          size="sm"
          variant="flat"
          onClick={() => !isLimitReached || selectedOptions.includes(option) ? handleSelectOption(option) : null}
          isDisabled={isLimitReached && !selectedOptions.includes(option)} // Desabilita o chip se o limite for atingido e não estiver selecionado
        >
          {option}
        </Chip>
      ))}
    </div>
  );
};

export default SelectChips;
