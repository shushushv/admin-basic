import React, { Fragment } from 'react';
import { Input, Space, Button, Row, Col } from 'antd';
import { debounce } from 'lodash';
import './TableFilter.less';

export interface ITableFilterItem {
  key: string;
  title: string;
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
    <Row>
      {
        filters.map(({
          key,
          title,
          tag: Tag = Input,
          render = null,
          ...props
        }) =>
          <Fragment key={key}>
            <Col style={{ lineHeight: '32px' }}>{title}：</Col>
            <Col style={{ marginRight: '10px' }}>
              <Tag
                allowClear
                {...props}
                onChange={(e: any) => searchDebounce({ [props.key]: (e && e.target ? e.target.value : e) || '' })}
              >
                {render}
              </Tag>
            </Col>
          </Fragment>
        )
      }
    </Row>
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