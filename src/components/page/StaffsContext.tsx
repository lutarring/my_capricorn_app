import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { query, orderBy } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { toString } from "lodash";

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

  const firebaseConfig = {
    apiKey: "AIzaSyDVbWOjFGqNiw1ZrwEen2a-fC1AFXbYcfM",
    authDomain: "my-capricorn-app.firebaseapp.com",
    databaseURL:
      "https://my-capricorn-app-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-capricorn-app",
    storageBucket: "my-capricorn-app.appspot.com",
    messagingSenderId: "736317746971",
    appId: "1:736317746971:web:2482decc19d14cbe6dedbe",
    measurementId: "G-Y1JLQF5M0M",
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
    setMaxId(staffList[0].id);
    return staffList;
  };

  const createStaff = async (db, value, id) => {
    console.log("create!");
    await setDoc(doc(db, "staffs", toString(id)), {
      id: id,
      name: value.name,
      classification: value.classification.label,
      role: value.role.label,
      organization: value.organization.label,
      mail: value.mail,
      phone: value.phone,
    });
    console.log(maxId);
    setMaxId(maxId + 1);
    console.log(maxId);
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