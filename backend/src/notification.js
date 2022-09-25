const express = require('express');
const dotenv = require('dotenv');
const {ethers} = require('ethers');
const EpnsAPI = require('@epnsproject/sdk-restapi');
const {ENS} = require('@ensdomains/ensjs')

dotenv.config();
const router = express.Router()

router.post('/send', async(req,res) => {
    try{
        let recipient;
        const {address, tag} = req.body
        const privateKey = process.env.PRIVATE_KEY
        const channelSecretKey = process.env.CHANNEL_KEY
        const signer = new ethers.Wallet(privateKey)
        const channelAddress = process.env.CHANNEL_ADDRESS
        const provider = new ethers.providers.JsonRpcProvider("https://eth-mainnet.g.alchemy.com/v2/KxTb4KYJCuIhFmK-sLy1WjZB8TXRBvOm")

        if(tag == "ENS"){
            const ENSInstance = new ENS()
            await ENSInstance.setProvider(provider)
            recipient = await ENSInstance.getProfile(address)
        }

        const sendNotification = await EpnsAPI.payloads.sendNotification({
            signer: signer,
            type: 3,
            identityType: 2,
            notification:{
                title: "New Dispatch Alert",
                body: ""
            },
            payload: {
                title: "Product Dispacth Alert",
                body: "",
                cta:"",
                img: ""
            },
            recipients: address,
            channel: channelAddress,
            env: 'staging'
        })

        res.status(200).json({
            statusCode: 200,
            message: "Notification sent successfully",
            data: sendNotification
        })

    }
    catch(e){
        console.log(e)
        res.status(500).send({
            statusCode: 500,
            error: e.message
        }) 
    }
})


module.exports = router;