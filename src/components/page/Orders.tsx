import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import StaffsContext from './StaffsContext';

// Generate Order Data
function createData(
  id: number,
  name: string,
  classification: string,
  role: string,
  organization: string,
  mail: string,
  phone: string,
) {
  return { id, name, classification, role, organization,mail, phone};
}

// function preventDefault(event: React.MouseEvent) {
//   event.preventDefault();
// }

const Orders = () => {
  const { staffs } = StaffsContext.useContainer();
  
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
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link> */}
    </React.Fragment>
  );
}

export default Orders;
