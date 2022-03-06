const http = require('http');

const app = require('./app');

//forces data to load before allowing any listen calls
const { loadPlanetData } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

//forces data to load before allowing any listen calls
//cannot just use await due to require import must directky call async function
async function startServer() {
    await loadPlanetData();

    server.listen(PORT, () => {
        console.log("listening on port", PORT, '...')
    });
}

startServer();
