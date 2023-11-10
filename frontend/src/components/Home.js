import React, { useEffect } from 'react';
import Footer from './Footer/Footer'
import "./Home.css"



const Home = () => {

  return (
    <>
    <div className="desktop">
      <div className="group">
          <div className="welcome-to-artfusion">
             <h1></h1>
             <h1></h1>
         </div>
     </div>
    </div>
    <div>
    <section className="section-background parallax">
      <p><h2>Gallery</h2><br  /> <h4>Post your art pieces and view others art pieces</h4></p>
      {/* <div className='ptext'>This is some text below the Gallery header.</div> */}
    </section>
      <hr className="progress" />
      <section className="section-background parallax1">
      <p><h2>Doodle</h2><br  /> <h4>Express your artwork digitally by using our personal drawing canvas</h4></p>
       </section>  
    
       <hr className="progress" />
    
        <section className="section-background parallax2">
        <p><h2>Shop & Sell</h2><br  /> <h4>You can sell your art work and buy others art pieces</h4></p>
      </section>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Home
