import React, { useState } from "react";
import styled, { css } from "styled-components";

interface BaseInputProps {
  icon?: string;
  isFloating?: boolean | string;
}

interface InputProps extends BaseInputProps {
  id: string;
  value: string;
  label?: string;
  placeholder?: string;
  iconUrl?: string;
  onChange?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

type FloatingLabelProps = BaseInputProps;

const FloatingLabelInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const StylesInput = styled.input<BaseInputProps>`
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: ${(props) => props.theme.sizes.small};
  height: 46px;
  overflow: hidden;
  padding: 0;
  position: relative;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  ${(props) =>
    props.icon &&
    css`
      padding-left: 54px;
    `}
  ${(props) =>
    props.isFloating &&
    css`
      padding-top: 15.5px;
    `};
`;

const FloatingLabel = styled.label<FloatingLabelProps>`
  position: absolute;
  top: 50%;
  left: 0;
  transition: transform 0.3s ease-out, font-size 0.3s ease-out;
  transform-origin: left top;
  transform: translateY(-50%);
  padding: 0.5rem 0;
  color: #212529;
  ${(props) =>
    props.icon &&
    css`
      left: 54px;
    `}
  ${(props) =>
    props.isFloating &&
    css`
      transform: translate(0, -1.5rem) scale(0.9);
      font-size: 0.8rem;
      color: #495057;
    `};
`;

const StyledIcon = styled.i`
  display: block;
  position: absolute;
  left: 16px;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;
`;

const Input = ({
  label,
  id,
  value,
  icon,
  onChange = () => {},
  onKeyDown = () => {},
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <FloatingLabelInputContainer id={`${id}-container`}>
      <StylesInput
        id={`${id}-input`}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={onKeyDown}
        icon={icon}
        isFloating={isFocused || inputValue}
      />
      <StyledIcon
        id={`${id}-icon`}
        style={{
          backgroundImage: `url(${icon})`,
        }}
      />
      <FloatingLabel
        id={`${id}-label`}
        icon={icon}
        isFloating={isFocused || inputValue}
        htmlFor={id}
      >
        {label}
      </FloatingLabel>
    </FloatingLabelInputContainer>
  );
};

export default Input;
