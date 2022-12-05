import {
  deletePostModalAtom,
  editProfileModalAtom,
  loggedAtom,
  logoutModalAtom,
  MyLikeAtom,
  MyPostAtom,
} from "Atoms";
import Category from "components/Common/Category";
import DeletePostModal from "components/Modal/DeletePostModal";
import user from "data/request/user";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import * as S from "./style";
import * as I from "Assets/svg";
import EditProfileModal from "components/Modal/EditProfileAtom";
import { DEFAULT_PROFILE_IMAGE } from "shared/config";
import UserProfilePageSkeleton from "../skeleton";
import LogoutModal from "components/Modal/LogoutModal";
import Page404 from "components/404";
import UserPost from "../UserPosts";
import MyLikePost from "../MyLikePost";
import { useParams } from "react-router-dom";
import TokenService from "util/TokenService";

export default function UserPropfile() {
  const [userInfo, setUserInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileImg, setProfileImg] = useState<string>(DEFAULT_PROFILE_IMAGE);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [postsNull, setPostsNull] = useState<boolean>(false);
  const [is404, setIs404] = useState<boolean>(false);
  const params = useParams();

  const [myPost, setMyPost] = useRecoilState(MyPostAtom);
  const [myLike, setMyLike] = useRecoilState(MyLikeAtom);
  const [logged] = useRecoilState(loggedAtom);
  const [logoutModal, setLogoutModal] = useRecoilState(logoutModalAtom);
  const [deletePostModal] = useRecoilState(deletePostModalAtom);
  const [editProfileModal, setEditProfileModal] =
    useRecoilState(editProfileModalAtom);

  useEffect(() => {
    const getUserInfo = async () => {
      setIsLoading(true);
      try {
        const res: any = await user.getUserInfo(
          TokenService.getLocalAccessToken(),
          String(params.nickname)
        );

        setProfileImg(res.data.profileImageUrl);
        setIsMine(res.data.isMine);
        setUserInfo(res.data);
        setIsLoading(false);

        if (res.data.feedList.length === 0) {
          setPostsNull(true);
        }
      } catch (e: any) {
        if (e.response.status === 404) {
          setIs404(true);
        }
      }
    };
    getUserInfo();
  }, [params.ninkname]);

  const clickMyPost = () => {
    setMyPost(true);
    setMyLike(false);
  };

  const clickMyLike = () => {
    setMyPost(false);
    setMyLike(true);
  };

  return (
    <>
      {is404 ? (
        <Page404 />
      ) : (
        <>
          <S.ProfileLayout>
            {logoutModal && <LogoutModal />}
            {deletePostModal && <DeletePostModal />}
            {editProfileModal && (
              <EditProfileModal
                userImage={userInfo.profileImageUrl}
                nickname={userInfo.nickname}
              />
            )}
            <S.ProfileBox>
              <S.ProfileImage src={profileImg} />
              <S.ProfileName>{userInfo.nickname}</S.ProfileName>
              {isMine && (
                <>
                  <S.EditProfileButton
                    onClick={() => setEditProfileModal(true)}
                  >
                    프로필 변경하기
                  </S.EditProfileButton>
                  <S.Logout onClick={() => setLogoutModal(true)}>
                    로그아웃
                  </S.Logout>
                </>
              )}
            </S.ProfileBox>
          </S.ProfileLayout>
          <S.MyPostsLayout>
            <S.CategoryBox>
              {isMine ? (
                // 마이페이지일때
                <S.MyCategoryBox>
                  <S.MyCategory clicked={myPost} onClick={clickMyPost}>
                    💻내 게시물's
                  </S.MyCategory>
                  <S.MyCategory clicked={myLike} onClick={clickMyLike}>
                    <I.Like /> 하트
                  </S.MyCategory>
                </S.MyCategoryBox>
              ) : (
                <Category>{`💻 ${userInfo.nickname}님의 게시물's`}</Category>
              )}
            </S.CategoryBox>
            {isLoading && <UserProfilePageSkeleton />}
            {myLike ? <MyLikePost /> : <UserPost />}
          </S.MyPostsLayout>
        </>
      )}
    </>
  );
}
