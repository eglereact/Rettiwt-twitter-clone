import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';

function Trending({ res }) {
  return (
    <div
      className="easy-out flex w-full cursor-pointer items-center justify-between
           px-4 py-3 transition duration-200 hover:bg-[#EFF1F1]"
    >
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-[#0F1419]">{res.heading}</p>
        <h6 className="max-w-[250px] text-sm font-bold">{res.description}</h6>
        <p className="max-w-[250px] text-xs font-medium text-[#0F1419]">
          Trending with{' '}
          {res.tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>
      {res.img ? (
        <Image
          src={res.img}
          width={70}
          height={70}
          objectFit="cover"
          className="rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <BsThreeDots className="h-5 text-[#0F1419] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  );
}

export default Trending;
