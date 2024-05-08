import { Input } from "antd";

export interface CreditCardInput {
	name?: string;
	disabled?: boolean;
	creditCardNumber: string[];
	setCreditCardNumber: (input: any) => any;
}

const CreditCardInput = ({ name, disabled, creditCardNumber, setCreditCardNumber }: CreditCardInput) => {
	const handleInputChange = (index: any, value: any) => {
		if (!isNaN(value)) {
			const updatedNumbers = [...creditCardNumber];
			updatedNumbers[index] = value;

			if (value.length === 4 && index < 3) {
				document.getElementById(`creditCardInput${index + 1}`)?.focus();
			}

			setCreditCardNumber(updatedNumbers);
		}
	};

	return (
		<div>
			{creditCardNumber.map((number, index) => (
				<Input
					name={name}
					key={index}
					id={`creditCardInput${index}`}
					value={number}
					onChange={(e) => handleInputChange(index, e.target.value)}
					maxLength={4}
					style={{ width: "60px", marginRight: "8px" }}
					disabled={disabled}
				/>
			))}
		</div>
	);
};

export default CreditCardInput;
