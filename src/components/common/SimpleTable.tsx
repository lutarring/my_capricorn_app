import { makeStyles } from "@material-ui/core/styles";
import {
  Grid as DevexGrid,
  Table,
  PagingPanel,
  TableColumnResizing,
  TableHeaderRow,
  VirtualTable,
} from "@devexpress/dx-react-grid-material-ui";

import {
  VirtualTableState,
  Sorting,
  CustomPaging,
} from "@devexpress/dx-react-grid";
import React, { useEffect, useState } from "react";
import { PagingState, SortingState } from "@devexpress/dx-react-grid";
import { DataTypeProvider } from "@devexpress/dx-react-grid/";
import { CircularProgress, Button } from "@material-ui/core";
import Link from "./Link";
import { hoveredBackground } from "./colors";

const useClasses = makeStyles({
  // 名名称（選択項目）
  name: {
    color: "#466199",
    fontWeight: "bold",
    cursor: "pointer",
  },
  // 行ホバー
  rowHover: {
    "&:hover": {
      backgroundColor: hoveredBackground,
    },
  },
  // クリックイベント　行ホバー
  onClickRowHover: {
    "&:hover": {
      backgroundColor: hoveredBackground,
      cursor: "pointer",
    },
  },
  fab: {
    margin: "8px",
  },
  loading: {
    position: "absolute",
    top: "50%",
    left: "55%",
    width: "100%",
    height: "100%",
  },
  newLine: {
    whiteSpace: "normal",
    wordWrap: "break-word",
  },
  omit: {
    wordWrap: "break-word",
  },
});

export type Column = {
  name: string;
  title: string;
  width: string | number;
  type?:
    | "button"
    | "link"
    | "text"
    | "other"
    | "linkSuppliers"
    | "linkStaffs"
    | "linkOrganizations";
  format?: (value) => any;
  onClick?: (id) => void;
  indention?: boolean;
};

export type SimpleTableProps = {
  data: any;
  columns: Column[];
  resourceName: string;
  onFormChange: (
    limit: number,
    offset: number,
    orderBy: string,
    order: "asc" | "desc"
  ) => void;
  count: number;
  isLoading?: boolean;
  defaultSorting?: Array<Sorting>;
  columnExtensions?: Array<SortingState.ColumnExtension>;
  onSearchChange?: {
    limit: number;
    offset: number;
    orderBy: string;
    order: "asc" | "desc";
  };
  height?: string;
  onClickRow?: any;
};

const defaultSearchChange: SimpleTableProps["onSearchChange"] = {
  limit: 10,
  offset: 0,
  orderBy: "id",
  order: "desc",
};

/**
 * 一覧グリッド
 */
