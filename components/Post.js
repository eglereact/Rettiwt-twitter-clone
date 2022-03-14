import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  BsChat,
  BsThreeDots,
  BsHeart,
  BsTrash,
  BsFillHeartFill,
} from 'react-icons/bs';
import { FiRepeat, FiShare } from 'react-icons/fi';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/modalAtom';

function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer border-b border-[#F3F4F6] p-3"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="mr-4 h-11 w-11 rounded-full"
        />
      )}
      <div className="flex w-full flex-col space-y-2">
        <div className={`flex ${!postPage && 'justify-between'}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="Profile Pic"
              className="mr-4 h-11 w-11 rounded-full"
            />
          )}
          <div className="text-[#677681]">
            <div className="group inline-block">
              <h4
                className={`text-[15px] font-bold text-[#0F1419] group-hover:underline sm:text-base ${
                  !postPage && 'inline-block'
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && ' ml-1.5'}`}
              >
                @{post?.tag}
              </span>
            </div>{' '}
            ·{' '}
            <span className="text-sm hover:underline sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {!postPage && (
              <p className="mt-0.5 text-[15px] text-[#0F1419] sm:text-base">
                {post?.text}
              </p>
            )}
          </div>
          <div className="icon group ml-auto flex-shrink-0">
            <BsThreeDots className="h-5 text-[#677682] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="mt-0.5 text-[15px] text-[#0F1419] sm:text-base">
            {post?.text}
          </p>
        )}
        <img
          src={post?.image}
          alt=""
          className="mr-2 max-h-[700px] rounded-2xl object-cover"
        />
        <div
          className={`flex w-10/12 justify-between text-[#677682] ${
            postPage && 'mx-auto'
          }`}
        >
          {/* Block for the comments */}
          <div
            className="group flex items-center space-x-1"
            onClick={(e) => {
              e.stopPropagation();
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group">
              <BsChat className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>
          {/* Block for the retweet only visual */}
          <div className="icon group hover:bg-[#37C897] hover:bg-opacity-10">
            <FiRepeat className="h-5 group-hover:text-[#37C897]" />
          </div>
          {/* Block for the likes */}
          <div className="icon group hover:bg-[#F9318D] hover:bg-opacity-10">
            <BsHeart className="h-5 group-hover:text-[#F9318D]" />
          </div>
          {/* Block for the share only visual */}
          <div className="icon group">
            <FiShare className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          {/* Block for the delete post */}
          <div className="icon group hover:bg-[#fc4655] hover:bg-opacity-10">
            <BsTrash className="h-5 group-hover:text-[#fc4655]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
