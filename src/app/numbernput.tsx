import React, { ChangeEvent } from 'react';

interface NumberInputProps {
    title: string,
    id: string,
    onNumberChange: (value: string) => void;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, title, onNumberChange }) => {
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        console.log(newValue)
        // Allow only numbers and the Backspace key
        if (!/^[0-9\b]+$/.test(newValue)) {
            event.target.value = newValue.replace(/[^\d]/g, '');
        }

        onNumberChange(newValue);
    };

    return (
        <div className="mb-4">
            <label htmlFor={id}
                className="text-base font-semibold text-black dark:text-white"
            >
                {title}
            </label>
            <input
                onInput={handleInput}
                className="w-full mt-3 py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-orange-600 dark:border-gray-800 dark:focus:border-orange-600 focus:ring-0"
                type="text"
                name={id}
                id={id} />
        </div>
    );
};

export default NumberInput;