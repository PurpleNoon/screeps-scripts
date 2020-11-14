// import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester'
import roleUpgrader from './role.upgrader'
import roleBuilder from './role.builder'
import roleRepairer from './role.repairer'
// tslint:disable

const everyTick = {
  creepEachType: {}
}
const CREEP_TYPE = {
  harvester: 'harvester',
  upgrader: 'upgrader',
  builder: 'builder',
  repairer: 'repairer',
}

const spawnList: any = []
const MAX_ALIVE_CREEP_COUNT = 16
const CREEP_BODIES = {
  normal200: [WORK, CARRY, MOVE],
  normal400: [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
  normal500: [WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
}

function chooseBodies(energyAvailable) {
  if (energyAvailable < 400) {
    return CREEP_BODIES.normal200
  }

  if (energyAvailable < 500) {
    return CREEP_BODIES.normal400
  }

  return CREEP_BODIES.normal500
}

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

  const creepRole = spawnList.length ? spawnList[0].role : CREEP_TYPE.harvester
  const creepName = `${creepRole[0].toUpperCase() + creepRole.substring(1)}${creepId}`
  const spawnResult = spawn.spawnCreep(
    chooseBodies(spawn.room.energyAvailable),
    creepName,
    { memory: { role: creepRole } as CreepMemory }
  )

  while (spawnResult === ERR_NAME_EXISTS) {
    (Memory as any).creepId = creepId + 1
  }

  if (spawnResult === OK) {
    (Memory as any).creepId = creepId + 1

    if (spawnList.length) {
      spawnList.shift()
    }
  }
}

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

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = () => {
  // console.log(`Current game tick is ${Game.time}`);

  // 也许需要一个检测系统和事件的发布订阅系统

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

    // 策略模式/命令模式封装一下
    if (creep.memory.role === CREEP_TYPE.harvester) {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === CREEP_TYPE.upgrader) {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role == CREEP_TYPE.builder) {
      roleBuilder.run(creep);
    }
    if (creep.memory.role == CREEP_TYPE.repairer) {
      roleRepairer.run(creep);
    }
  }
};
