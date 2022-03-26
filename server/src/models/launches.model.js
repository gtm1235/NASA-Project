const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launches = new Map();

//let latestFLightNumber = 100;

//only need to receive mission, rocket, launchDate, destination from
//front end
const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
};

saveLaunch(launch)

//launches.set(launch.flightNumber, launch);

async function existsLaunchWithId(launchId) {
    return await launchesDatabase.findOne({
        flightNumber: launchId,
    }
    );
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase
        .findOne()
        .sort('-flightNumber');
    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber
}

async function getAllLaunches() {
    //return Array.from(launches.values());
    return await launchesDatabase
        .find({}, {
            '_id': 0,
            '__v': 0,
        });
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if (!planet) {
        throw new Error('No matching planets found');
    }
    //findOne add $setOneInsert
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true,
    })
}

// function addNewLaunch(launch) {
//     latestFLightNumber += 1;
//     launches.set(latestFLightNumber,
//         //Object assign takes in launch add new key:value and returns it
//         Object.assign(
//             launch, {
//             success: true,
//             customer: ['Zero to Mastery', 'NASA'],
//             upcoming: true,
//             flightNumber: latestFLightNumber,
//         })
//     );
// }

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    });

    await saveLaunch(newLaunch);
}

async function abortLaunchById(launchId) {
    //launch.delete(launchId);
    //Not using upsert because we dont want it inserted if none exist
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });

    return aborted.modifiedCount === 1;
    //     const aborted = launches.get(launchId);
    //     aborted.upcoming = false;
    //     aborted.success = false;
    //     return aborted;
}

module.exports = {
    getAllLaunches,
    //addNewLaunch,
    scheduleNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};