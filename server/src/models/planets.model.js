

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');
const { default: mongoose } = require('mongoose');

const planets = require('./planets.mongo');

//const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36
        && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}


/*
const promise -= new Peomise((resolve, reject) => {
    resolve();
});
promise.then((result) => {
})

or
const = result = await promise
*/

function loadPlanetData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv'))
            .pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', async (data) => {
                if (isHabitablePlanet(data)) {
                    //TODO: upsert
                    // insert + update = upsert
                    //habitablePlanets.push(data);
                    await savePlanet(data);
                }
            })
            .on('error', (err) => {
                console.log(err);
                reject(err);
            })
            .on("end", async () => {
                setTimeout(async () => {
                    const countAllPlanetsFound = (await getAllPlanets()).length;
                    // console.log(`${habitablePlanets.length} habitable planets were found`);
                    console.log(`${countAllPlanetsFound} habitable planets were found`);
                    resolve();
                }, 2000);
            });
    });
}

async function getAllPlanets() {
    //return habitablePlanets;
    return await planets.find({}, {
        '_id': 0, '__v': 0,
    });
}

async function savePlanet(planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name,
        }, {
            keplerName: planet.kepler_name,
        }, {
            upsert: true,
        });
    } catch (err) {
        console.error(`Could not save the planet ${err}`)
    }
}


module.exports = {
    loadPlanetData,
    getAllPlanets,
};


