import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { HiOutlineSparkles } from 'react-icons/hi';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  return (
    <div className="max-w-2xl flex-grow border-l border-r border-gray-100 sm:ml-[73px] xl:ml-[370px]">
      <div
        className="sticky top-0 z-50 flex items-center border-b border-gray-100 bg-white py-2 px-3
      text-[#0F1419] sm:justify-between"
      >
        <h2 className="text-lg font-bold sm:text-xl">Home</h2>
        <div className="hoverAnimation ml-auto flex h-9 w-9 items-center justify-center xl:px-0">
          <HiOutlineSparkles className="h-5 text-[#0F1419]" />
        </div>
      </div>
      <Input />
      <div className="pb-72">
        {posts.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
