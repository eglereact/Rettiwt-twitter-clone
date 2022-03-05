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

function Input() {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addImageToPost = () => {};

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-100 p-3`}
    >
      <img
        src="https://styles.redditmedia.com/t5_505g04/styles/profileIcon_snooad6477ea-4207-4b46-a376-476bf6c21d57-headshot.png?width=256&height=256&crop=256:256,smart&s=9306e431eacd8815477d0c8bc12ae3ebc8c451b7"
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
        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div className="icon" onClick={() => filePickerRef.current.click()}>
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
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Input;
