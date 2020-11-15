
// 全局配置
export default {
  // 最多存在的 creep 数量
  maxAliveCreepCount: 17,
  // 可选的 creep 部件列表，数字表示该部件列表耗费的能量
  creepBodies: {
    normal200: [WORK, CARRY, MOVE],
    normal400: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
    normal500: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
  }
}
