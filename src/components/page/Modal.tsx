import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import StaffsContext from "./StaffsContext";
import { ChangeEvent, FC, useState } from "react";
import React from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { toString } from 'lodash';
import useForm from "../common/useForm";


// type defined for Autocomplete options data
export type Option = {
  label: string;
};

export interface State {
  name: string;
  classification: Option;
  role: Option;
  organization: Option;
  mail: string;
  phone: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDVbWOjFGqNiw1ZrwEen2a-fC1AFXbYcfM",
  authDomain: "my-capricorn-app.firebaseapp.com",
  databaseURL: "https://my-capricorn-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-capricorn-app",
  storageBucket: "my-capricorn-app.appspot.com",
  messagingSenderId: "736317746971",
  appId: "1:736317746971:web:2482decc19d14cbe6dedbe",
  measurementId: "G-Y1JLQF5M0M"
};

export type MadalProps = {
  onSubmit(values: State): Promise<any>;
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


const Modal: FC<MadalProps> = ({ onSubmit }) => {
  // const [values, setValues] = React.useState<State>({
  //   name: '',
  //   classification: null,
  //   role: null,
  //   organization: null,
  //   mail: '',
  //   phone: '',
  // });

  const { modal, setModal, maxId } = StaffsContext.useContainer();
  
  const { handleChange, handleSubmit, values } = useForm<State>({});

  // const handleInputChange = (name: keyof State) => (
  //   event: React.ChangeEvent<HTMLTextAreaElement>
  // ) => {
  //   const newValues = { ...values, [name]: event.target.value };
  //   setValues(newValues);
  // };

  // const handleAutocompleteChange = (name: keyof State) => (
  //   event: object, value: any,
  // ) => {
  //   const newValues = { ...values, [name]: value };
  //   setValues(newValues);
  // };

  type StateKey = keyof State;

  const handleInputChange =
    (name: StateKey) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      handleChange(name, value);
    };

  const handleAutocompleteChange =
    (name: StateKey) => (event: object, value: any, reason: string) => {
      handleChange(name, value);
    };
  
  // const handleClickSubmit = async () => {
  //   console.log(values)
  //   createStaffs(db, values)
  //   setModal(false);
  //   // window.location.reload()
  //     //const onSubmit = (data: State): void => console.log('data',data);
  // }

  const handleClickSubmit = async () => {
    handleSubmit(onSubmit);
  };

  const handleClickCancel = () => {
    setModal(false);
  }

  const createStaffs = async (db, value) => {
    await setDoc(doc(db, 'staffs', toString(maxId)), {
    id: maxId,
    name: value.name,
    classification: value.classification.label,
    role: value.role.label,
    organization: value.organization.label,
    mail: value.mail,
    phone: value.phone,
    });
  }

  const classificationOptions:Option[] = [
  { label: 'プロパー' },
  { label: '協力会社' },
  ]

  const roleOptions = [
  { label: '社員' },
  { label: '管理者' },
  { label: '一般' },
  ]

  const organizationOptions = [
  { label: 'ITサービス事業本部' },
  { label: 'デジタル事業部' },
  { label: 'デザイン統括部' },
  { label: '事業推進担当' },
  ]


    return (
      <Dialog open={modal} >
      <DialogTitle>新規登録</DialogTitle>
        <DialogContent>
         
        <TextField
          label="名前"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={values.name}
          onChange={handleInputChange('name')}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
          <Autocomplete
            options={classificationOptions}
            disableClearable
            fullWidth
            id="combo-box-classification"
            value={values.classification}
            onChange={handleAutocompleteChange('classification')}      
            renderInput={(params) => (
              <TextField
                {...params}
                label="要員区分"
                variant="outlined"
              />
            )}
          />
          </FormControl>
          
          <FormControl fullWidth margin="dense" variant="outlined">
          <Autocomplete
            options={roleOptions}
            disableClearable
            fullWidth
            id="combo-box-role"
            value={values.role}
            onChange={handleAutocompleteChange('role')} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="ロール"
                variant="outlined"
              />
            )}
          />
          </FormControl>

          <FormControl fullWidth margin="dense" variant="outlined">
          <Autocomplete
            options={organizationOptions}
            disableClearable
            fullWidth
            id="combo-box-organization"
            value={values.organization}
            onChange={handleAutocompleteChange('organization')} 
            renderInput={(params) => (
              <TextField
                {...params}
                label="組織"
                variant="outlined"
              />
            )}
          />
        </FormControl>
        <TextField
          label="メールアドレス"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={values.mail}
          onChange={handleInputChange('mail')}
        />
         <TextField
          label="電話番号"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={values.phone}
          onChange={handleInputChange('phone')}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          style={{ fontWeight: 'bold' }}
          onClick={() => handleClickCancel()}
          startIcon={<HighlightOffIcon />}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
        // disabled={!changed || error}
          onClick={() => handleClickSubmit()}
          startIcon={<SaveIcon />}
          type="submit"  
        >
          保存
        </Button>
          </DialogActions>
    </Dialog>
  );


}

export default Modal