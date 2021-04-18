require('dotenv').config();

module.exports = {
    apiServerUrl: process.env.API_SERVER,
    userServiceUrl: `${process.env.API_SERVER}/user-service`,
    questServiceUrl: `${process.env.API_SERVER}/quest-service`,
    reviewServiceUrl: `${process.env.API_SERVER}/review-service`,
    chatServiceUrl: `${process.env.API_SERVER}/chat`,
    rewardServiceUrl: `${process.env.API_SERVER}/reward-service`,
    questServiceUrlLocal: 'http://192.168.49.2:30005'
}