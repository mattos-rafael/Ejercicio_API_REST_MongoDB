const router = require('express').Router()
const {getProviders, createProvider, updateProvider, deleteProvider} = require('../controllers/providers.controller')

router.get('/providers', getProviders)
router.post('/providers', createProvider)
router.put('/providers', updateProvider)
router.delete('/providers', deleteProvider)

module.exports = router