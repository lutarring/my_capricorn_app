import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import StaffsContext from './StaffsContext';
import SimpleTable, { Column } from '../common/SimpleTable';
import { SortingState } from "@devexpress/dx-react-grid";


const Staffs = () => {
  const { staffs, onPageChange, searchChange, searchTrigger } =
    StaffsContext.useContainer();

  // simpleTable columns
  const columns: Column[] = [
    {
      name: "name",
      title: "名前",
      width: "13%",
      indention: true,
    },
    {
      name: "classification",
      title: "要員区分",
      width: "13%",
      indention: true,
    },
    {
      name: "role",
      title: "ロール",
      width: "13%",
      indention: true,
    },
    {
      name: "organization",
      title: "組織",
      width: "20%",
      indention: true,
    },
    {
      name: "mail",
      title: "メールアドレス",
      width: "20%",
      indention: true,
    },
    {
      name: "phone",
      title: "電話番号",
      width: "15%",
      indention: true,
    },
  ];

  const count = staffs.length;

  // ソート無效化
  const columnExtensions: Array<SortingState.ColumnExtension> = [
    { columnName: "clientBaseCodes", sortingEnabled: false },
  ];

  // 詳細画面へ遷移する。
  const onClickRow = (id) => {
    router
      .push(URL.CLIENT_DETAIL, URL.CLIENT_DETAIL.replace("[clientId]", id))
      .catch()
      .then();
  };

  return (
    <React.Fragment>
      <SimpleTable
        data={staffs}
        isLoading={false}
        columns={columns}
        defaultSorting={[{ columnName: "id", direction: "desc" }]}
        count={count}
        resourceName={"取引先情報"}
        columnExtensions={columnExtensions}
        onFormChange={(limit, offset, orderBy, order) => {
          onPageChange(limit, offset, orderBy, order as "asc" | "desc");
        }}
        onSearchChange={searchChange}
        height={searchTrigger ? "280px" : "280px"}
        onClickRow={onClickRow}
      />
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Staffs;
