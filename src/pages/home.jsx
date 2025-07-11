import React from 'react'
import Hero from '../components/hero'
import Latestcollection from '../components/latestcollection'
import Bestseller from '../components/bestseller'
import Ourpolicy from '../components/ourpolicy'
import Newsletter from '../components/newsletter'

const home = () => {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <Bestseller/>
      <Ourpolicy/>
      <Newsletter/>
      
    </div>
  )
}

export default home;