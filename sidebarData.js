import { RiHashtag, RiBookmarkLine } from 'react-icons/ri'
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineFileText,
  AiOutlineHome,
} from 'react-icons/ai'
import { IoPersonOutline } from 'react-icons/io5'
import { CgMoreO } from 'react-icons/cg'

export const data = [
  { id: 1, text: 'Home', icon: AiOutlineHome, active: true },
  { id: 2, text: 'Explore', icon: RiHashtag, active: false },
  { id: 3, text: 'Notifications', icon: AiOutlineBell, active: false },
  { id: 4, text: 'Messages', icon: AiOutlineMail, active: false },
  { id: 5, text: 'Bookmarks', icon: RiBookmarkLine, active: false },
  { id: 6, text: 'Lists', icon: AiOutlineFileText, active: false },
  { id: 7, text: 'Profile', icon: IoPersonOutline, active: false },
  { id: 8, text: 'More', icon: CgMoreO, active: false },
]
