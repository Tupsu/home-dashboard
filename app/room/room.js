let db = require('../db');

let Room = class Room {
  count() {
    return db.query(`
      select
        count(r)
        from (select
          distinct rooms.id
            from rooms
              join sensors
                on rooms.id=sensors.room
              join sensor_data
              on sensors.id=sensor_data.sensor_id) r`).then(res => parseInt(res[0].count), 10);
  }

  get(offset, pageSize) {
    return db.query(`
        select
          rooms.id id,
          rooms.name,
          json_agg(json_build_object('name', sensors.name, 'value', sensor_data.value, 'type', sensors.type, 'unit', sensors.unit)) sensors,
          row_number() over (order by rooms.id) number
            from rooms
              join sensors
                on rooms.id=sensors.room
              join sensor_data
                on sensors.id=sensor_data.sensor_id
              where
                sensor_data.id in
                (select
                  max(id)
                    from sensor_data
                      group by sensor_id)
                        group by rooms.id
                        order by rooms.id
                        offset ${offset} limit ${pageSize}`);
  }
};

module.exports = Room;
