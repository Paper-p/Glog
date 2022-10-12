import styled from "@emotion/styled";

export const SignupWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const JoinSection = styled.div`
  display: flex;
  height: calc(100vh - 170px);
  align-items: center;
  justify-content: center;
  margin-left: 366px;
`;

export const JoinBox = styled.form`
  width: 732px;
  margin-bottom: 170px;
`;

export const GifBox = styled.div`
  width: 50%;
  text-align: center;
`;

export const StyledGif = styled.img`
  width: 180px;
  height: 140px;
`;

export const InputElements = styled.div`
  display: flex;
  margin-top: 20px;
`;

export const ErrorText = styled.div`
  display: flex;
  margin-left: 20px;
  color: #e83f28;
  align-items: center;
`;

export const SignupButton = styled.button`
  width: 50%;
  height: 60px;
  border-radius: 10px;
  border: none;
  font-weight: 800;
  font-size: 18px;
  margin-top: 16px;
  background: linear-gradient(95.2deg, #17d56f 45.83%, #119e6d 93.3%);

  color: #1c1c1c;
  cursor: pointer;

  &:hover {
    box-sizing: border-box;
    background: #f5f5f5;
    border: 2px solid #17d46f;
    color: #17d46f;
  }
`;

export const CommonText = styled.div`
  width: 50%;
  text-align: center;
  color: #eaeaea;
  font-size: 14px;
  margin-top: 6px;
`;
