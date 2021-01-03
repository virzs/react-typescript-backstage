import request from "@/utils/axios";

interface addType {
  name: string;
  alias?: string;
  introduction?: string;
  parentId?: string;
}

//获取分类树形列表
export const getTreeList = () => {
  return request({
    url: "/api/article/classify/tree-list",
    method: "get",
  });
};

//文章分类分页
export const getTreePage = (page: number, pageSize: number, data?: any) => {
  return request({
    url: "/api/article/classify/tree-page",
    method: "get",
    params: {
      page,
      pageSize,
      ...data,
    },
  });
};

//新增文章分类
export const add = (data: addType) => {
  return request({
    url: "/api/article/classify/add",
    method: "post",
    data,
  });
};
