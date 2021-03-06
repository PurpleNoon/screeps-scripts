// import { ErrorMapper } from "utils/ErrorMapper";
import roleHarvester from './role.harvester'
import roleUpgrader from './role.upgrader'
import roleBuilder from './role.builder'
import roleRepairer from './role.repairer'
import { CREEP_TYPE } from './constants'
import config from './config'
import BaseCreep from './utils/BaseCreep'

const { maxAliveCreepCount, availableCreepBodies } = config

function chooseBodies(energyAvailable) {
  if (energyAvailable >= 500) {
    return availableCreepBodies.normal500
  }

  if (energyAvailable >= 400) {
    return availableCreepBodies.normal400
  }

  return availableCreepBodies.normal200
}

function chooseBodiesType(energyAvailable) {
  if (energyAvailable >= 1000) {
    return 'Ⅹ'
  }

  if (energyAvailable >= 500) {
    return 'Ⅴ'
  }

  if (energyAvailable >= 400) {
    return 'Ⅳ'
  }

  return 'Ⅱ'
}

function globalCheck() {
  if (!Array.isArray(Memory.spawnList)) {
    Memory.spawnList = []
  }
}

function addSpawnTask({ role = 'upgrader' } = {}) {
  const spawnList = Memory.spawnList
  spawnList.push({ role })
}

// 重生 creep
// 之后重写一下这里的逻辑，使得生成的 creep 可变
function reSpawn() {
  const creepId = Memory.creepId
  if (!creepId) {
    Memory.creepId = 1
  }
  const spawn = Game.spawns.Spawn1

  if (Object.keys(Game.creeps).length >= maxAliveCreepCount) {
    return
  }

  const spawnList = Memory.spawnList
  const creepRole = spawnList.length ? spawnList[0].role : CREEP_TYPE.builder
  const creepPrefix = creepRole[0].toUpperCase() + creepRole.substring(1)
  const creepBodies = availableCreepBodies.normal1000
  const creepBodiesType = chooseBodiesType(spawn.room.energyAvailable)
  const creepName = `${creepPrefix}${creepBodiesType}-${creepId}`

  const sources = spawn.room.find(FIND_SOURCES);
  const sourceIndex = Math.floor(Math.random() * sources.length)
  const sourceId = sources[sourceIndex].id

  const spawnResult = spawn.spawnCreep(
    creepBodies,
    creepName,
    { memory: { role: creepRole, sourceId } as any }
  )

  while (spawnResult === ERR_NAME_EXISTS) {
    Memory.creepId = creepId + 1
  }

  if (spawnResult === OK) {
    Memory.creepId = creepId + 1

    if (spawnList.length) {
      spawnList.shift()
    }
  }
}

globalCheck()

function eachLoopCheck() {
  const { room } = Game.spawns.Spawn1

  if (!Memory.repairingStructureId) {
    const targets = BaseCreep.findStructuresNeedRepairing(room)
    Memory.repairingStructureId = targets.length ? targets[0].id : void 0
  }

  if (!Memory.buildingStructureId) {
    const targets = BaseCreep.findStructuresBuildable(room)
    Memory.buildingStructureId = targets.length ? targets[0].id : void 0
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = () => {
  // console.log(`Current game tick is ${Game.time}`);

  // 也许需要一个检测系统和事件的发布订阅系统
  eachLoopCheck()

  // 找时间弄弄挖运分离，现在的规模，该弄挖运分离了

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

    if (creep.memory.role === CREEP_TYPE.builder) {
      roleBuilder.run(creep);
    }
    if (creep.memory.role === CREEP_TYPE.repairer) {
      roleRepairer.run(creep);
    }
  }
};
