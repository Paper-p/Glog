import { searchAtom } from "atoms";
import { PostBox } from "components/Common";
import Category from "components/Common/Category";
import Header from "components/Common/Header";
import feed from "data/request/feed";
import { marked } from "marked";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import MainSkeleton from "../Skeleton";
import { Skeleton } from "../Skeleton/style";
import * as S from "./style";

export default function Main() {
  const [list, setList] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(0);
  const observerTargetEl = useRef<HTMLDivElement>(null);
  const [isEnter, setIsEnter] = useState<boolean>(false);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [search] = useRecoilState(searchAtom);

  const getFeedList = useCallback(async (keyword?: string) => {
    try {
      setIsLoad(true);
      const res: any = await feed.getFeedList({
        size: 12,
        page: page.current,
        keyword: keyword ? keyword : "",
      });
      setList((prevPosts) => [...prevPosts, ...res.data.list]);
      setHasNextPage(res.data.list.length === 12);
      setIsLoad(false);

      if (res.data.list.length) {
        page.current += 1;
      }
    } catch (e: any) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (!observerTargetEl.current || !hasNextPage) return;

    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting && !isLoad) {
        getFeedList();
      }
    });
    io.observe(observerTargetEl.current);

    return () => {
      io.disconnect();
    };
  }, [hasNextPage, getFeedList, isLoad]);

  const onSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setIsEnter(true);
    }
  };

  useEffect(() => {
    if (isEnter) {
      getFeedList(search);
      setIsEnter(false);
    }
  }, [isEnter]);

  return (
    <>
      <Header isNeedSearch={true} onKeyPress={onSearch} />
      <S.CategoryBox>
        <Category>💻 게시물’s</Category>
      </S.CategoryBox>
      <S.PostListSection>
        <>
          {list.map((idx) => (
            <div key={idx.id}>
              <PostBox
                isDefault={true}
                id={idx.id}
                imageUrl={idx.thumbnail}
                title={idx.title}
                content={
                  marked(idx.previewContent).replace(/<[^>]+>/g, "") + "..."
                }
                like={idx.likeCount}
                view={idx.hit}
              />
            </div>
          ))}
          <div ref={observerTargetEl} />
        </>
      </S.PostListSection>
      {isLoad && <MainSkeleton />}
    </>
  );
}
