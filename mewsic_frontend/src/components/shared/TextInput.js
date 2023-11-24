const TextInput = ({
  label,
  placeholder,
  className,
  value,
  setValue,
  labelClassName,
}) => {
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label
        htmlFor={label}
        className={`font-semibold text-white ${labelClassName}`}
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="p-3 border border-gray-400 border-solid rounded placeholder-gray-500"
        id={label}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
