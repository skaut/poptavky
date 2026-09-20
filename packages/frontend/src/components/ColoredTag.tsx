import { css } from "@emotion/react";
import styled from "@emotion/styled";
import stringToColor from "string-to-color";

export const ColoredTag = styled("span")(
  (props: { children: string; isLight?: boolean }) => css`
    background-color: ${stringToColor(props.children)}33;
    color: ${props.isLight === true ? "white" : "#444;"};
    font-family: themix;
    font-size: 0.8rem;
    margin-right: 8px;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    ${props.isLight === true ? "border: 1px solid #ffffff55" : ""};
  `,
);
