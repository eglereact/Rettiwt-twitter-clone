import Image from 'next/image';
import { BsSearch } from 'react-icons/bs';
import Trending from './Trending';

function Widgets({ trendingResults, followResults }) {
  return (
    <div className="ml-8 hidden space-y-5 py-1 lg:inline xl:w-[450px]">
      <div className="sticky top-0 z-50 w-11/12 bg-white py-1.5 xl:w-9/12">
        <div className="relative flex items-center rounded-full bg-[#EFF3F4] p-3">
          <BsSearch className="z-50 h-5 text-gray-500 focus:text-[#1d9bf0]" />
          <input
            className="absolute inset-0 w-full rounded-full border border-transparent bg-transparent pl-11 text-[#0F1419] placeholder-gray-500
          outline-none focus:border-[#1d9bf0] focus:bg-white focus:shadow-lg "
            type="text"
            placeholder="Search Rettiwt"
          />
        </div>
      </div>
      <div className="w-11/12 space-y-3 rounded-xl bg-[#F7F9F9] pt-2 text-[#0F1419] xl:w-9/12">
        <h4 className="px-4 text-xl font-bold">What's happening</h4>
        {trendingResults.map((res, index) => (
          <Trending key={index} res={res} />
        ))}
        <button
          className="easy-out flex w-full cursor-pointer items-center justify-between rounded-bl-lg rounded-br-lg
           px-4 py-3 font-light text-[#1d9bf0] transition duration-200 hover:bg-[#EFF1F1]"
        >
          Show more
        </button>
      </div>
      <div className="w-11/12 space-y-3 rounded-xl bg-[#F7F9F9] pt-2 text-[#0F1419] xl:w-9/12">
        <h4 className="px-4 text-xl font-bold">You might like</h4>
        {followResults.map((res, index) => (
          <div
            key={index}
            className="easy-out flex w-full cursor-pointer items-center
           px-4 py-3 transition duration-200 hover:bg-[#EFF1F1]"
          >
            <Image
              src={res.userImg}
              width={50}
              height={50}
              objectFit="cover"
              className="rounded-full"
            />
            <div className="group ml-4 leading-5">
              <h4 className="font-bold group-hover:underline">
                {res.username}
              </h4>
              <h5 className="text-[15px] text-gray-500">{res.tag}</h5>
            </div>
            <button className="ml-auto rounded-full bg-[#0F1419] py-1.5 px-3.5 font-bold text-white hover:bg-[#272C30]">
              Follow
            </button>
          </div>
        ))}
        <button
          className="easy-out flex w-full cursor-pointer items-center justify-between rounded-bl-lg rounded-br-lg
           px-4 py-3 font-light text-[#1d9bf0] transition duration-200 hover:bg-[#EFF1F1]"
        >
          Show more
        </button>
      </div>
    </div>
  );
}

export default Widgets;
