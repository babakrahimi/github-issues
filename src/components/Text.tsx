import React from "react";
import styled, { css } from "styled-components";

export enum TextSizes {
  Small,
  Normal,
  Medium,
  Large,
}

export enum TextColors {
  Primary,
  Secondary,
  Gray,
}

export type TextElements = "span" | "p" | "label";

export interface TextProps {
  element: TextElements;
  title?: string;
  textSize?: TextSizes;
  textColor?: TextColors;
  id?: string;
  className?: string;
  light?: boolean;
  children?: any;
  isBold?: boolean;
  isCentered?: boolean;
}

const Text: React.FC<TextProps> = ({
  element,
  light,
  textSize,
  textColor,
  isBold,
  isCentered,
  ...props
}) => {
  return React.createElement(element, props, props.children);
};

const StyledText = styled(Text)<TextProps>`
  ${({ textSize }) => {
    switch (textSize) {
      case TextSizes.Small:
        return css`
          font-size: 12px;
        `;

      case TextSizes.Normal:
        return css`
          font-size: 14px;
        `;

      case TextSizes.Medium:
        return css`
          font-size: 20px;
        `;

      case TextSizes.Large:
        return css`
          font-size: 24px;
        `;

      default:
        return css`
          font-size: 16px;
        `;
    }
  }}

  ${({ textColor }) => {
    switch (textColor) {
      case TextColors.Primary:
        return css``;
      case TextColors.Secondary:
        return css``;
      case TextColors.Gray:
        return css`
          color: #666;
        `;
      default:
        return css`
          color: #212529;
        `;
    }
  }}
  ${({ isBold }) =>
    isBold &&
    css`
      font-weight: bold;
    `}
${({ isCentered }) =>
    isCentered &&
    css`
      text-align: center;
    `}
`;

export default StyledText;
