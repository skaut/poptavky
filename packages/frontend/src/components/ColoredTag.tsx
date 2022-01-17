import styled from "@emotion/styled"
import { css } from "@emotion/react"
import stringToColor from "string-to-color"

export const ColoredTag = styled("span")(
  (props: { children: string }) => css`
    background-color: ${stringToColor(props.children)}33;
    color: #444;
    font-family: themix;
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    margin-right: 4px;
  `
)
