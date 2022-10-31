import React,{ createContext, useState} from 'react'

export const ApplicationContext= createContext('')

function Applications({children}) {
    const application = JSON.parse(localStorage.getItem('application'));
    const [applications, setApplications] = useState(application)
  return (
    <ApplicationContext.Provider value={{applications, setApplications}}>
        {children}
    </ApplicationContext.Provider>
  )
}


export default Applications