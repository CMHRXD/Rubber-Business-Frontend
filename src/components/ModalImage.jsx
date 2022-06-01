import {useState} from 'react'
import icon from '../public/img/icon.jpg';
import {GiCancel} from 'react-icons/gi';

const ModalImage = ({url}) => {
  
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div>
        <a>
          <img src={url} alt="img" className=' w-10' onClick={()=> setShowModal(!showModal)} />
        </a>
      </div>
      
      <div className={`${showModal ? "" : "hidden"}  bg-black absolute bg-opacity-50 inset-0 flex justify-center items-center`}>
        <div className='bg-gray-200'>
          <GiCancel className='text-red-500 text-2xl' onClick={()=> setShowModal(!showModal)} />
          <img src={url} alt="img" className=' w-[500px]' />

        </div>
      </div>
    </>
  )
}

export default ModalImage;