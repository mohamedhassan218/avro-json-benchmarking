const avro = require('avsc');
const fs = require('fs');

// Helper to write output
let resultLogs = [];

function log(message) {
    console.log(message);             // still logs to console if you want
    resultLogs.push(message);        // also push to array
}

function time(label) {
    console.time(label);
    timers[label] = process.hrtime(); // manual tracking for high precision
}

function timeEnd(label) {
    const diff = process.hrtime(timers[label]);
    const ms = (diff[0] * 1000 + diff[1] / 1e6).toFixed(3);
    const message = `${label}: ${ms} ms`;
    log(message);
}

// Set up record and Avro schema
const record = {
    name: 'Mohamed',
    age: 22
};

const type = avro.Type.forSchema({
    type: 'record',
    name: 'User',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'age', type: 'int' }
    ]
});

const ITERATIONS = 1_000_000;
let timers = {};

log(`Running benchmark with ${ITERATIONS.toLocaleString()} iterations...\n`);

// ===== JSON Benchmark =====
time('JSON - Serialization');
let jsonSerialized;
for (let i = 0; i < ITERATIONS; i++) {
    jsonSerialized = JSON.stringify(record);
}
timeEnd('JSON - Serialization');

time('JSON - Deserialization');
let jsonDeserialized;
for (let i = 0; i < ITERATIONS; i++) {
    jsonDeserialized = JSON.parse(jsonSerialized);
}
timeEnd('JSON - Deserialization');

log(`JSON Payload Size: ${Buffer.byteLength(jsonSerialized)} bytes\n`);

// ===== Avro Benchmark =====
time('Avro - Serialization');
let avroSerialized;
for (let i = 0; i < ITERATIONS; i++) {
    avroSerialized = type.toBuffer(record);
}
timeEnd('Avro - Serialization');

time('Avro - Deserialization');
let avroDeserialized;
for (let i = 0; i < ITERATIONS; i++) {
    avroDeserialized = type.fromBuffer(avroSerialized);
}
timeEnd('Avro - Deserialization');

log(`Avro Payload Size: ${avroSerialized.length} bytes`);

// Write to result.txt
fs.writeFileSync('result.txt', resultLogs.join('\n'), 'utf-8');