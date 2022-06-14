import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import StaffsContext from "./StaffsContext";
import { ChangeEvent, FC, useState } from "react";
import React from "react";
import { useForm } from 'react-hook-form';


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


export type StaffModalProps = {
  id: number;
  name: string;
  classification: Option[];
  role: Option[];
  organization: Option[];
  mail: string;
  phone: string;
  initialState?: State;
  disables?: Array<String>;
  onSubmit(values: State): Promise<any>;
  onCancel(): any;
  maps?: State;
};

export const INITIAL_STATE: State = {
  name: '',
  classification: null,
  role: null,
  organization: null,
  mail: '',
  phone: '',
}


const Modal: FC<StaffModalProps> = (
  onSubmit,
  onCancel,
  initialState = INITIAL_STATE,
) => {
  const [values, setValues] = React.useState<State>({
    name: '',
    classification: null,
    role: null,
    organization: null,
    mail: '',
    phone: '',
  });

  const { modal,setModal } = StaffsContext.useContainer();
  const queryStr = "query MyQuery { users { id email } }"
  const query = { query: queryStr }
  const { handleSubmit } = useForm();

  const handleInputChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValues = { ...values, [name]: event.target.value };
    setValues(newValues);
  };

  const handleAutocompleteChange = (name: keyof State) => (
    event: object, value: any,
  ) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
  };
  
  const handleClickSubmit = () => {
    console.log(values);
  }

  const handleClickCancel = () => {
    setModal(false);
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
    <Dialog open={modal}>
      <DialogTitle>新規登録</DialogTitle>
      <DialogContent>
        <TextField
          label="名前"
          required
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
                required
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
                required
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
                required
              />
            )}
          />
        </FormControl>
        <TextField
          label="メールアドレス"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={values.mail}
          onChange={handleInputChange('mail')}
        />
         <TextField
          label="電話番号"
          required
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
        //   disabled={!changed || error}
          onClick={() => handleClickSubmit()}
          startIcon={<SaveIcon />}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );


}

export default Modal