CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE sensors (
    id SERIAL PRIMARY KEY,
    type TEXT,
    name TEXT,
    unit TEXT,
    room INTEGER REFERENCES rooms (id)
);

CREATE TABLE sensor_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    value NUMERIC,
    sensor_id REFERENCES sensor_id (id)
)
