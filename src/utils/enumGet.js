const apiUrl = "https://iewdkvrp3d.eu-central-1.awsapprunner.com";

export const getType = async () => {
    const response = await fetch(`${apiUrl}/api/v1/map/geo-object/type`)
    const data = await response.json()
    return data
  }
  export const getAccessibility = async () => {
    const response = await fetch(`${apiUrl}/api/v1/map/geo-object/accessibility`)
    const data = await response.json()
    return data
  }
