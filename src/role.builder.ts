import roleRepairer from './role.repairer'

const roleBuilder = {
  run(creep: Creep) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      const structureId = Memory.buildingStructureId

      if (structureId) {
        const target = Game.getObjectById(structureId)
        if (creep.build(target) === ERR_NOT_IN_RANGE) {
          creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
        }
      } else {
        roleRepairer.run(creep)
      }
    }
    else {
      const source = Game.getObjectById(creep.memory.sourceId)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
  }
};

export default roleBuilder;
