// 常量

// creep 类型
export const CREEP_TYPE = {
  // 收获者
  harvester: 'harvester',
  // 升级者
  upgrader: 'upgrader',
  // 建造者
  builder: 'builder',
  // 修复者
  repairer: 'repairer',
}

// 存放能量的优先级, 数字越小，优先级越高
export const STORAGE_PRIORITY = {
  [STRUCTURE_SPAWN]: 100,
  [STRUCTURE_EXTENSION]: 200,
  [STRUCTURE_CONTAINER]: 300
}
