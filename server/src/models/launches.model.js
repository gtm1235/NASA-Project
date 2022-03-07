const launches = new Map();

let latestFLightNumber = 100;

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

launches.set(launch.flightNumber, launch);

function existsLaunchWithId(launchId) {
    return launches.has(launchId);
}

function getAllLaunches() {
    return Array.from(launches.values());
}

function addNewLaunch(launch) {
    latestFLightNumber += 1;
    launches.set(latestFLightNumber,
        //Object assign takes in launch add new key:value and returns it
        Object.assign(
            launch, {
            success: true,
            customer: ['Zero to Mastery', 'NASA'],
            upcoming: true,
            flightNumber: latestFLightNumber,
        })
    );
}

function abortLaunchById(launchId) {
    //launch.delete(launchId);
    const aborted = launches.get(launchId);
    aborted.upcoming = false;
    aborted.success = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
};