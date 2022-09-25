const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs')
const dotenv = require('dotenv')
const router = express.Router();
const { ethers } = require('ethers')
const { connect, resultsToObjects, SUPPORTED_CHAINS } = require('@tableland/sdk')
const { ProductValidator } = require('./validator/index')
const axios = require('axios');
const{ Web3Storage, getFilesFromPath} = require('web3.storage')
dotenv.config()

const polygonTestnet = SUPPORTED_CHAINS['polygon-mumbai']
//let __dirname = path.resolve();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
router.post('/', upload.none(), async (req, res, next) => {
    try {
        const uploadName = ["ImageGallery", req.file.originalname].join('|')
        const web3Storage = new Web3Storage({ token: process.env.WEB3STORAGE_TOKEN })
        console.log(`> 🤖 calculating content ID for ${req.file.originalname}`)

        const fileee = await getFilesFromPath(path.join(__dirname, `${req.file.originalname}`))

        const cid = await web3Storage.put(fileee, {
            name: uploadName,
            onRootCidReady: (localCid) => {
                console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
                console.log('> 📡 sending files to web3.storage ')
            }
        })

        const imageURI = `ipfs://${cid}/${req.file.originalname}`
        await fs.unlinkSync(path.join(__dirname, `${req.file.originalname}`))
        res.status(200).json({
            cid,
            imageURI
        })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})


router.post('/', upload.none(), async (req, res, next) => {
    try {
        const { error, value } = ProductValidator(req.body);
        if (error) return res.status(400).json({ statusCode: 400, error: error.details[0].message });
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const createDocument = await tableLand.write(`INSERT INTO straps_80001_3120 (id, productType, sourceAddress, destinationAddress) 
        VALUES ('${value.id}', '${value.productType}' , '${value.sourceAddress}', '${value.destinationAddress}' )`);
        
        return res.status(200).json({ statusode: 200, data: createDocument })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})



router.post('/table', upload.none(), async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const { name } = await tableLand.create(
            `productType text, sourceAddress text, destinationAddress text, id text, primary key(id)`,
            `straps`
        )
        return res.status(200).json({ statusode: 200, data: name })
    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/', async (req, res, next) => {
    try {
        let data = []
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider("https://matic-mumbai.chainstacklabs.com")
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const products = await tableLand.read(`SELECT * FROM  straps_80001_3120`)

        //const entries = resultsToObjects(products)
        console.log("hh", products)

        for (const {
            productType, sourceAddress, destinationAddress, id } of products) {
            let params = {
                'id': id,
                'productType': productType,
                'sourceAddress': sourceAddress,
                'destinationAddress': destinationAddress
            }
            data.push(params)
        }

        res.status(200).json({
            statusCode: 200,
            message: "All products fetched",
            data: data
        })
    }
    catch (e) {
        console.log(e)
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.get('/query', async (req, res, next) => {
    try {
        const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
        const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
        const signer = wallet.connect(provider)
        const tableLand = await await connect({ signer, network: "testnet", host: polygonTestnet.host, contract: polygonTestnet.contract, chainId: polygonTestnet.chainId })

        const events = await tableLand.read(`SELECT * FROM straps_80001_3120 WHERE id='${req.query.id}'`)
        const entries = resultsToObjects(events)
        res.status(200).json({
            statusCode: 200,
            message: "Product fetched",
            data: entries
        })

    }
    catch (e) {
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})

router.post('/mint', upload.single('image'),  async(req,res,next) => {
    try{
        const fileStream = fs.createReadStream(path.join(__dirname, `${req.file.originalname}`))
        let upload = await axios({
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `${process.env.NFTPORT_KEY}`,
              },
              method: 'post',
              url: `${process.env.NFTPORT_MINTING_URL}`,
              params: {
                  chain: 'polygon', 
                  name: 'Strap', 
                  description: 'Strap', 
                  mint_to_address: req.body.address
            },
            data: {'file': fileStream}
        })
          await fs.unlinkSync(path.join(__dirname, `${req.file.originalname}`))
        res.status(200).json({
            statusCode: 200,
            message: "Minted successfully",
            data: upload.data.transaction_external_url
        })
    }
    catch(e){
        //console.log(e.response.data.error)
        res.status(500).json({
            statusCode: 500,
            error: e.message
        })
    }
})


module.exports = router