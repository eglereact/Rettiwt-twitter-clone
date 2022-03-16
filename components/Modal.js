import { async } from '@firebase/util';
import { Dialog, Transition } from '@headlessui/react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import {
  AiOutlineGif,
  AiOutlineSchedule,
  AiOutlineSmile,
} from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhotograph } from 'react-icons/hi';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import Moment from 'react-moment';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/modalAtom';
import { db } from '../firebase';

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState();
  const [postId, setPostId] = useRecoilState(postIdState);
  const [comment, setComment] = useState('');
  const router = useRouter();

  useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });
    setIsOpen(false);
    setComment('');
    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 pt-8" onClose={setIsOpen}>
        <div className="flex min-h-[800px] items-start justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block transform overflow-hidden rounded-2xl bg-white text-left align-bottom 
            shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle"
            >
              <div className="flex items-center border-b border-[#F3F4F6] px-1.5 py-2 ">
                <div
                  className="hoverAnimation flex h-9 w-9 items-center justify-center xl:px-0"
                  onClick={() => setIsOpen(false)}
                >
                  <FaTimes className="h-[22px] text-[#0F1419]" />
                </div>
              </div>
              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  <div className="relative flex gap-x-3 text-[#0F1419]">
                    <span className="absolute left-5 top-11 z-[-1] h-full w-0.5 bg-[#CFD9DE]"></span>
                    <img
                      src={post?.userImg}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div>
                      <div className="group inline-block">
                        <h4 className="inline-block text-[15px] font-bold text-[#0F1419] group-hover:underline sm:text-base">
                          {post?.username}
                        </h4>
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}
                        </span>
                      </div>{' '}
                      ·{' '}
                      <span className="text-sm hover:underline sm:text-[15px]">
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className="mt-0.5 text-[15px] text-[#0F1419] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>
                  <div className="mt-7 flex w-full space-x-3">
                    <img
                      src={session.user.image}
                      alt=""
                      className="h-11 w-11 rounded-full"
                    />
                    <div className="mt-2 flex-grow">
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="min-h-[80px] w-full bg-transparent text-lg tracking-wide
                        text-[#0F1419] placeholder-gray-500 outline-none"
                      />
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <HiOutlinePhotograph className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                          <div className="icon">
                            <AiOutlineGif className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                          <div className="icon">
                            <RiBarChartHorizontalFill className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                          <div className="icon">
                            <AiOutlineSmile className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                          <div className="icon">
                            <AiOutlineSchedule className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                          <div className="icon">
                            <HiOutlineLocationMarker className="h-[22px] text-2xl text-[#1D9BF0]" />
                          </div>
                        </div>
                        <button
                          className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md
                            hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
                          disabled={!comment.trim()}
                          onClick={sendComment}
                          type="submit"
                        >
                          Tweet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
