const roleUpgrader = {

  /**
   * @param {Creep} creep
   */
  run(creep: any) {
    if (creep.memory.building && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }

    if (creep.store[RESOURCE_ENERGY] === 0) {
      const sources = creep.room.find(FIND_SOURCES);
      const harvestResult = creep.harvest(sources[0])
      if (harvestResult === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      } else {
        // console.log('harvestResult: ', harvestResult);
        // console.log(object);
      }
    }
    else {
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
};

export default roleUpgrader;
