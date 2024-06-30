import React, { useState, useEffect, useRef } from 'react';
import './filter.css'; 

interface FilterProps {
    id_name: string;
    typeOfFilter: Record<string, string>;
    onSelect: (value: string) => void;  // Добавляем onSelect сюда
}

export const Filter = ({ id_name, typeOfFilter, onSelect }: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(id_name === "genres" ? "Выберите жанр" : "Выберите год");
  const [selectedValue, setSelectedValue] = useState('');
  const customSelectRef = useRef<HTMLDivElement | null>(null); 
  const customButtonRef = useRef<HTMLButtonElement | null>(null); 

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (customSelectRef.current && !customSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        toggleButtonContent();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string, label: string) => {
    setSelectedOption(label);
    setSelectedValue(value);
    setIsOpen(false);
    toggleButtonContent();
    onSelect(value); 
  };

  const toggleButtonContent = () => {
    if (customButtonRef.current) {
      const buttonContent = customButtonRef.current.textContent;
      customButtonRef.current.textContent = buttonContent === '∨' ? '∧' : '∨';
    }
  };

  return (
    <div className="custom-select-wrapper" ref={customSelectRef}>
      <div className={`custom-select ${isOpen ? 'open' : ''}`}>
        <div className="custom-select-trigger" onClick={() => {
          toggleSelect();
          toggleButtonContent();
        }}>
          <div>{selectedOption}</div>
          <button className="but" ref={customButtonRef}>∨</button>
        </div>
        <div className="custom-options">
        {Object.entries(typeOfFilter).map(([key, value]) => (
            <span
              key={key}
              className="custom-option"
              data-value={key}
              onClick={() => handleOptionClick(key, value)}
            >
              {value}
            </span>
          ))}
        </div>
      </div>
      <input type="hidden" name="selected-option" id="selected-option" value={selectedValue} />
    </div>
  );
};
