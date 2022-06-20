import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SaveIcon from "@mui/icons-material/Save";
import StaffsContext from "./StaffsContext";
import { FC, useState } from "react";
import React from "react";
import { CancelRounded, Download } from "@mui/icons-material";
import ReactFileReader from "react-file-reader";
import sample from "../../assets/staffs_list_sample.csv";

const CsvImportModal: FC = () => {
  const {
    csvImportModal,
    setCsvImportModal,
    csvFile,
    setCsvFile,
    db,
    createStaffs,
    getStaffs,
    setStaffs,
  } = StaffsContext.useContainer();
  const [csvFileName, setCsvFileName] = useState("");
  // const classes = useStyles();
  const handleFiles = (files): void => {
    setCsvFileName(files[0].name);
    setCsvFile(files[0]);
    console.log(csvFile);
  };
  const handleClickSubmit = async () => {
    staffsCSVImport();
    setCsvFileName("");
    await getStaffs().then((data) => {
      setStaffs(data);
    });
    setCsvImportModal(false);
  };

  const handleClickCancel = () => {
    setCsvFileName("");
    setCsvFile(undefined);
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

  // CSVファイルの内容を読み取り、JSONに変換する
  const getCSVData = () => {
    return new Promise((resolve, reject) => {
      try {
        let file: File;
        if (csvFile !== undefined) {
          file = csvFile;

          const reader = new FileReader();
          reader.readAsText(file, "UTF-8");
          const csv = require("csvtojson");
          reader.onload = (e) => {
            const jsonArray = csv({
              noheader: true, // CSVのタイトル行あり・なし設定
              output: "csv",
            }).fromString(e.target?.result);
            return resolve(jsonArray);
          };
        }
      } catch (error) {
        return resolve([]);
      }
    });
  };

  const staffsCSVImport = async () => {
    try {
      // setLoading(true);
      let csvData;
      // let csvImportResult = false;

      // 取引先マスタファイル読み込む
      if (csvFile) {
        csvData = await getCSVData();
        // if (!fileFormatCheck(csvData)) {
        //   return;
        // }
      }

      // 取引先マスタファイルインポート
      if (csvData) {
        console.log(csvData);
        csvData.shift();
        console.log(csvData);
        csvData.map((data) => {
          const values = {
            id: data[0],
            name: data[1],
            classification: data[2],
            role: data[3],
            organization: data[4],
            mail: data[5],
            phone: data[6],
          };
          console.log(values.id);
          createStaffs(db, values, values.id);
        });
      }
    } catch (e) {
      console.log("Error getting cached document:", e);
    } finally {
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
            href={sample}
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
          disabled={!csvFile}
        >
          インポート実行
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CsvImportModal;
