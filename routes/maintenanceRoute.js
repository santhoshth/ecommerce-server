import express from 'express';

const maintenanceRoute = express.Router();

maintenanceRoute.get("/", async (req, res) => {
    res.status(200).json({
        status: "UP"
    })
})

export default maintenanceRoute;
