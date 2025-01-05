import './App.css'
import { Homepage, Random, Recipes, Search } from "./pages";

// localhost:5173/recipes -> Recipe page
// localhost:5173/random -> Random page

function App() {
  return (
    <>
      <Homepage />
      <Random />
      <Recipes />
      <Search /> 
    </>
  )
}

export default App