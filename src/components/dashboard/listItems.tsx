import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TocIcon from '@mui/icons-material/Toc';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
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

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
