import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { cloneDeep } from "lodash";


// main func
const useStaffsContainer = () => {
  const [staffs, setStaffs] = useState([]);
  const [modal, setModal] = useState(false);
  const [maxId, setMaxId] = useState(0);

  // ページングのデフォルト値を設定する
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const onPageChange = (
    limit: number,
    offset: number,
    orderBy: string,
    order: "asc" | "desc"
  ) => {
    // set paging
    setLimit(limit);
    setOffset(offset);
    setOrderBy(orderBy);
    setOrder(order);
    // set condition
    const condition = cloneDeep(conditionCache);
    condition["limit"] = limit;
    condition["offset"] = offset;
    condition["orderBy"] = getOrderBy(orderBy, order);
  };

  // search trigger
  const [searchTrigger, setSearchTrigger] = useState(false);
  // loading flag
  const [loading, setLoading] = useState(false);

  // condition cache
  const [conditionCache, setConditionCache] = useState({});
  const [searchChange, setSearchChange] = useState({
    limit: 10,
    offset: 0,
    orderBy: "id",
    order: "asc" as "asc" | "desc",
  });

  // func to get orderBy
  const getOrderBy = (orderBy: string, order: string) => {
    let orderByObj = {};
    if (orderBy && order) {
      switch (orderBy) {
        default:
          orderByObj[orderBy] = order;
      }
    }
    return orderByObj;
  };

  // return
  return {
    modal,
    setModal,
    staffs,
    setStaffs,
    maxId,
    setMaxId,
    onPageChange,
    searchChange,
    searchTrigger,
  };
};

const StaffsContext = createContainer(useStaffsContainer);
export default StaffsContext;