import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TocIcon from "@mui/icons-material/Toc";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import StaffsContext from "./StaffsContext";
import CsvDownloader from "react-csv-downloader";
import moment from "moment";

const ListItems = () => {
  const { setCreateModal, setCsvImportModal,staffs, setStaffs } =
    StaffsContext.useContainer();
  const handleCreateModal = () => {
    setCreateModal(true);
  };
  const handleCsvModal = () => {
    setCsvImportModal(true);
  };

  const handleClickSectionCsvDown = async () => {
    //setSectionsCsvOutputBtnFlag(true);
    var csvData = [];
    csvData = csvFormatOrganize(staffs, staffsCsvItem);
    return csvData;
  };

  // CSVファイルのフォーマット整理
  const csvFormatOrganize = (dataList, itemMap) => {
    return dataList.map((data) => {
      var timeData = {};
      itemMap.forEach((v) => {
        // フォーマットに合わせるため、wrapColumnChar使わず
        timeData[v.id] = data[v.id] ? '"' + data[v.id] + '"' : null;
      });

      return timeData;
    });
  };

  const staffsCsvItem = [
    { displayName: '"ID"', id: "id" },
    { displayName: '""名前', id: "name" },
    { displayName: '"要員区分	"', id: "classification" },
    { displayName: '"ロール"', id: "role" },
    { displayName: '"組織"', id: "organization" },
    { displayName: '"メールアドレス"', id: "mail" },
    { displayName: '"電話番号"', id: "phone" },
  ];

  return (
    <React.Fragment>
      <ListItemButton onClick={handleCreateModal}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="新規登録" />
      </ListItemButton>
      {/* <ListItemButton>
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText primary="メンバー一覧" />
      </ListItemButton> */}
      <ListItemButton onClick={handleCsvModal}>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="CSVインポート" />
      </ListItemButton>
      <CsvDownloader
        datas={handleClickSectionCsvDown}
        columns={staffsCsvItem}
        filename={
          "staffs_list_" + moment(new Date()).format("YYYYMMDD") + ".csv"
        }
        bom={true}
        // disabled={sectionsCsvOutputBtnFlag}
      >
        <ListItemButton>
          <ListItemIcon>
            <DownloadIcon />
          </ListItemIcon>
          <ListItemText primary="CSVエクスポート" />
        </ListItemButton>
      </CsvDownloader>
    </React.Fragment>
  );
};

export default ListItems;
