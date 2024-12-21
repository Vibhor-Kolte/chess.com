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

Install dependency chess.js
>> npm install chess.js

Create frontend app[React/Typescript] with below:-
>> npm create vite@latest
>> npm install

Add Tailwind CSS
>> npm install -D tailwindcss postcss autoprefixer
>> npx tailwindcss init -p

Update tailwind.config.js with below content:-
>>
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
>>

Add below code to index.css
>> @tailwind base;
>> @tailwind components;
>> @tailwind utilities;

Start react project with below command:-
>> npm run dev

Install react router
>> npm i react-router-dom

Install chess.js in frontend project
>> npm i chess.js