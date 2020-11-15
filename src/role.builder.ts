import roleRepairer from './role.repairer'
import BaseCreep from './utils/BaseCreep'

const roleBuilder = {
  run(creep: Creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 carrying');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const structureId = Memory.buildingStructureId

      if (structureId) {
        const target = Game.getObjectById(structureId)
        const result = creep.build(target)
        // console.log('build-result: ', result)

        if (result === ERR_INVALID_TARGET) {
          Memory.buildingStructureId = undefined
        }

        if (result === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        roleRepairer.run(creep)
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

export default roleBuilder;
