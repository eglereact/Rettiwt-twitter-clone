import React from 'react';
import { FaTwitter } from 'react-icons/fa';
import SidebarLink from './SidebarLink';
import { data } from './../sidebarData';
import { FiMoreVertical } from 'react-icons/fi';
import { signOut, useSession } from 'next-auth/react';

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="fixed hidden h-full flex-col items-center p-2 sm:flex xl:w-[340px] xl:items-start">
      <div className="hoverAnimation flex h-14 w-14 items-center justify-center p-0 xl:ml-24">
        <FaTwitter size={30} />
      </div>
      <div className="mt-4 mb-2.5 space-y-2.5 xl:ml-24">
        {data.map((link) => (
          <SidebarLink
            key={link.id}
            text={link.text}
            Icon={link.icon}
            active={link.active}
          />
        ))}
      </div>
      <button
        className="ml-auto hidden h-[52px] w-56 rounded-full bg-[#1d9bf0] text-lg font-bold text-white
      shadow-md hover:bg-[#1a8cd8] xl:inline"
      >
        Tweet
      </button>
      <div
        className="hoverAnimation mt-auto flex items-center justify-center xl:mr-1 xl:ml-auto"
        onClick={signOut}
      >
        <img
          src={session?.user.image}
          alt=""
          className="h-10 w-10 rounded-full xl:mr-2.5"
        />
        <div className="hidden leading-5 xl:inline">
          <h4 className="font-bold">{session?.user.name}</h4>
          <p className="text-gray-600">@{session?.user.tag}</p>
        </div>
        <FiMoreVertical className="ml-10 hidden h-5 xl:inline" />
      </div>
    </div>
  );
}

export default Sidebar;
