import { combineDataProviders } from 'react-admin';
import dataProviderReports from '../utils/dataProviderReports';
import dataProviderMarkets from '../utils/dataProviderMarker'

const combinateDataProvider =  combineDataProviders((resource) => {
    switch(resource){
      case "geo-object":
        return dataProviderMarkets
      case "reports":
        return dataProviderReports
      default:
        return
    }
  })

  export default combinateDataProvider