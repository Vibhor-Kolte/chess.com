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