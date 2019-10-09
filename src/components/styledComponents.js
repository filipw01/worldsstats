import styled from "styled-components"

export const Header2 = styled.h2`
  font-size: 2rem;
`
export const Header3 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0;
`

export const TopList = styled.ol`
  margin: 1rem 0;
  width: 100%;
  max-width: 400px;
  list-style: none;
`

export const BaseButton = styled.button`
  background-color: #0e0e0e;
  color: #fff;
  padding: 0.5rem 1rem 0.35rem;
  font-size: 0.875rem;
  font-weight: bold;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  border-bottom: 3px solid #f4de33;
  transition: color 0.3s ease, background-color 0.3s ease;
  &:hover {
    background-color: #f4de33;
    color: #000;
  }
`

export const DataContainer = styled.div`
  margin: 1rem 0;
  max-width: 400px;
`
export const DataEntry = styled.div`
  display: flex;
  padding: 18px;
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

export const DataEntrySpan = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 10px;
  color: #fff;
`
