import { getTheme } from "../../../../config/them.config"
import MemberHeader from "../Components/MemberHeader"


const MemberPage = () => {
    let theme = getTheme("light")
  return (
    <div className="w-full  h-screen"
    style={{ background: theme.background.secondary }}
    >
    <MemberHeader />
    </div>
  )
}

export default MemberPage