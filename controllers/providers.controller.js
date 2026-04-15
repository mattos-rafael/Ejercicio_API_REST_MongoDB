const Provider = require('../models/provider.model')

const getProviders = async (req, res) => {
  try {
    const data = await Provider.find()
    res.status(200).json(data)
  } catch(err) {
    console.log(err);
    
    res.status(400).json({message: `ERROR: ${err.stack}`})
  }
}

const createProvider = async (req, res) => {
  try {
    const data = req.body
    let answer = await new Provider(data).save()
    res.status(201).json({message: "proveedor creado", provider: data})

  } catch(err) {
    console.log(err);
    
    res.status(400).json({message: `ERROR: ${err.stack}`})
  }
}

const updateProvider = async (req, res) => {
  try {
    const {company_name} = req.body

    const provider = await Provider.findOne({company_name: company_name}).exec()

    if (!provider) {
      return res.status(400).json({message: `Provider not found`})
    }

    const new_name = req.body.new_name || provider.company_name
    const CIF = req.body.CIF || provider.CIF
    const address = req.body.address || provider.address
    const url_web = req.body.url_web || provider.url_web

    await Provider.findOneAndUpdate({company_name: company_name}, {
                                                                    company_name: new_name,
                                                                    CIF: CIF,
                                                                    address: address,
                                                                    url_web, url_web
                                                                  })

    
    res.status(200).json({message: `proveedor actualizado: ${company_name}`, provider: {company_name: new_name,
                                                                                        CIF: CIF,
                                                                                        address: address,
                                                                                        url_web, url_web}})
  } catch(err) {
    console.log(err);
    
    res.status(400).json({message: `ERROR: ${err.stack}`})
  }
}

const deleteProvider = async (req, res) => {
  try {
    const {company_name} = req.body
    const answer = await Provider.findOneAndDelete({company_name: company_name})

    res.status(200).json({message: `Se ha borrado el proveedor: ${company_name}`})
    
  } catch(err) {
    console.log(err);
    
    res.status(400).json({message: `ERROR: ${err.stack}`})
  }
}


module.exports = {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider
}