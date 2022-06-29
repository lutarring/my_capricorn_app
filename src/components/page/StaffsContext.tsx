import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { query, orderBy } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { toString, toNumber } from "lodash";

// main func
const useStaffsContainer = () => {
  //data
  const [staffs, setStaffs] = useState([]);
  const [maxId, setMaxId] = useState(0);

  //Modal
  const [createModal, setCreateModal] = useState(false);
  const [csvImportModal, setCsvImportModal] = useState(false);

  // CSVファイル設定
  const [csvFile, setCsvFile] = useState<File>();

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    //TODO
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);

  const staffsCol = collection(db, "staffs");
  const getStaffs = async () => {
    const first = query(staffsCol, orderBy("id", "desc"));
    const staffSnapshot = await getDocs(first);
    const staffList = staffSnapshot.docs.map((doc) => doc.data());
    setMaxId(toNumber(staffList[0].id));
    return staffList;
  };

  const createStaff = async (db, value, id) => {
    await setDoc(doc(db, "staffs", toString(id)), {
      id: toString(id),
      name: value.name,
      classification: value.classification.label,
      role: value.role.label,
      organization: value.organization.label,
      mail: value.mail,
      phone: value.phone,
    });
  };

  const createStaffs = async (db, value, id) => {
    await setDoc(doc(db, "staffs", toString(id)), {
      id: value.id,
      name: value.name,
      classification: value.classification,
      role: value.role,
      organization: value.organization,
      mail: value.mail,
      phone: value.phone,
    });
  };

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
    csvFile,
    setCsvFile,
    getStaffs,
    createStaff,
    createStaffs,
    db,
  };
};;;

const StaffsContext = createContainer(useStaffsContainer);
export default StaffsContext;