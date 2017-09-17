let db = require('../db');

let Room = class Room {
  count() {
    return db.query(`
      SELECT
        count(*)
      FROM rooms`)
      .then(res => parseInt(res[0].count), 10);
  }

  get(offset, pageSize) {
    return db.query(`
      SELECT
        rooms.name,
        json_agg(json_build_object('name', sensors.name, 'value', sd.value, 'type', sensors.type, 'unit', sensors.unit)) sensors,
        row_number() over (order by rooms.id) number
      FROM rooms
      JOIN sensors
        ON rooms.id = sensors.room
      JOIN sensor_data sd
        ON sensors.id = sd.sensor_id
      JOIN (
        SELECT
          sensor_id,
          MAX(timestamp) as timestamp
        FROM sensor_data
        GROUP BY sensor_id
      ) sd2 ON sd.sensor_id = sd2.sensor_id AND sd.timestamp = sd2.timestamp
      GROUP BY rooms.id
      ORDER BY rooms.id
      OFFSET ${offset}
      LIMIT  ${pageSize}`);
  }
};

module.exports = Room;
