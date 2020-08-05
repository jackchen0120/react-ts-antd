import network from './network';

// 登录
export function loginUser(data) {
  return network({
    url: `/login`,
    method: "post",
    data
  });
}

// 注册
export function registerUser(data) {
  return network({
    url: `/register`,
    method: "post",
    data
  })
}

// 密码重置
export function resetPwd(data) {
  return network({
    url: `/resetPwd`,
    method: "post",
    data
  })
}

// 任务列表
export function queryTaskList(params) {
  return network({
    url: `/queryTaskList`,
    method: "get",
    params
  })
}

// 添加任务
export function addTask(data) {
  return network({
    url: `/addTask`,
    method: "post",
    data
  })
}

// 编辑任务
export function editTask(data) {
  return network({
    url: `/editTask`,
    method: "put",
    data
  })
}

// 操作任务状态
export function updateTaskStatus(data) {
  return network({
    url: `/updateTaskStatus`,
    method: "put",
    data
  })
}

// 点亮红星标记
export function updateMark(data) {
  return network({
    url: `/updateMark`,
    method: "put",
    data
  })
}

// 删除任务
export function deleteTask(data) {
  return network({
    url: `/deleteTask`,
    method: "delete",
    data
  })
}