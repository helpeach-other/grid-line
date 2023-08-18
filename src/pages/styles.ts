import styled from 'styled-components';

export const GRID_SIZE = 40;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const GridWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: ${GRID_SIZE * 10}px;
  height: ${GRID_SIZE * 10}px;
  overflow: hidden;
  flex-wrap: wrap;
`;

export const GridItem = styled.div<{ active?: boolean }>`
  width: ${GRID_SIZE}px;
  height: ${GRID_SIZE}px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  user-select: none;
  ${({ active }) => active && 'background-color: #000;'}
`;
