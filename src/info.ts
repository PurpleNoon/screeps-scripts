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
