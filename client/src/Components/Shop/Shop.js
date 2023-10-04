import React, {useState, useEffect} from 'react'
import proxy from '../../proxy.json'
import axios from 'axios'
import './Shop.css'
import lwanda from '../../Assets/5.jpg'
import Seo from '../Seo/Seo'

export default function Shop() {

    const [services, setServices] = useState([])
    const [categories, setCategories] = useState([])
    const [showing, setShowing] = useState(0)
    const [servicesNames, setServiceNames] = useState("")

    const getServices = async () => {
        const url = `${proxy.proxy}/services/get_sub_services/`
        const response = await axios.get(url)
        const servs = response.data.data
        setServices(response.data.data)
        setShowing(response.data.data.length)
        let tempArr = []
        for (let i = 0; i < servs.length; i++) {
            tempArr = [...tempArr, servs[i].name]
        }
        setServiceNames(tempArr.join(', '))
        return response.data.data;
    }

    const getCategories = async () => {
        const url = `${proxy.proxy}/services/`
        const response = await axios.get(url)
        let arr = response.data.data;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].sub_services.length === 0) {
                arr.splice(i,1)
            }
        }
        arr.unshift({"name": "-- select filter by service category --", "slug": "nothing"})
        setCategories(arr)
    }

    const handleCategoryFilter = async (evt) => {
        const value = evt.target.value;
        let resultArr = []
        if (value === 'nothing') {
            getServices()
        } else {
            const servicesX = await getServices()
            if (servicesX) {
                for (let i = 0; i < servicesX.length; i++) {
                    const categories = servicesX[i].services;
                    for (let j = 0; j < categories.length; j++) {
                        if  (value === categories[j].slug) {
                            resultArr = [...resultArr, servicesX[i]]
                            break;
                        }
                    }
                }
                setServices(resultArr)
            }
        }
    }

    useEffect(() => {
        getServices()
        getCategories()        
    }, [])

  return (
    <div className='serv-content-wrapper'>
        <Seo title="Services" description={"View some of the services and products that we offer for different categories. they are: ".concat(servicesNames)} />
        <div className='container'>            
        {services.length > 0 ? 
            <div className='row'>
                <div className='col-md-6 results-info-text'>
                    <p className='mb-0'>Showing {showing} services and products</p>
                </div>
                <div className='col-md-6'>
                    <div>
                    <select className='form-control filter-input dropdown' onChange={handleCategoryFilter}>
                    {categories.map((Category) => {
                        return (
                            <option key={Category.slug} value={Category.slug}>
                            {Category.name}
                            </option>
                        )
                    })}
                    </select>
                    </div>
                </div>
            </div>            
            : null}
            <div className='services-listing'>
                <div className='row'>
            {services.length > 0 ? 
                    services.map((Service) => {
                    return (<div className='col-md-3 mt-3' key={Service.slug}>
                        <div className='service-card-cst'>
                            <div className='image-holder'>
                                <img src = {proxy.proxy.concat(Service.image)} alt = "" title = ""/>
                            </div>
                            <div className='content-holder-s-card'>
                                <div className='s-card-title'>
                                    <span>{Service.name}</span>
                                </div>                                
                                <div className='s-card-categories'>
                                    {Service.services.length === 1 ? <span>Category:</span> : 
                                    <span>Categories:</span>}
                                    {Service.services.map((Category) => {
                                        return (<span key={Category.slug}>{Category.name}</span>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}): 
                <div style={{padding: "150px 0px", display: "flex",
                justifyContent: "center", alignItems: "center"}}>
                <p>There aren't any services at the moment.</p>
                </div>}
                </div>
            </div>
        </div>
    </div>
  )
}
