import styled from "styled-components"

export const Header2 = styled.h2`
  font-size: 2.25rem;
`

export const TopList = styled.ol`
  margin: 1rem 0;
  max-width: 400px;
  list-style: none;
`

export const ListEntry = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  padding: 18px;
  position: relative;
  &::after {
    content: "";
    height: 1px;
    width: 100%;
    background-color: #575757;
    position: absolute;
    top: 100%;
    left: 0;
  }
  &:last-child::after {
    display: none;
  }
`

export const ListEntrySpan = styled.span`
  display: flex;
  width: 100%;
  margin-left: 10px;
  color: #fff;
`
