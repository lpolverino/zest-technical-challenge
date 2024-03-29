import { useNavigation } from "@react-navigation/native"
import Page from "../Components/Page"
import StyledView from "../Components/Styled/StyledView"
import utils from "../services/utils"

const Home = ({brewerys, updateBrewerys, apiHandlers}) => {
  
  const navigation = useNavigation()

  const changeBrewerys = async (search, type, page) =>{
    let newBrewerys 
    if (search === ''){
      newBrewerys =  await apiHandlers.getAll(page)
    } else{
      //for better scability with can have an array with options and call the correct handler for that option
      newBrewerys = type === "name"
        ? await apiHandlers.getAllByName(search,page)
        : await apiHandlers.getAllByCity(search,page)
    }
    updateBrewerys(newBrewerys.data)
    return newBrewerys.metaData.total
  }

  return (
    <StyledView className="flex-1 place-items-center bg-gray-900">
      <Page
      brewerys={brewerys}
      updateBrewerys={updateBrewerys}
      fetchBrewerysApi={apiHandlers}
      searchOptions={utils.filterOptions}
      updateFilters={changeBrewerys}
      passPage = {changeBrewerys}
      beerInfoHandler={(item)=>navigation.navigate('Info',{id:item.id})}>
      </Page>
    </StyledView>
  )
}

export default Home