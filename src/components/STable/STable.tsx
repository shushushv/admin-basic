import React, { useEffect, useState } from 'react';
import { Table } from 'antd'; 
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table';
import TableFilter, { ITableFilterProps } from './TableFilter';
import './STable.less';

interface ISTableProps extends ITableFilterProps {
  defaultPagination?: TablePaginationConfig;
  columns: ColumnsType<any>;
  request: (options: any) => Promise<any[]>;
}

const STable: React.FC<ISTableProps> = ({
  defaultPagination,
  request,
  columns,
  filters,
  handlers
}) => {
  const [data, setData] = useState<any>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>(defaultPagination || {});
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
    request(params).then(data => setData(data));
  }, [params, request]);

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