const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchById,
} = require('../../models/launches.model');

async function httpGetAllLaunches(req, res) {
    //for (const value of launches.values()) { ... }
    //Array.from takes iterable and turns it into an array
    return await res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
    const launch = req.body;

    if (!launch.mission || !launch.rocket || !launch.launchDate
        || !launch.target) {
        return res.status(400).json({
            error: "Missing required launch property",
        });
    }

    launch.launchDate = new Date(launch.launchDate);
    // Can use isNaN(launch.launchDate) if valid date is put in valueof
    // is call and if a number (correct( NaN is false))
    //if (launch.launchDate.toString() === 'Invalid Date') {
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: "Invalid Launch Date",
        });
    }
    //}

    addNewLaunch(launch);
    return res.status(201).json(launch);
}

function httpAbortLaunchById(req, res) {
    const launchId = Number(req.params.id);

    //.if launch doesnt exist return 404
    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: "Launch not found",
        });
    }

    //if launch exists
    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunchById,
};