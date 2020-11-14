// import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester'
import roleUpgrader from './role.upgrader'
import roleBuilder from './role.builder'
// tslint:disable

const everyTick = {
  creepEachType: {}
}
const spawnList: any = []
const MAX_ALIVE_CREEP_COUNT = 15

function addSpawnTask({ role = 'upgrader' } = {}) {
  spawnList.push({ role })
}

// 重生 creep
function reSpawn() {
  const creepId = (Memory as any).creepId
  if (!creepId) {
    (Memory as any).creepId = 1
  }
  const spawn = Game.spawns.Spawn1

  if (Object.keys(Game.creeps).length > MAX_ALIVE_CREEP_COUNT) {
    return
  }

  const creepRole = spawnList.length ? spawnList[0].role : 'upgrader'
  const creepName = `${creepRole[0].toUpperCase() + creepRole.substring(1)}${creepId}`
  const spawnResult = spawn.spawnCreep([WORK, CARRY, MOVE], creepName, { memory: { role: creepRole } as CreepMemory })
  // console.log('spawnResult: ', spawnResult);

  while (spawnResult === ERR_NAME_EXISTS) {
    (Memory as any).creepId = creepId + 1
  }

  if (spawnResult === OK) {
    (Memory as any).creepId = creepId + 1

    if (spawnList.length) {
      spawnList.shift()
    }

    // console.log('add-creepId: ', (Memory as any).creepId);
  }
}

// 生产 creep
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Harvester1');
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Harvester2');
// Game.spawns.Spawn1.spawnCreep([WORK, CARRY, MOVE], 'Upgrader1');
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1',
//   { memory: { role: 'builder' } });

// super creep
// Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
//   'HarvesterBig',
//   { memory: { role: 'harvester' } });

// 建造扩展
// Game.spawns.Spawn1.room.createConstructionSite(X, Y, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.createConstructionSite(28, 16, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.createConstructionSite(30, 16, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.createConstructionSite(32, 16, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.createConstructionSite(34, 16, STRUCTURE_EXTENSION);
// Game.spawns.Spawn1.room.createConstructionSite(36, 16, STRUCTURE_EXTENSION);

// 设置角色
// Game.creeps.Harvester1.memory.role = 'harvester';
// Game.creeps.Upgrader1.memory.role = 'upgrader';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = () => {
  // console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  reSpawn()

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    // console.log('creep: ', JSON.stringify(creep, null, 2));

    if (creep.ticksToLive && creep.ticksToLive <= 1) {
      addSpawnTask({ role: creep.memory.role })
    }

    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
};