const SimpleTable: React.FC<SimpleTableProps> = ({
  data,
  columns,
  isLoading,
  resourceName,
  defaultSorting,
  onFormChange,
  count,
  columnExtensions,
  onSearchChange = defaultSearchChange,
  height,
  onClickRow,
}) => {
  const formatColumns = columns.filter((c) => {
    if (c.type && c.type != "text") return c;
  });

  // カラム幅情報
  const defaultColumnWidths = columns.map((c) => ({
    columnName: c.name,
    width: c.width,
  }));

  // 枠コンポーネント
  const TableCell: React.ComponentType<Table.DataCellProps> = (props) => {
    const classes = useClasses();
    return (
      <Table.Cell
        {...props}
        className={
          // @ts-ignore
          props?.column?.indention == undefined ||
          // @ts-ignore
          props?.column?.indention == false
            ? classes.omit
            : classes.newLine
        }
      />
    );
  };

  // 行コンポーネント（リンク）
  const TableRow: React.ComponentType<Table.DataRowProps> = ({
    row,
    children,
    ...props
  }) => {
    const classes = useClasses();
    return (
      <Table.Row
        className={
          typeof onClickRow == "function"
            ? classes.onClickRowHover
            : classes.rowHover
        }
        row={row}
        onClick={() => {
          if (typeof onClickRow == "function")
            onClickRow(props?.tableRow?.row?.onClickRowId);
        }}
        {...props}
        children={children}
      />
    );
  };
  const Loading = () => {
    const classes = useClasses();
    return <CircularProgress className={classes.loading} />;
  };

  // ページングサイズ
  const [pageSizes] = useState([5, 10, 15]);

  //実際のページングサイズ
  const [sorting, setSorting] = useState(defaultSorting);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [isInit, setInit] = useState(true);

  // 名称カラム動作・表示フォーマット
  const DataFormatter: React.ComponentType<
    DataTypeProvider.ValueFormatterProps
  > = ({ column, row, value }) => {
    const classes = useClasses();
    const columnType = formatColumns.find((c) => c.name === column.name);
    if (column) {
      switch (columnType?.type) {
        case "link":
          return (
            <Link
              className={classes.name}
              onClick={() => {
                columnType.onClick(row.id);
              }}
              nextPage=""
            >
              {value}
            </Link>
          );
        case "linkSuppliers":
          return (
            <Link
              className={classes.name}
              onClick={() => {
                columnType?.onClick(row.supplierId);
              }}
              nextPage=""
            >
              {value}
            </Link>
          );
        case "linkStaffs":
          return (
            <Link
              className={classes.name}
              onClick={() => {
                columnType.onClick(row.adminId);
              }}
              nextPage=""
            >
              {value}
            </Link>
          );
        case "linkOrganizations":
          return (
            <Link
              className={classes.name}
              onClick={() => {
                columnType.onClick(row.organizationId);
              }}
              nextPage=""
            >
              {value}
            </Link>
          );

        case "button":
          return <Button>{value}</Button>;
        case "other":
          return columnType.format(value);
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isInit) {
      setInit(false);
    } else {
      onFormChange(
        pageSize,
        pageSize * currentPage,
        sorting ? sorting[0].columnName : "",
        sorting ? sorting[0].direction : "asc"
      );
    }
  }, [pageSize, currentPage, sorting]);

  useEffect(() => {
    let isSubscribed = true;
    if (pageSize != onSearchChange?.limit) setPageSize(onSearchChange?.limit);
    if (currentPage != onSearchChange?.offset / onSearchChange?.limit)
      setCurrentPage(onSearchChange?.offset / onSearchChange?.limit);
    if (
      sorting[0].columnName != onSearchChange?.orderBy ||
      sorting[0].direction != onSearchChange?.order
    )
      setSorting([
        {
          columnName: onSearchChange?.orderBy,
          direction: onSearchChange?.order,
        },
      ]);
    return () => {
      isSubscribed = false;
    };
  }, [onSearchChange]);
  return (
    <>
      <DevexGrid rows={data} columns={columns}>
        {/* sort */}
        <SortingState
          defaultSorting={
            sorting ? sorting : [{ columnName: "name", direction: "asc" }]
          }
          sorting={sorting}
          onSortingChange={(array) => {
            setSorting(array);
          }}
          columnExtensions={columnExtensions}
        />

        {/* ページング */}
        <PagingState
          currentPage={currentPage}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(0);
          }}
          onCurrentPageChange={(page) => {
            setCurrentPage(page);
          }}
        />

        {/* ヘッダ列固定とするテーブル */}
        <VirtualTable
          rowComponent={TableRow}
          cellComponent={TableCell}
          messages={{
            noData: isLoading ? "Loading..." : resourceName + "はありません。",
          }}
          height={height ?? "230px"}
        />
        <VirtualTableState
          skip={0}
          totalRowCount={isLoading ? pageSize : 0}
          pageSize={pageSize}
          loading={false}
          infiniteScrolling
          getRows={(skip, take) => {}}
        />

        {/* リサイズ */}
        <TableColumnResizing
          defaultColumnWidths={defaultColumnWidths}
          minColumnWidth={80}
          resizingMode="nextColumn"
        />

        {/* 行ヘッダ */}
        <TableHeaderRow
          showSortingControls
          messages={{ sortingHint: "ソート" }}
        />

        {/* 個別フォーマット */}
        <DataTypeProvider
          for={formatColumns.map((s) => {
            return s.name;
          })}
          formatterComponent={DataFormatter}
        />

        {/* ページング部品 */}
        <PagingPanel
          pageSizes={pageSizes}
          messages={{ rowsPerPage: "表示件数" }}
        />

        {/* 総数 */}
        <CustomPaging totalCount={count ? count : 0} />
      </DevexGrid>
      {isLoading && <Loading />}
    </>
  );
};
export default SimpleTable;
