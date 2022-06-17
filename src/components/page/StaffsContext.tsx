import { useState } from 'react';
import { createContainer } from 'unstated-next';

// main func
const useStaffsContainer = () => {
  const [staffs, setStaffs] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [maxId, setMaxId] = useState(0);
  const [csvImportModal, setCsvImportModal] = useState(false);



  // return
  return {
    createModal,
    setCreateModal,
    csvImportModal,
    setCsvImportModal,
    staffs,
    setStaffs,
    maxId,
    setMaxId,
  };
};

const StaffsContext = createContainer(useStaffsContainer);
export default StaffsContext;