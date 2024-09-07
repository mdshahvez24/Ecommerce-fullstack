import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Lay = ({children,title,description, keywords, author}) => {
  return (
    <div>
       <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description}/>
                <meta name="keyword" content={keywords}/>
                <meta name="author" content={author} />
                <title>{title}</title>
                <link rel="canonical" />
            </Helmet>
      <Header/>
      <main style={{minHeight: '70vh'}}>
      <Toaster />
      {children}
      </main>
      <Footer/>
    </div>
  )
}

Lay.defaultProps = {
  title: `Ecommerce app - shop now`,
  description: 'mern stack project ',
  keywords: 'mern,react,node,mongodb',
  auth:'Ali'

}
export default Lay