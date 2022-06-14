import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';
import StaffsContext from "./StaffsContext";
import { FC } from "react";
import React from "react";

// type defined for Autocomplete options data
export type Option = {
  value: string;
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


const Modal = (
) => {
  const { modal,setModal } = StaffsContext.useContainer();
  const queryStr = "query MyQuery { users { id email } }"
  const query = { query: queryStr }

  
  const handleClickSubmit = () => {
    setModal(false)
  }

  const handleClickCancel = () => {
    setModal(false)
  }

  const classificationOptions = [
  { label: 'プロパー' },
  { label: '協力会社' },
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
          value={123}
        //   error={}
        //   helperText={}
        //   onChange={}
          />
          <FormControl fullWidth margin="dense" variant="outlined">
          <Autocomplete
            options={classificationOptions}
            disableClearable
            fullWidth
            id="combo-box-classification"
            // onChange={handleAutocompleteSelectChange('classification')}
            // getOptionSelected={(option, value) => {
            //   return value && option.value === value.value;
            // }}
            // getOptionLabel={(option) => option.value}
            // value={}
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
        <TextField
          label="要員区分"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 50 }}
          value={123}
        //   onChange={}
        />
        <TextField
          label="ロール."
          variant="outlined"
          fullWidth
          margin="normal"
        //   disabled={values.moduleDivision?.value !== HARDWARE}
          inputProps={{ maxLength: 12 }}
          value={123}
        //   error={!!errors.articlesManagementNo}
        //   helperText={errors.articlesManagementNo}
        //   onChange={handleInputChange('articlesManagementNo')}
        />
        <TextField
          label="組織"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={123}
        //   error={}
        //   helperText={}
        //   onChange={}
        />
        <TextField
          label="メールアドレス"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={123}
        //   error={}
        //   helperText={}
        //   onChange={}
        />
         <TextField
          label="電話番号"
          required
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 30 }}
          value={123}
        //   error={}
        //   helperText={}
        //   onChange={}
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