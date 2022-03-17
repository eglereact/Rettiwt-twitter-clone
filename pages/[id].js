import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import Login from '../components/Login';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import { getProviders, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import { FiArrowLeft } from 'react-icons/fi';
import Comment from '../components/Comment';

function PostPage({ followResults, trendingResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const router = useRouter();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const { id } = router.query;

  if (!session) return <Login providers={providers} />;

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Rettiwt: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex min-h-screen max-w-[1500px] bg-white">
        <Sidebar />
        <div className="max-w-2xl flex-grow border-l border-r border-[#F3F4F6] sm:ml-[73px] xl:ml-[370px]">
          <div
            className="sticky top-0 z-50 flex items-center gap-x-4 border-b border-[#F3F4F6]
          bg-white px-1.5 py-2 text-xl font-semibold text-[#0F1419]"
          >
            <div
              className="hoverAnimation flex  items-center justify-center"
              onClick={() => router.push('/')}
            >
              <FiArrowLeft className="h-5 text-[#0F1419]" />
            </div>
            Tweet
          </div>
          <Post id={id} post={post} postPage />
          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = await fetch('https://jsonkeeper.com/b/NKEV').then(
    (res) => res.json()
  );
  const followResults = await fetch('https://jsonkeeper.com/b/WWMJ').then(
    (res) => res.json()
  );

  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
