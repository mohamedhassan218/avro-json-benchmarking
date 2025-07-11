# Encoding & Decoding Benchmarking

## About
This demo project benchmarks the performance of encoding and decoding data using two different serialization formats: JSON and Avro.
It repeatedly (1,000,000 times) encodes and decodes a sample object using each format to measure and compare their execution time.

This is a simple yet effective experiment to gain insights into how different data serialization methods behave under high-load scenarios, especially in use cases involving data transfer or storage in distributed systems.

I've written an article that breaks down those base-level differences in detail.
You can find it [here](htttps://example.com)

## How to Use?

1. Clone the repo:
   ```bash
   git clone git@github.com:mohamedhassan218/avro-json-benchmarking.git
   cd avro-json-benchmarking
   ```

2. Install dependences:
   ```bash
   npm install
   ```

3. Run the Code:
   ```bash
   npm start
   ```

4. Check the results in the file: `result.txt`