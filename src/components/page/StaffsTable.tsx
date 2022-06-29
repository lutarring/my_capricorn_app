import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import StaffsContext from './StaffsContext';
import { IconButton, Tooltip } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Staffs = () => {
  const { staffs } = StaffsContext.useContainer();

  const handleDelete = (id) => {
    let confirmed = window.confirm(
      "削除してもよろしいですか？"
    );
    if (!confirmed) return;

  };

  return (
    <React.Fragment>
      <Title>社員一覧</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>名前</TableCell>
            <TableCell>要員区分</TableCell>
            <TableCell>ロール</TableCell>
            <TableCell>組織</TableCell>
            <TableCell>メールアドレス</TableCell>
            <TableCell>電話番号</TableCell>
            {/* <TableCell></TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {staffs.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.classification}</TableCell>
              <TableCell>{s.role}</TableCell>
              <TableCell>{s.organization}</TableCell>
              <TableCell>{s.mail}</TableCell>
              <TableCell>{s.phone}</TableCell>
              {/* <TableCell>
                <Tooltip title="削除" arrow placement="right-start">
                  <IconButton size="small" onClick={handleDelete}>
                    <HighlightOffIcon color="info" />
                  </IconButton>
                </Tooltip>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default Staffs;
