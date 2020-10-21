export interface IAPIList {
  queryUser: any;
  queryUserList: any;
  createUser: any;
}

const apiList: IAPIList = {
  queryUser: '/user/:id',
  queryUserList: '/users',
  createUser: 'POST /user'
};

export default apiList;