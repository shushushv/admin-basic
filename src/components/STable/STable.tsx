import React, { useEffect, useState } from 'react';
import { Table } from 'antd'; 
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import TableFilter, { ITableFilterItem, ITableHandlerItem } from './TableFilter';
import './STable.less';
import { assign } from 'lodash';

interface ISTableProps {
  pageNum?: number;
  pageSize?: number;
  columns: ColumnsType<any>;
  request: (options: any) => Promise<any[]>;
  filters: ITableFilterItem[];
  handlers: ITableHandlerItem[];
}

const STable: React.FC<ISTableProps> = ({
  pageNum = 1,
  pageSize = 10,
  request,
  columns,
  filters,
  handlers
}) => {
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: pageNum,
    pageSize
  });
  const [params, setParams] = useState(() => 
    filters.reduce((res, { key }) => {
      Reflect.set(res, key, '');
      return res;
    }, {})
  );

  const onFilterChange = (options: any) => {
    setParams({
      ...params,
      ...options
    });
  }

  useEffect(() => {
    request(assign(params, pagination)).then(data => setData(data));
  }, [pagination, params, request]);

  return  <div className="s-table">
    <TableFilter
      filters={filters}
      handlers={handlers}
      onChange={onFilterChange}
    ></TableFilter>

    <Table
      dataSource={data}
      columns={columns}
      pagination={pagination}
      onChange={setPagination}
    ></Table>
  </div>;
}

export default STable;