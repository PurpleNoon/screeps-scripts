import roleUpgrader from './role.upgrader'
import BaseCreep from './utils/BaseCreep'

const roleHarvester = {
  run(creep: Creep) {
    if (creep.store.getFreeCapacity() > 0) {
      const source = Game.getObjectById(creep.memory.sourceId)
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
      }
    }
    else {
      const targets = BaseCreep.findEnergyStorageIncludeSpawnWithPriority(creep.room)

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

// const roleHarvester = {

//   /**
//    * @param {Creep} creep
//    *
//    */
//   run(creep: any) {
//     // if (!creep.memory.sourceId) {
//     //   const sources = creep.room.find(FIND_SOURCES);
//     //   const sourceIndex = Math.floor(Math.random() * sources.length)
//     //   creep.memory.sourceId = sources[sourceIndex].id
//     // }

//     if (creep.store.getFreeCapacity() > 0) {
//       const source = Game.getObjectById(creep.memory.sourceId)
//       if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
//         creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
//       }
//     }
//     else {
//       const targets = creep.room.find(FIND_STRUCTURES, {
//         filter: (structure) => {
//           return (
//             structure.structureType === STRUCTURE_EXTENSION ||
//             structure.structureType === STRUCTURE_SPAWN
//             // || structure.structureType === STRUCTURE_CONTAINER
//           ) &&
//             structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
//         }
//       });
//       if (targets.length > 0) {
//         if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
//           creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
//         }
//       } else {
//         roleUpgrader.run(creep)
//       }
//     }
//   }
// };

export default roleHarvester;
