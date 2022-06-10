import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SaveIcon from '@mui/icons-material/Save';

const Modal = () => {
    return (
    <Dialog open={true}>
     
      <DialogTitle>新規登録</DialogTitle>
      <DialogContent>
        <TextField
          label="モジュール名"
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
          label="別名"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 50 }}
          value={123}
        //   onChange={}
        />
        
        <Grid container>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">棚卸対象 *</FormLabel>
              <RadioGroup
                row
                aria-label="棚卸対象"
                name="radio-button-inventory-division-target-flag"
                value={123}
                // onChange={handleInputChange('inventoryDivision')}
              >
                <FormControlLabel
                  control={
                    <Radio
                    //   checked={values.inventoryDivision == 1}
                      color="default"
                      value={1}
                      inputProps={{ 'aria-label': '対象' }}
                    //   onChange={(target) =>
                    //     handleChange('inventoryDivision', 1)
                    //   }
                    />
                  }
                  label="対象"
                />
                <FormControlLabel
                  control={
                    <Radio
                    //   checked={values.inventoryDivision == 2}
                      color="default"
                      value={2}
                      inputProps={{ 'aria-label': '対象外' }}
                    //   onChange={(target) =>
                    //     handleChange('inventoryDivision', 2)
                    //   }
                    />
                  }
                  label="対象外"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <TextField
          label="物品管理No."
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
          multiline
          rows={4}
          label="摘要"
          variant="outlined"
          fullWidth
          margin="normal"
          inputProps={{ maxLength: 300 }}
          value={123}
        //   error={!!errors.remarks}
        //   helperText={errors.remarks}
        //   onChange={handleInputChange('remarks')}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          style={{ fontWeight: 'bold' }}
        //   onClick={() => handleClickCancel()}
          startIcon={<HighlightOffIcon />}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
        //   disabled={!changed || error}
        //   onClick={() => handleClickSubmit()}
          startIcon={<SaveIcon />}
        >
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );


}

export default Modal