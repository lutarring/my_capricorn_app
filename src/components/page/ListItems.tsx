import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TocIcon from '@mui/icons-material/Toc';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import StaffsContext from './StaffsContext';

const ListItems = () => {
  const { modal, setModal, staffs, setStaffs } = StaffsContext.useContainer();
  const handleModal = () => {
    setModal(true);
  }

  return (
    <React.Fragment>
      <ListItemButton onClick={handleModal}>
        <ListItemIcon>
          <AddCircleOutlineIcon />
        </ListItemIcon>
        <ListItemText primary="新規登録" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <TocIcon />
        </ListItemIcon>
        <ListItemText primary="メンバー一覧" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="CSVインポート" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DownloadIcon />
        </ListItemIcon>
        <ListItemText primary="CSVエクスポート" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems
  //  const secondaryListItems = (
  //   <React.Fragment>
  //     <ListSubheader component="div" inset>
  //       Saved reports
  //     </ListSubheader>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Current month" />
  //     </ListItemButton>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Last quarter" />
  //     </ListItemButton>
  //     <ListItemButton>
  //       <ListItemIcon>
  //         <AssignmentIcon />
  //       </ListItemIcon>
  //       <ListItemText primary="Year-end sale" />
  //     </ListItemButton>
  //   </React.Fragment>
  // );
