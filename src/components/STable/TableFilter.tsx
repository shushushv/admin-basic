import React from 'react';
import { Input, Space, Button } from 'antd';
import './TableFilter.less';
import { debounce } from 'lodash';

export interface ITableFilterItem {
  key: string;
  tag?: any;
  [name: string]: any;
}

export interface ITableHandlerItem {
  key: string;
  title: string;
  tag?: any;
  [name: string]: any;
}

export interface ITableFilterProps {
  filters: ITableFilterItem[];
  handlers: ITableHandlerItem[];
  onChange: (params: any) => void;
}

const TableFilter: React.FC<ITableFilterProps> = ({
  filters,
  handlers,
  onChange
}) => {
  const searchDebounce = debounce(onChange, 500);

  return <div className="table-filter">
    <Space>
      {
        filters.map(({
          tag: Tag = Input,
          ...props
        }) => (
          <Tag {...props} onChange={(e: any) => searchDebounce({ [props.key]: e.target.value })}></Tag>
        ))
      }
    </Space>
    <Space>
      {
        handlers.map(({
          title,
          ...props
        }) => (
          <Button type="primary" {...props}>{title}</Button>
        ))
      }
    </Space>
  </div>
}

export default TableFilter;