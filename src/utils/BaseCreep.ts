
import { STORAGE_PRIORITY } from '../constants'

export default {
  // 寻找能量存储结构（包含 spawn 和扩展）
  findEnergyStorageIncludeSpawnWithPriority(room: Room): AnyStructure[] {
    let targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        // 下面的写法，是为了避开这个问题 =-=
        // 实际上兼容的两个函数，为什么TypeScript报错“没有兼容的调用签名”？
        // 地址：https://segmentfault.com/q/1010000015449106/a-1020000015450608
        if (!(
          structure.structureType === STRUCTURE_EXTENSION
          || structure.structureType === STRUCTURE_SPAWN
          || structure.structureType === STRUCTURE_CONTAINER
        )) {
          return false
        }

        if (structure.structureType === STRUCTURE_CONTAINER) {
          return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        }

        return structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    });

    targets = _.sortBy(targets, (structure) => STORAGE_PRIORITY[structure.structureType] || STORAGE_PRIORITY.unknown)

    return targets
  },
  // 寻找能量存储结构（不包含 spawn 和扩展）
  findEnergyStorage(room: Room): AnyStructure[] {
    const targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER
          && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    });

    return targets
  },
  // 寻找 spawn 和扩展
  findEnergyStorageOnlySpawn(room: Room): AnyStructure[] {
    const targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType === STRUCTURE_EXTENSION
          || structure.structureType === STRUCTURE_SPAWN
        ) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    });

    return targets
  }
}
