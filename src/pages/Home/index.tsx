import React from 'react';
import STable from '@/components/STable';
import { ColumnsType } from 'antd/lib/table';
import { Select } from 'antd';

const { Option } = Select;

const Home: React.FC = () => {
  const columns: ColumnsType<any> = [
    { key: 'id', title: 'ID', dataIndex: 'id'  },
    { key: 'name', title: '名称', dataIndex: 'name'  },
    { key: 'age', title: '年龄', dataIndex: 'age'  },
  ];
  
  const filters = [
    { key: 'name', title: '名称', placeholder: '按名称查找' },
    { key: 'age', title: '年龄', placeholder: '按年龄查找' },
    { key: 'gender', title: '性别', placeholder: '按年龄查找', tag: Select, render: <Option value="男">男</Option> },
  ];

  const handlers = [
    { key: 'add', title: '添加', onClick: () => console.log('添加') }
  ];

  const request = (options: any) => {
    console.log(options);
    return Promise.resolve([]);
  }

  return <STable
    request={request}
    columns={columns}
    filters={filters}
    handlers={handlers}
  ></STable>;
}

export default Home;