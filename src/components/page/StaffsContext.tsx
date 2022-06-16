import { useState } from 'react';
import { createContainer } from 'unstated-next';

// main func
const useStaffsContainer = () => {
  const [staffs, setStaffs] = useState([]);
  const [modal, setModal] = useState(false);
  const [maxId, setMaxId] = useState(0);


  // return
  return {
    modal,
    setModal,
    staffs,
    setStaffs,
    maxId,
    setMaxId,
  };
};

const StaffsContext = createContainer(useStaffsContainer);
export default StaffsContext;