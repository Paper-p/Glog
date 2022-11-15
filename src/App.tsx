import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import {
  MainPage,
  SigninPage,
  SetNamePage,
  SetMainPage,
  WritePage,
  DetailsPostPage,
  UserProfilePage,
} from "pages";
import GlobalStyle from "shared/GlobalStyles";

export default function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup/main" element={<SetMainPage />} />
            <Route path="/signup/name" element={<SetNamePage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/post/:postId" element={<DetailsPostPage />} />
            <Route path="/:ninkname" element={<UserProfilePage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}
