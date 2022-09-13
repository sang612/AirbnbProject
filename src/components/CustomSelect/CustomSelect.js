import Select from "react-select";
export default ({ onChange, options, value, classname, isDisabled }) => {
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };
  return (
    <div className={classname}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => onChange(value)}
        options={options}
        isDisabled={isDisabled}
      />
    </div>
  );
};
