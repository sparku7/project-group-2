// import { createContext, useContext, useState } from 'react'
// const SaleContext = createContext();

// const ContextProvider = ({ children }) => {
//     const [status, setSTatus] = useState(item.status)
//     const [street, setStreet] = useState(item.street)
//     const [town, setTown] = useState(item.town)
//     const [bedrooms, setBedrooms] = useState(item.bedrooms)
//     const [bathrooms, setBathrooms] = useState(item.bathrooms)
//     const [price, setPrice] = useState(item.price)
//     const [garden, setGarden] = useState (item.garden)
//     const [imageUrl, setImageUrl] = useState(item.imageUrl)
//     const id = item.id    

//     const property = (id, status, street, town, bedrooms, bathrooms, price, garden, imageUrl)

    

//        return(
//         <SaleContext.Provider value={{sale, toggleSale}}>
//             {children}
//         </SaleContext.Provider>
//     )

// }

// const useSale = () => {
//     return useContext(ContextProvider)
// }

// export { ContextProvider, useSale }