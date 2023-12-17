import express from 'express';

const maintenanceRoute = express.Router();

maintenanceRoute.get("/", async (req, res) => {
    res.json({
        status: "UP"
    })
})

export default maintenanceRoute;