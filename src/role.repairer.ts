import roleUpgrader from './role.upgrader'
import BaseCreep from './utils/BaseCreep'

const roleRepairer = {
  run(creep: Creep) {
    if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.repairing = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.repairing && creep.store.getFreeCapacity() === 0) {
      creep.memory.repairing = true;
      creep.say('🔨 requiring');
    }

    if (creep.memory.repairing) {
      const structureId = Memory.repairingStructureId

      if (structureId) {
        const target = Game.getObjectById(structureId)
        if (creep.repair(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        roleUpgrader.run(creep)
      }
    }
    else {
      const source = Game.getObjectById(creep.memory.sourceId)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
}

export default roleRepairer
