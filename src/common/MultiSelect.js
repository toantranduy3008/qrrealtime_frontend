import React, { useState } from "react";
import Select, { components } from "react-select";

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  // const [isHover] = useState(isFocused);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = "transparent";
  if (isFocused) bg = "#eee";
  if (isActive) bg = "#B2D4FF";

  const style = {
    alignItems: "center",
    backgroundColor: bg,
    color: "inherit",
    display: "flex ",
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <div>
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          style={{ marginRight: '5px' }}
        />
        {children}
      </div>
    </components.Option>
  );
};

export const MultiSelect = (props) => {
  const [currentValue, setCurrentValue] = useState(props.value || []);
  // const valueRef = useRef([props.value]);
  // valueRef.current = props.value || [];

  const selectAllOption = {
    value: "<SELECT_ALL>",
    label: "All"
  };

  const isSelectAllSelected = () => {
    if (props.options.length === 0) return false;
    return currentValue.length === props.options.length;
  }
  const isOptionSelected = (option) =>
    currentValue.some(({ value }) => value === option.value) ||
    isSelectAllSelected();

  const getOptions = () => [selectAllOption, ...props.options];

  const getValue = () =>
    isSelectAllSelected() ? [selectAllOption] : currentValue;

  const onChange = (newValue, actionMeta) => {
    const { action, option, removedValue } = actionMeta;

    if (action === "select-option" && option.value === selectAllOption.value) {
      props.onChange(props.options, actionMeta);
      // valueRef.current=props.options
      setCurrentValue(props.options)
    }
    else if (
      (action === "deselect-option" &&
        option.value === selectAllOption.value) ||
      (action === "remove-value" &&
        removedValue.value === selectAllOption.value)
    ) {
      props.onChange([], actionMeta);
      // valueRef.current=[]
      setCurrentValue([])
    }
    else if (actionMeta.action === "deselect-option" && isSelectAllSelected()) {
      let data = props.options.filter(({ value }) => value !== option.value);
      props.onChange(data, actionMeta);
      // valueRef.current=data
      setCurrentValue(data)
    }
    else {
      props.onChange(newValue || [], actionMeta);
      // valueRef.current=newValue
      setCurrentValue(newValue)
    }
  };

  return (
    <Select
      name={props.name}
      class={props.class}
      isOptionSelected={isOptionSelected}
      options={getOptions()}
      value={getValue()}
      onChange={onChange}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      isMulti
      components={{
        Option: InputOption
      }}
    />
  );
};
