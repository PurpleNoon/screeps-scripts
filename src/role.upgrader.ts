import BaseCreep from './utils/BaseCreep'

const roleUpgrader = {
  run(creep: Creep) {
    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 carrying')
    }

    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade')
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      }
    }
    else {
      const sources = BaseCreep.findEnergyStoragesNotEmpty(creep.room)

      if (sources.length) {
        if (creep.withdraw(sources[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0])
        }
      }
    }
  }
};

export default roleUpgrader;
