# movie-website-with-recommended-system

## Project launch

Download and install [nodejs](https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi)

Use the following command to clone the contents of the project to your appropriate location
```
git clone https://github.com/alidashti200079/movie-website-with-recommended-system.git
```

Go to the website directory with the following command
```
cd ~/website
```

Execute the following commands to build the project
```
npm install
npm run build
```

You must provide the required node_modules before running. You can use the following command:
```
npm i
```

The command for starting the application  is as given below:
```
npm start
```

# Run the backend
First, we need to go to the venv environment.
To run venv, first go to the /venv /bin directory and then run the following command:
```
source activate
```

Then go to the /src/api directory and run the following command:
```
uvicorn app:app --reload
```

