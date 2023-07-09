# toohak

## setup project:
- install nodejs
- install git
- clone repository on workstation

## work on backend:
- open console on backend directory
- then type: npm i
  - to install dependencys
- then type: npm run start:dev
  - backend app starts usually on port 3000
  - port can be checked and changed in backend\dist\src\main.js or backend\src\main.ts (at: app.listen(3000))
- open port with localhost:#portnumber#
- more functions can be read with help command: npx g --help

## work on frontend:
- open console on frontend directory
- then type: npm i
  - to install dependencys
- then type: npm run dev
  - frontend port will be given in console
- open port with localhost:#portnumber#

## explanation of the node tools npm and npx
Both tools (npm and npx) are part of the Node.js development environment and provide developers with a convenient way to install packages, manage projects, and execute commands to support JavaScript development.
### npm
- npm stands for "Node Package Manager"
- it is the default package manager for Node.js.
- With npm, you can install, manage, and update packages used in your Node.js project.
- It also allows you to publish your own packages.
- npm is commonly used to integrate external libraries or frameworks into a Node.js project
### npx
- npm stands for "Node Package Execute"
- is a tool that comes bundled with npm
- It is used to run commands that are included in an installed package without the need to globally install the package.
  - So with npx, you can execute commands directly as if you had the corresponding package globally installed
  - This is particularly useful when you occasionally run commands or want to test different versions of a package without the need for global installation.
- npm is commonly used to integrate external libraries or frameworks into a Node.js project

## edit routes
You can add routes via app controller.
- @Get('/hello') for add a route to your methode
- @Controller(/test) for add a route to all methodes in your controller