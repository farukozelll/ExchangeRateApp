import styled from 'styled-components';

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Spinner'ın yer alacağı yüksekliği ayarlayın */
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
// JSONOutput bileşeni
export const JSONOutput = styled.div`
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 15px;
  max-height: 200px;
  overflow-y: auto;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
  border-radius: 5px;
`;