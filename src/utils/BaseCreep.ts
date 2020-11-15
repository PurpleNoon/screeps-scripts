
import { STORAGE_PRIORITY } from '../constants'

export default {
  // 寻找能量存储结构（包含 spawn 和扩展）
  findEnergyStoragesIncludeSpawnWithPriority(room: Room): AnyStructure[] {
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
  // 寻找未满的能量存储结构（不包含 spawn 和扩展）
  findEnergyStoragesNotFull(room: Room): AnyStructure[] {
    const targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER
          && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    });

    return targets
  },
  // 寻找非空的能量存储结构（不包含 spawn 和扩展）
  findEnergyStoragesNotEmpty(room: Room) {
    const targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType === STRUCTURE_CONTAINER
          && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    });

    return targets
  },
  // 寻找 spawn 和扩展
  findEnergyStoragesOnlySpawn(room: Room): AnyStructure[] {
    const targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType === STRUCTURE_EXTENSION
          || structure.structureType === STRUCTURE_SPAWN
        ) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
      }
    });

    return targets
  },
  // 寻找需要修复的结构
  findStructuresNeedRepairing(room: Room): AnyStructure[] {
    let targets = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        // 检测耐久在 60% 以下的结构
        return structure.hits / structure.hitsMax < 0.6
          && structure.structureType !== STRUCTURE_WALL // 暂时不修墙
      }
    });

    targets = _.sortBy(targets, (structure) => {
      return structure.hits
    })

    return targets
  },
  // 寻找可修建的结构
  findStructuresBuildable(room: Room): ConstructionSite<BuildableStructureConstant>[] {
    let targets = room.find(FIND_CONSTRUCTION_SITES);

    targets = _.sortBy(targets, (structure) => {
      // 优先建造扩展
      return structure.structureType === STRUCTURE_EXTENSION
        ? STORAGE_PRIORITY[STRUCTURE_EXTENSION]
        : STORAGE_PRIORITY.unknown
    })

    return targets
  },
}
