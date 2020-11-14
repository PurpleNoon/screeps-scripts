import roleUpgrader from './role.upgrader'


const roleBuilder = {

  /**
   * @param {Creep} creep
   */
  run(creep) {
    if (!creep.memory.sourceId) {
      const sources = creep.room.find(FIND_SOURCES);
      const sourceIndex = Math.floor(Math.random() * sources.length)
      creep.memory.sourceId = sources[sourceIndex].id
    }

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if (creep.memory.building) {
      let targets = creep.room.find(FIND_CONSTRUCTION_SITES, {
        filter: (structure) => {
          return structure.structureType === STRUCTURE_EXTENSION
        }
      });

      if (!targets.length) {
        targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      }

      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
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
};

export default roleBuilder;
