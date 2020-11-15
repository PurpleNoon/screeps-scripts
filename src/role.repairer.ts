import roleUpgrader from './role.upgrader'

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
      let targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return structure.hits / structure.hitsMax < 0.6
        }
      });

      targets = _.sortBy(targets, (structure) => {
        return structure.hits
      })

      if (targets.length) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
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
}

export default roleRepairer
