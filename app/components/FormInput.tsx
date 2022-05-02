interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
}

export default function FormInput({
  handleChange,
  label,
  name,
  ...props
}: Props) {
  return (
    <div className="input__group">
      {label ? (
        <label className="input__label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input onChange={handleChange} className="input" name={name} {...props} />
    </div>
  );
}
