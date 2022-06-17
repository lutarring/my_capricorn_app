import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
  createStyles,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import StaffsContext from "./StaffsContext";
import { FC, useState } from "react";
import React from "react";
import { CancelRounded, Download } from "@mui/icons-material";
import ReactFileReader from "react-file-reader";

const CsvImportModal: FC = () => {
  const { csvImportModal, setCsvImportModal } = StaffsContext.useContainer();
  const [csvFileName, setCsvFileName] = useState("");
  // const classes = useStyles();
  const handleFiles = (files): void => {
    setCsvFileName(files[0].name);
  };
  const handleClickSubmit = async () => {
    setCsvFileName("");
    setCsvImportModal(false);
  };

  const handleClickCancel = () => {
    setCsvFileName("");
    setCsvImportModal(false);
  };

  // 削除ボタンの押下処理
  const stateClearAndCloseModel = () => {
    if (csvFileName) {
      let confirmed = window.confirm(
        "編集した取引先マスタの内容が破棄されますがよろしいですか？"
      );
      if (!confirmed) return;
      setCsvFileName("");
    }
    // if (previewType == csvType) {
    //   setPreviewData(null);
    // }
  };

  const staffsCSVImport = async () => {
    try {
      // setLoading(true);
      let csvData;
      let csvImportResult = false;

      // 取引先マスタファイル読み込む
      if (csvFileName) {
        csvData = await getCSVData(CSV_TYPE.CLIENT_MASTER);
        if (!fileFormatCheck(CSV_TYPE.CLIENT_MASTER, csvData)) {
          return;
        }
      }

      // 取引先マスタファイルインポート
      if (csvData) {
        const success = await csvImportClientMaster(csvData);
        if (success) {
          csvImportResult = true;
        }
      }

      if (
        !csvData ||
        (csvData && csvImportResult)
      ) {
        enqueueSnackbar("CSVファイルのデータをインポートしました。", {
          variant: "success",
        });
      }
    } catch (e) {
      if (isApolloError(e)) {
        const { graphQLErrors, message } = e;
        console.log(message);
        enqueueSnackbar("予期せぬエラーによりインポートに失敗しました", {
          variant: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={csvImportModal}>
      <DialogTitle>社員データインポート</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="dense" variant="outlined">
          <Button
            id="csv-file-select-button"
            variant="outlined"
            color="primary"
            endIcon={<Download />}
          >
            サンプルデータダウンロード
          </Button>
        </FormControl>

        <ReactFileReader
          elementId="csv-file-select-input"
          fileTypes={".csv"}
          handleFiles={(files) => handleFiles(files)}
        >
          <FormControl fullWidth margin="dense" variant="outlined">
            <Button
              id="csv-file-select-button"
              variant="outlined"
              color="primary"
            >
              ファイル選択
            </Button>
          </FormControl>
        </ReactFileReader>

        <FormControl fullWidth margin="dense" variant="outlined">
          <Input
            id="CSVDetail-Input"
            margin="none"
            fullWidth
            value={csvFileName}
            endAdornment={
              csvFileName ? (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={() => stateClearAndCloseModel()}
                  >
                    <CancelRounded />
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              )
            }
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="primary"
          style={{ fontWeight: "bold" }}
          onClick={() => handleClickCancel()}
          startIcon={<HighlightOffIcon />}
        >
          キャンセル
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickSubmit()}
          startIcon={<SaveIcon />}
          type="submit"
        >
          インポート実行
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CsvImportModal;
