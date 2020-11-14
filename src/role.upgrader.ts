const roleUpgrader = {

  /**
   * @param {Creep} creep
   */
  run(creep: any) {
    if (!creep.memory.sourceId) {
      const sources = creep.room.find(FIND_SOURCES);
      const sourceIndex = Math.floor(Math.random() * sources.length)
      creep.memory.sourceId = sources[sourceIndex].id
    }

    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.say('🔄 harvest');
    }

    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.say('⚡ upgrade');
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
    else {
      const source = Game.getObjectById(creep.memory.sourceId)
      const harvestResult = creep.harvest(source)
      if (harvestResult === ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      } else {
        // console.log('harvestResult: ', harvestResult);
        // console.log(object);
      }
    }
  }
};

export default roleUpgrader;
