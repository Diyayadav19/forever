import usermodel from '../models/usermodel.js'


const addtocart = async (req, res) => {
    try {


        const { userid, itemid, size } = req.body
        console.log("Request body:", req.body);

        if (!userid || !itemid || !size) {
            return res.status(400).json({ success: false, message: 'Missing userid, itemid or size' });
        }


        const userdata = await usermodel.findById(userid)
        let cartData = await userdata.cartData
        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1
            }
            else {
                cartData[itemid][size] = 1
            }
        }
        else {
            cartData[itemid] = {}
            cartData[itemid][size] = 1
        }
        await usermodel.findByIdAndUpdate(userid, { cartData })
        res.json({ success: true, message: 'Added To Cart' })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
const updatecart = async (req, res) => {
    try {
        const { userid, itemid, size, quantity } = req.body
        const userdata = await usermodel.findById(userid)
        let cartData = await userdata.cartData
        cartData[itemid][size] = quantity
        await usermodel.findByIdAndUpdate(userid, { cartData })
        res.json({ success: true, message: 'Cart Updated' })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
const getusercart = async (req, res) => {
    try {
        const { userid } = req.body
        const userdata = await usermodel.findById(userid)
        let cartData = await userdata.cartData

        res.json({ success: true, cartData })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
export { addtocart, updatecart, getusercart }