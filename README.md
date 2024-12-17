Initialize backend_v1 package.json with below command:-
>> npm init -y

Initialize backend_v1 tsconfig.json with below command:-
>> npx tsc --init

Modify tsconfig.json:-
    - Change "outDir": "./dist"  [All JS compiled code goes to this folder]
    - Change "rootDir": "./src"  [All Source Code gets picked from this folder]

Add index.ts file in src directory

Add 'ws' dependency:-
>> npm install ws
>> npm install @types/ws

Install TypeScript if not installed:-
>> npm install -g typescript

Compile & Run the code:-
>> tsc -b                 [compile]
>> node dist/index.js     [run/start the program]

Use postwoman.io/hopscotch.io to connect to the websocket server
>> ws://localhost:8080