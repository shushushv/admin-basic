import React from 'react';
import { Input, Space, Button } from 'antd';
import 'TableFilter.less';

export interface ITableFilterItem {
  key: string;
  tag?: any;
  [name: string]: any;
}

export interface ITableHandlerItem {
  key: string;
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
  return <div className="table-filter">
    <Space>
      {
        filters.map(({
          tag: Tag = Input,
          ...props
        }) => (
          <Tag {...props} onChange={(e: any) => onChange({ [props.key]: e.target.value })}></Tag>
        ))
      }
    </Space>
    <Space>
      {
        handlers.map(({
          title,
          ...props
        }) => (
          <Button {...props}>{title}</Button>
        ))
      }
    </Space>
  </div>
}

export default TableFilter;