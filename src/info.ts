// 放一些信息

// 生产 creep
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1',
//   { memory: { role: 'builder' } });

// super creep
// Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
//   'HarvesterBig',
//   { memory: { role: 'harvester' } });
// Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
//   'HarvesterBig',
//   { memory: { role: 'harvester' } });

// Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, CARRY, MOVE, MOVE],
//   'HarvesterBig',
//   { memory: { role: 'harvester' } });

// 建造扩展
// Game.spawns.Spawn1.room.createConstructionSite(X, Y, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.energyAvailable

// 设置角色
// Game.creeps.Harvester1.memory.role = 'harvester';



// import roleUpgrader from './role.upgrader'
// import BaseCreep from './utils/BaseCreep'

// const roleHarvester = {
//   run(creep: Creep) {
//     const targetId = creep.memory.targetId

//     let targets = creep.room.find(FIND_STRUCTURES, {
//       filter: (structure) => {
//         return (
//           structure.structureType === STRUCTURE_EXTENSION
//           || structure.structureType === STRUCTURE_SPAWN
//         ) && structure.store.getCapacity(RESOURCE_ENERGY) - structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
//       }
//     });

//     if (!targets.length) {
//       targets = creep.room.find(FIND_STRUCTURES, {
//         filter: (structure) => {
//           return structure.structureType === STRUCTURE_CONTAINER
//             && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
//         }
//       })
//     }
//     // console.log('targets: ', targets);

//     if (targets.length) {
//       const randomIndex = Math.floor(Math.random() * targets.length)
//       creep.memory.targetId = targets[randomIndex].id
//     }

//     if (creep.memory.harvesting && creep.store.getFreeCapacity() === 0) {
//       creep.memory.harvesting = false;
//       creep.say('🔄 transfer');
//     }
//     if (!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] === 0) {
//       creep.memory.harvesting = true;
//       creep.say('💪 harvesting');
//     }

//     if (creep.memory.harvesting) {
//       // TODO: 改进 harvester 的寻路算法
//       const source = Game.getObjectById(creep.memory.sourceId)
//       const result = creep.harvest(source)
//       console.log('harvest-result: ', result)
//       if (result === ERR_NOT_IN_RANGE) {
//         creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
//       }
//     } else {

//       if (targetId) {
//         const target = Game.getObjectById(targetId)
//         const result = creep.transfer(target, RESOURCE_ENERGY)
//         console.log('transfer-result: ', result)
//         if (result === ERR_NOT_IN_RANGE) {
//           creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
//         }
//       }
//     }
//   }
// };

// export default roleHarvester;

