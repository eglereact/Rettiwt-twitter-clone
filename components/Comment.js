import Moment from 'react-moment';
import {
  BsChat,
  BsThreeDots,
  BsHeart,
  BsTrash,
  BsFillHeartFill,
} from 'react-icons/bs';
import { FiRepeat, FiShare } from 'react-icons/fi';

function Comment({ id, comment }) {
  return (
    <div className="flex cursor-pointer border-b border-[#F3F4F6] p-3">
      <img src={comment?.userImg} className="mr-4 h-11 w-11 rounded-full" />
      <div className="flex w-full flex-col space-y-2">
        <div className="flex justify-between">
          <div className="text-[#0F1419]">
            <div className="group inline-block">
              <h4 className="inline-block text-[15px] font-bold text-[#0F1419] group-hover:underline sm:text-base">
                {comment?.username}
              </h4>
              <span className="text-sm sm:text-[15px]"> @{comment?.tag}</span>
            </div>{' '}
            ·{' '}
            <span className="text-sm hover:underline sm:text-[15px]">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
            <p className="mt-0.5 text-[15px] text-[#0F1419] sm:text-base">
              {comment?.comment}
            </p>
          </div>
          <div className="icon group ml-auto flex-shrink-0">
            <BsThreeDots className="h-5 text-[#677682] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        <div
          className="flex w-10/12 justify-between text-[#677682]
          first-line:mx-auto"
        >
          {/* Block for the comments */}
          <div className="group flex items-center space-x-1">
            <div className="icon group">
              <BsChat className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
          </div>

          {/* Block for the delete post & for the retweet only visual  */}

          <div className="group flex items-center space-x-1">
            <div className="icon group hover:bg-[#37C897] hover:bg-opacity-10">
              <FiRepeat className="h-5 group-hover:text-[#37C897]" />
            </div>
          </div>

          {/* Block for the likes */}
          <div className="group flex items-center space-x-1">
            <div className="icon group hover:bg-[#F9318D] hover:bg-opacity-10">
              <BsHeart className="h-5 group-hover:text-[#F9318D]" />
            </div>
          </div>
          {/* Block for the share only visual */}
          <div className="icon group">
            <FiShare className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
