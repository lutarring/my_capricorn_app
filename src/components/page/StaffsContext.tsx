import { useState } from 'react';
import { createContainer } from 'unstated-next';


// main func
const useStaffsContainer = () => { 
    const [staffs, setStaffs] = useState([]);
    const [modal, setModal] =useState(false);



    // return
    return {
        modal,
        setModal,
        staffs,
        setStaffs,
    }
}

const StaffsContext = createContainer(useStaffsContainer);
export default StaffsContext;