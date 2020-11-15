import roleUpgrader from './role.upgrader'
import BaseCreep from './utils/BaseCreep'

const roleRepairer = {
  run(creep: Creep) {
    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.repairing = false;
      creep.say('🔄 carrying');
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
      creep.memory.repairing = true;
      creep.say('🔨 requiring');
    }

    // console.log('creep: ', JSON.stringify(creep, null, 2));
    // console.log('creep-memory: ', JSON.stringify(creep.memory, null, 2));

    if (creep.memory.repairing) {
      const structureId = Memory.repairingStructureId

      if (structureId) {
        const target = Game.getObjectById(structureId)
        const result = creep.repair(target)
        // console.log('repair-result: ', result)

        // 修理满耐久建筑依旧返回 0，所以需要检查该结构是否为满耐久
        if (result === ERR_INVALID_TARGET || target.hits / target.hitsMax >= 1) {
          Memory.repairingStructureId = undefined
        }

        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        roleUpgrader.run(creep)
      }
    }
    else {
      const sources = BaseCreep.findEnergyStoragesNotEmpty(creep.room)

      if (sources.length) {
        const result = creep.withdraw(sources[0], RESOURCE_ENERGY)
        // console.log('withdraw-result: ', result);

        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0])
        }
      }
    }
  }
}

export default roleRepairer
