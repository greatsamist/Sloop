const express = require('express');
const router = express.Router();
const { Client, Conversations } = require('@xmtp/xmtp-js');
const { Wallet, ethers } = require('ethers');
const { route } = require('./notification');


router.post('/register', async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet("");
        await Client.create(wallet, {
            env: 'dev'
        });

        res.status(200).json({
            statusCode: 200,
            message: 'Address registered',
        })
    }
    catch (e) {
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {receiverAddress, content} = req.body
        let wallet = new ethers.Wallet("")
        const xmtp = await Client.create(wallet, {
            env: 'dev',
        });
        const conversation = await xmtp.conversations.newConversation(receiverAddress);
        await conversation.send(content)

        res.status(200).json({
            statusCode: 200,
            message: "Message sent"
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})


router.get('/conversations', async (req, res, next) => {
    try {
        let messages = []
        const { sender, p2 } = req.query;
        const wallet = new ethers.Wallet("")
        const xmtp = await Client.create(wallet);
        let conversation = await xmtp.conversations.newConversation(p2)
        let getMessage = await conversation.messages()
        
        for (let i = 0; i < getMessage.length; i++) {
            let messageStructure = {
                id: getMessage[i].id,
                contentTopic: getMessage[i].contentTopic,
                content: getMessage[i].content
            }
            messages.push(messageStructure)
        }

        res.status(200).json({
            statusCode: 200,
            message: "Conversations fetched",
            data: messages
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})


router.get('/chats', async (req, res, next) => {
    try {
        let chats = []
        const wallet = new ethers.Wallet("")
        const xmtp = await Client.create(wallet);
        let conversations = await xmtp.conversations.list()

        for (let i = 0; i < conversations.length; i++) {
            let messageStructure = {
                id: i,
                address: conversations[i].peerAddress
            }
            chats.push(messageStructure)
        }

        res.status(200).json({
            statusCode: 200,
            message: "Conversations fetched",
            data: chats
        })
    }
    catch (e) {
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})


router.post('/2', async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet("");
        const xmtp = await Client.create(wallet);
        const conversation = await xmtp.conversations.newConversation("");
        await conversation.send("Stay jiggy")
        res.status(200).json({
            statusCode: 200,
            data: "hello"
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({
            statusCode: 500,
            error: e.message
        })
    }
})








module.exports = router;