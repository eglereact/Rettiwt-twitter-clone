import { useRef, useState } from 'react';
import {
  AiOutlineGif,
  AiOutlineSchedule,
  AiOutlineSmile,
} from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhotograph } from 'react-icons/hi';
import { RiBarChartHorizontalFill } from 'react-icons/ri';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useSession } from 'next-auth/react';

function Input() {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef(null);
  const { data: session } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadUrl,
        });
      });
    }

    setLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  };

  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-100 p-3 ${
        loading && 'opaticy-60'
      }`}
    >
      <img
        src={session.user.image}
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full"
      />
      <div className="w-full divide-y divide-gray-100">
        <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows="2"
            placeholder="What's happening?"
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#0F1419] placeholder-gray-500 outline-none"
          />
          {selectedFile && (
            <div className="relative">
              <div
                onClick={() => setSelectedFile(null)}
                className="absolute top-1 left-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full
            bg-[#15181c] bg-opacity-75 hover:bg-[#272c26]"
              >
                <FaTimes className="h-5 text-white" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="max-h-80 rounded-2xl object-contain"
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                <HiOutlinePhotograph className="h-[22px] text-2xl text-[#1D9BF0]" />
                <input
                  type="file"
                  hidden
                  onChange={addImageToPost}
                  ref={filePickerRef}
                />
              </div>
              <div className="icon">
                <AiOutlineGif className="h-[22px] text-2xl text-[#1D9BF0]" />
              </div>
              <div className="icon">
                <RiBarChartHorizontalFill className="h-[22px] text-2xl text-[#1D9BF0]" />
              </div>
              <div className="icon">
                <AiOutlineSmile
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="h-[22px] text-2xl text-[#1D9BF0]"
                />
              </div>
              <div className="icon">
                <AiOutlineSchedule className="h-[22px] text-2xl text-[#1D9BF0]" />
              </div>
              <div className="icon">
                <HiOutlineLocationMarker className="h-[22px] text-2xl text-[#1D9BF0]" />
              </div>
              {showEmojis && (
                <Picker
                  onSelect={addEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme="light"
                />
              )}
            </div>
            <button
              className="rounded-full bg-[#1d9bf0] px-4 py-1.5 font-bold text-white shadow-md
          hover:bg-[#1a8cd8] disabled:cursor-default disabled:opacity-50 disabled:hover:bg-[#1d9bf0]"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
