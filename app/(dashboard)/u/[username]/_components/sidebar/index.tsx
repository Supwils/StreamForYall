import { Negivation } from "./negivation"
import { Toggle } from "./toggle"
import { Warpper } from "./warpper"




const SideBar = () => {

    

    return (
        <Warpper>
            <Toggle />
            <Negivation />
        </Warpper>
    )
}

export default SideBar