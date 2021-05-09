require('dotenv').config();

module.exports = {
    apiServerUrl: process.env.API_SERVER,
    userServiceUrl: `${process.env.API_SERVER}:30002`,
    questServiceUrl: `${process.env.API_SERVER}:30005`,
    reviewServiceUrl: `${process.env.API_SERVER}:30004`,
    chatServiceUrl: `${process.env.API_SERVER}:30003`,
    rewardServiceUrl: `${process.env.API_SERVER}:30007`,
    questServiceUrlLocal: 'http://192.168.49.2:30005'
}