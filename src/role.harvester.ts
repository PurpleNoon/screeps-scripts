import roleUpgrader from './role.upgrader'
import BaseCreep from './utils/BaseCreep'

const roleHarvester = {
  run(creep: Creep) {

    if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
      creep.memory.harvesting = false;
      creep.say('🔄 carrying');
    }
    if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.harvesting = true;
      creep.say('💪 harvesting');
    }

    if (creep.memory.harvesting) {
      // TODO: 改进 harvester 的寻路算法
      const source = Game.getObjectById(creep.memory.sourceId)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    } else {
      const targets = BaseCreep.findEnergyStoragesIncludeSpawnWithPriority(creep.room)

      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        roleUpgrader.run(creep)
      }
    }
  }
};

export default roleHarvester;
