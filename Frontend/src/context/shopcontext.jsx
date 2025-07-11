import { createContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export const Shopcontext = createContext();

const Shopcontextprovider = (props) => {
    const currency = '$';
    const deliveryfee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setsearch] = useState('');
    const [showsearch, setshowsearch] = useState(false)
    const [cartitems, setcartitems] = useState({})
    const [products, setproducts] = useState([])
    const [token, settoken] = useState('')
    const navigate = useNavigate();

    const addtocart = async (itemid, size) => {
        if (!size) {
            toast.error(`Select Product Size`);
            return;
        }
        let cartData = structuredClone(cartitems);
        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1;
            }
            else {
                cartData[itemid][size] = 1;
            }
        }
        else {
            cartData[itemid] = {};
            cartData[itemid][size] = 1;
        }
        setcartitems(cartData);
        if (token) {
            try {
                  
                await axios.post(`${backendUrl}/api/cart/add`, {itemid, size}, { headers: {token} })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
   

    }
    const getcartcount = () => {
        let totalcount = 0;
        for (const items in cartitems) {
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalcount += cartitems[items][item];
                    }
                }
                catch (error) {

                }
            }
        }
        return totalcount;
    }
    const updatequantity = async (itemid, size, quantity) => {
        let cartData = structuredClone(cartitems);
        cartData[itemid][size] = quantity;
        setcartitems(cartData);
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemid, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }
    const getcartamount = () => {
        let totalamount = 0;
        for (const items in cartitems) {
            let iteminfo = products.find((product) => product._id === items);
            for (const item in cartitems[items]) {
                try {
                    if (cartitems[items][item] > 0) {
                        totalamount += iteminfo.price * cartitems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalamount;
    }
    const getproductsdata = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`)
           
            if (response.data.success) {
                setproducts(response.data.products)
            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    const getusercart = async (token) => {
        try {
            
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: {token} })
            if (response.data.success) {
                setcartitems(response.data.cartData)
            }
           
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    useEffect(() => {
        getproductsdata()
    })
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            const storedToken = localStorage.getItem('token');
            settoken(storedToken);
            getusercart(storedToken)
        }
    }, [])

    const value = {
        products, currency, deliveryfee, search, setsearch, showsearch, setshowsearch,
        cartitems, addtocart, getcartcount, updatequantity, setcartitems,
        getcartamount, navigate, backendUrl, settoken, token
    }
    return (
        <Shopcontext.Provider value={value}>
            {props.children}

        </Shopcontext.Provider>
    )
}
export default Shopcontextprovider; 